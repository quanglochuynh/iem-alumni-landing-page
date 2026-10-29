import type { AxiosError } from 'axios';
import type { ApiError } from 'next/dist/server/api-utils';
import Resizer from 'react-image-file-resizer';
import { toast } from 'sonner';
import { apiClient } from '@/components/providers/api-provider/api-client';
import { isImage, mimeTypeToEnum } from '@/lib';
import {
  MULTIPART_CHUNK_SIZE_BYTES,
  MULTIPART_COMPAT_THRESHOLD_BYTES,
  type TFile,
  type TFileRecord,
  type TMultipartUploadedPart,
  type TMultipartUploadSessionResponse,
} from '@/schemas/file.schema';
import type { TMediaItem } from '@/schemas/media-schema.zod';

function toastError(error: AxiosError<any>) {
  toast.error(error.message, { duration: 5000 });
}

const MULTIPART_PARALLEL_LIMIT = 4;
const MULTIPART_MAX_RETRIES = 4;
const MULTIPART_BASE_DELAY_MS = 250;
const UPLOAD_SESSION_PREFIX = 'multipart-upload-session:';

type MultipartResumeState = {
  sessionId: string;
  updatedAt: string;
};

type MultipartPartSignResponse = {
  sessionId: string;
  partNumber: number;
  method: 'PUT';
  uploadUrl: string;
};

type MultipartCompletePayload = {
  sessionId: string;
  uploadedParts: TMultipartUploadedPart[];
};

function getUploadFingerprint(file: File, folderPath: string) {
  return `${folderPath}:${file.name}:${file.type}:${file.size}:${file.lastModified}`;
}

function getUploadSessionStorageKey(file: File, folderPath: string) {
  return `${UPLOAD_SESSION_PREFIX}${getUploadFingerprint(file, folderPath)}`;
}

function loadResumeState(
  file: File,
  folderPath: string,
): MultipartResumeState | null {
  const raw = localStorage.getItem(
    getUploadSessionStorageKey(file, folderPath),
  );
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as MultipartResumeState;
    if (!parsed.sessionId) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function persistResumeState(file: File, folderPath: string, sessionId: string) {
  localStorage.setItem(
    getUploadSessionStorageKey(file, folderPath),
    JSON.stringify({
      sessionId,
      updatedAt: new Date().toISOString(),
    } satisfies MultipartResumeState),
  );
}

function clearResumeState(file: File, folderPath: string) {
  localStorage.removeItem(getUploadSessionStorageKey(file, folderPath));
}

async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = MULTIPART_MAX_RETRIES,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) {
        break;
      }

      const jitter = Math.floor(Math.random() * 200);
      const delay = MULTIPART_BASE_DELAY_MS * 2 ** (attempt - 1) + jitter;
      await sleep(delay);
    }
  }

  throw lastError;
}

async function initMultipartUpload(
  file: File,
  folderPath: string,
  sessionId?: string,
) {
  const response = await apiClient.post<TMultipartUploadSessionResponse>(
    '/api/protected/file/multipart/init',
    {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      folderPath,
      sessionId,
    },
  );

  return response.data;
}

async function signPart(sessionId: string, partNumber: number) {
  const response = await apiClient.post<MultipartPartSignResponse>(
    '/api/protected/file/multipart/part-sign',
    {
      sessionId,
      partNumber,
    },
  );

  return response.data;
}

async function uploadSignedPart(uploadUrl: string, chunk: Blob) {
  const response = await apiClient.put<TMultipartUploadedPart>(
    uploadUrl,
    chunk,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    },
  );

  return response.data;
}

async function completeMultipartUpload(payload: MultipartCompletePayload) {
  const response = await apiClient.post<TFileRecord>(
    '/api/protected/file/multipart/complete',
    payload,
  );

  return response.data;
}

async function abortMultipartUpload(sessionId: string) {
  await apiClient.post('/api/protected/file/multipart/abort', {
    sessionId,
  });
}

async function uploadFileLegacy(
  file: TFile,
  folderPath: string,
  onError?: (e: AxiosError<ApiError>) => void,
) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderPath', folderPath);
    const res = await apiClient.post<TFileRecord>(
      '/api/protected/file',
      formData,
    );
    return res.data;
  } catch (error) {
    onError?.(error as AxiosError<ApiError>);
    return null;
  }
}

