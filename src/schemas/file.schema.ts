import { z } from 'zod';

export const MULTIPART_CHUNK_SIZE_BYTES = 8 * 1024 * 1024;
export const MULTIPART_COMPAT_THRESHOLD_BYTES = MULTIPART_CHUNK_SIZE_BYTES;

export const uploadFileSchema = z
  .custom<File>()
  .refine((file) => (file?.size || 0) > 0, {
    message: 'No file',
  })
  .refine((file) => file && file.size < 209715200, {
    // 200 * 1024 * 1024 (200MB)
    message: 'File size must smaller than 200MB',
  });

export type TFile = z.infer<typeof uploadFileSchema>;

export const uploadSingleSchema = z.object({
  file: uploadFileSchema,
  folderPath: z
    .string()
    .regex(/^\/.*/, 'Folder path must start with /')
    .optional()
    .nullable(),
});

export const deleteFileSchema = z
  .object({
    type: z.literal('id'),
    id: z.cuid(),
  })
  .or(
    z.object({
      type: z.literal('path'),
      path: z.string(),
    })
  );

export const fileRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  path: z.string(),
  thumbnailPath: z.string().nullable(),
  type: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export type TFileRecord = z.infer<typeof fileRecordSchema>;

export const updateFileRecordSchema = fileRecordSchema.pick({
  id: true,
  name: true,
});

export type TUpdateFileRecord = z.infer<typeof updateFileRecordSchema>;

export const multipartInitUploadSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().int().positive(),
  fileType: z.string().min(1),
  folderPath: z.string().regex(/^\/.*/, 'Folder path must start with /'),
  sessionId: z.string().min(1).optional(),
});

export const multipartPartSignSchema = z.object({
  sessionId: z.string().min(1),
  partNumber: z.number().int().min(1),
});

export const multipartStatusQuerySchema = z.object({
  sessionId: z.string().min(1),
});

export const multipartUploadedPartSchema = z.object({
  partNumber: z.number().int().min(1),
  etag: z.string().min(1),
});

export const multipartCompleteSchema = z.object({
  sessionId: z.string().min(1),
  uploadedParts: z.array(multipartUploadedPartSchema).min(1),
});

export const multipartAbortSchema = z.object({
  sessionId: z.string().min(1),
});

export const multipartUploadStatusSchema = z.enum([
  'initiated',
  'completed',
  'aborted',
]);

export type TMultipartUploadStatus = z.infer<
  typeof multipartUploadStatusSchema
>;

export const multipartUploadSessionResponseSchema = z.object({
  sessionId: z.string(),
  uploadId: z.string(),
  filePath: z.string(),
  fileName: z.string(),
  fileSize: z.number().int().positive(),
  fileType: z.string(),
  folderPath: z.string(),
  uploadedParts: z.array(multipartUploadedPartSchema),
  status: multipartUploadStatusSchema,
  chunkSize: z.number().int().positive(),
  thresholdSize: z.number().int().positive(),
  expiresAt: z.string(),
});

export type TMultipartInitUploadInput = z.infer<
  typeof multipartInitUploadSchema
>;
export type TMultipartPartSignInput = z.infer<typeof multipartPartSignSchema>;
export type TMultipartStatusQuery = z.infer<typeof multipartStatusQuerySchema>;
export type TMultipartUploadedPart = z.infer<
  typeof multipartUploadedPartSchema
>;
export type TMultipartCompleteInput = z.infer<typeof multipartCompleteSchema>;
export type TMultipartAbortInput = z.infer<typeof multipartAbortSchema>;
export type TMultipartUploadSessionResponse = z.infer<
  typeof multipartUploadSessionResponseSchema
>;
