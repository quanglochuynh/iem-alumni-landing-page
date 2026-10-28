export const MaxMediaPerComment = 5;

export const maxFileSize = 10 * 1024 * 1024;

export enum MediaFileType {
  Docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  Gif = 'image/gif',
  Jpeg = 'image/jpeg',
  Mov = 'video/quicktime',
  Mp4 = 'video/mp4',
  Mp3 = 'audio/mpeg',
  MsExcel = 'application/vnd.ms-excel',
  MsWord = 'application/msword',
  Pdf = 'application/pdf',
  Png = 'image/png',
  WebP = 'image/webp',
  Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Json = 'application/json',
  OctetStream = 'application/octet-stream',
}
