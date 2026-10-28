import { MediaFileType } from '@/constants/media.constant';

const simplyTypeLUT: Record<MediaFileType, string> = {
  [MediaFileType.Docx]: '.docx',
  [MediaFileType.Pdf]: '.pdf',
  [MediaFileType.Xlsx]: '.xlsx',
  [MediaFileType.Jpeg]: '.jpeg',
  [MediaFileType.Png]: '.png',
  [MediaFileType.WebP]: '.webp',
  [MediaFileType.Mp4]: '.mp4',
  [MediaFileType.Mov]: '.mov',
  [MediaFileType.MsWord]: '.doc',
  [MediaFileType.Gif]: '.gif',
  [MediaFileType.MsExcel]: '.xls',
  [MediaFileType.Json]: '.json',
  [MediaFileType.Mp3]: '.mp3',
  [MediaFileType.OctetStream]: 'text',
};

export function simplifyMimeType(type: MediaFileType | 'N/A'): string {
  if (type === 'N/A') return 'N/A';
  return simplyTypeLUT[type] || type;
}

export const DetailTypeLUT: Record<string, MediaFileType> = {
  'image/webp': MediaFileType.WebP,
  'image/jpeg': MediaFileType.Jpeg,
  'image/png': MediaFileType.Png,
  'image/gif': MediaFileType.Gif,
  'application/pdf': MediaFileType.Pdf,
  'application/msword': MediaFileType.MsWord,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    MediaFileType.Docx,
  'application/vnd.ms-excel': MediaFileType.MsExcel,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    MediaFileType.Xlsx,
  'video/mp4': MediaFileType.Mp4,
  'video/quicktime': MediaFileType.Mov,
  'application/json': MediaFileType.Json,
  'audio/mpeg': MediaFileType.Mp3,
  'application/octet-stream': MediaFileType.OctetStream,
};

export function mimeTypeToEnum(type?: string) {
  if (!type) return 'N/A';
  return DetailTypeLUT[type] || 'N/A';
}

export function mediaIsPreviewAble(type: string) {
  return [
    MediaFileType.Gif,
    MediaFileType.Jpeg,
    MediaFileType.Png,
    MediaFileType.WebP,
    MediaFileType.Mov,
    MediaFileType.Mp4,
    MediaFileType.Mp3,
  ].includes(type as MediaFileType);
}

export function isImage(type: string) {
  return [
    MediaFileType.Gif,
    MediaFileType.Jpeg,
    MediaFileType.Png,
    MediaFileType.WebP,
  ].includes(type as MediaFileType);
}

export function isVideo(type: string) {
  return [MediaFileType.Mov, MediaFileType.Mp4, MediaFileType.Mp3].includes(
    type as MediaFileType
  );
}