async function uploadFileMultipart(
  file: File,
  folderPath: string,
  onError?: (e: AxiosError<ApiError>) => void,
) {
  const previousState = loadResumeState(file, folderPath);
  let session: TMultipartUploadSessionResponse;

  try {
    session = await initMultipartUpload(
      file,
      folderPath,
      previousState?.sessionId,
    );
  } catch (error) {
    if (!previousState?.sessionId) {
      onError?.(error as AxiosError<ApiError>);
      return null;
    }

    session = await initMultipartUpload(file, folderPath);
  }

  persistResumeState(file, folderPath, session.sessionId);

  const uploadedParts = new Map<number, string>(
    session.uploadedParts.map((part) => [part.partNumber, part.etag]),
  );

  const chunkSize = session.chunkSize || MULTIPART_CHUNK_SIZE_BYTES;
  const totalParts = Math.ceil(file.size / chunkSize);
  const pendingPartNumbers: number[] = [];

  for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    if (!uploadedParts.has(partNumber)) {
      pendingPartNumbers.push(partNumber);
    }
  }

  let cursor = 0;

  const workers = Array.from(
    { length: Math.min(MULTIPART_PARALLEL_LIMIT, pendingPartNumbers.length) },
    async () => {
      while (cursor < pendingPartNumbers.length) {
        const currentIndex = cursor;
        cursor += 1;

        const partNumber = pendingPartNumbers[currentIndex];
        const start = (partNumber - 1) * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const uploaded = await withRetry(async () => {
          const signed = await signPart(session.sessionId, partNumber);
          return uploadSignedPart(signed.uploadUrl, chunk);
        });

        uploadedParts.set(uploaded.partNumber, uploaded.etag);
        persistResumeState(file, folderPath, session.sessionId);
      }
    },
  );

  try {
    await Promise.all(workers);
    const completePayload: MultipartCompletePayload = {
      sessionId: session.sessionId,
      uploadedParts: Array.from(uploadedParts.entries())
        .map(([partNumber, etag]) => ({ partNumber, etag }))
        .sort((a, b) => a.partNumber - b.partNumber),
    };

    const fileRecord = await completeMultipartUpload(completePayload);
    clearResumeState(file, folderPath);
    return fileRecord;
  } catch (error) {
    onError?.(error as AxiosError<ApiError>);

    if (session.sessionId && !uploadedParts.size) {
      try {
        await abortMultipartUpload(session.sessionId);
        clearResumeState(file, folderPath);
      } catch {
        // Keep session state for resume if abort fails.
      }
    }

    return null;
  }
}

export async function uploadFile(
  file: TFile,
  folderPath: string,
  onError?: (e: AxiosError<ApiError>) => void,
) {
  if (file.size <= MULTIPART_COMPAT_THRESHOLD_BYTES) {
    return uploadFileLegacy(file, folderPath, onError);
  }

  return uploadFileMultipart(file, folderPath, onError);
}

export async function deleteFile(R2key: string, type: 'id' | 'path' = 'id') {
  const key = encodeURIComponent(
    R2key.startsWith('/') ? R2key.slice(1) : R2key,
  );
  return apiClient.delete(`/api/protected/file`, {
    params: {
      type: type,
      ...(type === 'id' ? { id: key } : { path: key }),
    },
  });
}

type Props = {
  array: TMediaItem[];
  onItemUploadedCallback: () => void;
  onBeginUpload?: () => void;
  onEndUpload?: () => void;
  folderPath: string;
};

export async function syncMediaArray({
  array,
  onItemUploadedCallback,
  onBeginUpload,
  onEndUpload,
  folderPath,
}: Props): Promise<TFileRecord[]> {
  if (!array.length) {
    return [];
  }

  onBeginUpload?.();
  const imagesArray: TFileRecord[] = [];
  try {
    for (let i = 0; i < array.length; i++) {
      if (array[i].deleted) {
        if (array[i].dto) {
          await deleteFile(array[i].dto!.id);
        }
        onItemUploadedCallback();
        continue;
      }
      if (array[i].dto) {
        imagesArray.push(array[i].dto!);
        onItemUploadedCallback();
        continue;
      }
      let fileToUpload = array[i].file;
      if (!fileToUpload) {
        onItemUploadedCallback();
        continue;
      }
      if (isImage(mimeTypeToEnum(fileToUpload.type))) {
        fileToUpload = await resizeFile(fileToUpload!);
      }
      const uploadResponse = await uploadFile(
        fileToUpload,
        folderPath,
        toastError,
      );
      if (!uploadResponse) continue;
      if (uploadResponse) {
        imagesArray.push(uploadResponse);
      }
      onItemUploadedCallback();
    }
  } catch (error) {
    toastError?.(error as AxiosError<ApiError>);
  } finally {
    onEndUpload?.();
  }
  return imagesArray;
}

export function convert2TMediaItem(
  medias?: TFileRecord | TFileRecord[] | null,
): TMediaItem[] {
  if (!medias) return [];
  if (medias instanceof Array) {
    return medias.map((dto) => ({
      file: null,
      dto,
      deleted: false,
    }));
  }
  return [
    {
      file: null,
      dto: medias,
      deleted: false,
    },
  ];
}

const resizeFile = (file: File, maxWidth = 2000, maxHeight = 2000) =>
  new Promise<File>((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'WEBP',
      100,
      0,
      (blob) => {
        const newFile = new File([blob as string], file.name, {
          type: file.type,
        });
        resolve(newFile);
      },
      'blob',
    );
  });
