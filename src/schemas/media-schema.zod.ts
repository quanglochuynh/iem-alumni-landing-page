import { z } from 'zod';
import { MediaFileType } from '@/constants/media.constant';
import { simplifyMimeType } from '@/lib/media.util';
import { fileRecordSchema } from '@/schemas/file.schema';

export const MediaMimeType = z.enum(Object.values(MediaFileType), {
  message: `Chỉ chấp nhận các định dạng file sau: ${Object.values(MediaFileType)
    .map((t) => simplifyMimeType(t))
    .join(', ')}`,
});

export const MediaItemSchema = z.object({
  file: z.custom<File>().nullable(),
  dto: fileRecordSchema.nullable(),
  deleted: z.boolean().optional(),
});

export type TMediaItem = z.infer<typeof MediaItemSchema>;

type CreateMediaArraySchemaProps = {
  min?: number;
  max?: number;
  maxSizeMB?: number;
};

export function createMediaArraySchema({
  max = 1,
  maxSizeMB = 10,
  min = 0,
}: CreateMediaArraySchemaProps) {
  return z
    .array(MediaItemSchema)
    .refine((imgs) => imgs.filter((img) => !img.deleted).length <= max, {
      message: `Vui lòng chọn tối đa ${max} file`,
    })
    .refine((imgs) => imgs.filter((img) => !img.deleted).length >= min, {
      message: `Vui lòng chọn ít nhất ${min} file`,
      params: {
        min,
      },
    })
    .refine(
      (imgs) =>
        imgs.every((img) =>
          img.file ? img.file.size < maxSizeMB * 10485760 : true,
        ),
      {
        message: `Dung lượng mổi file không vượt quá ${maxSizeMB}MB`,
      },
    );
}
