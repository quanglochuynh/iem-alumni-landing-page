import { cva, type VariantProps } from 'class-variance-authority';
import { File } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import type { MediaFileType } from '@/constants/media.constant';
import { cn, getR2ImageUrl } from '@/lib';
import {
  isImage,
  isVideo,
  mimeTypeToEnum,
  simplifyMimeType,
} from '@/lib/media.util';
import type { TMediaItem } from '@/schemas/media-schema.zod';

const mediaVariants = cva('', {
  variants: {
    size: {
      sm: 'size-16',
      md: 'size-20',
      lg: 'size-28',
      xl: 'size-36',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
    },
  },
  defaultVariants: {
    size: 'lg',
    rounded: '2xl',
  },
});

type MediaVariantProps = VariantProps<typeof mediaVariants>;

type Props = ComponentProps<'div'> &
  MediaVariantProps & {
    mediaItem: TMediaItem;
  };

function BlankItem({
  type,
  ...variantProps
}: { type: MediaFileType | 'N/A' } & MediaVariantProps) {
  return (
    <div
      className={mediaVariants({
        ...variantProps,
        className:
          'flex flex-col items-center justify-center border-2 border-primary bg-secondary font-mono text-3xl text-gray-900/70',
      })}
    >
      <File className="size-10 text-gray-400" />
      {simplifyMimeType(type)}
    </div>
  );
}

export default function MediaItemRenderer({
  mediaItem,
  className,
  size,
  rounded,
  ...rest
}: Props) {
  const renderThumbnail = (): ReactNode => {
    if (mediaItem?.dto) {
      return isImage(mediaItem.dto?.type) && mediaItem.dto?.thumbnailPath ? (
        <img
          className={cn(mediaVariants({ size, rounded }), 'object-cover')}
          src={getR2ImageUrl(mediaItem.dto.thumbnailPath)}
          alt={mediaItem.dto.name}
        />
      ) : (
        <BlankItem
          type={mediaItem.dto.type as MediaFileType}
          size={size}
          rounded={rounded}
        />
      );
    }

    if (isImage(mimeTypeToEnum(mediaItem.file?.type))) {
      return (
        <img
          src={URL.createObjectURL(mediaItem.file!)}
          alt="preview"
          className={cn(
            mediaVariants({ size, rounded }),
            'object-cover shadow-md',
          )}
        />
      );
    }

    if (mediaItem.file && isVideo(mimeTypeToEnum(mediaItem.file?.type))) {
      return (
        <video
          controls
          className={cn(mediaVariants({ size, rounded }), 'object-cover')}
        >
          <source src={URL.createObjectURL(mediaItem.file)} />
        </video>
      );
    }

    return (
      <BlankItem
        type={mimeTypeToEnum(mediaItem.file?.type)}
        size={size}
        rounded={rounded}
      />
    );
  };

  return (
    <>
      <div
        className={cn(className, mediaVariants({ size, rounded }))}
        {...rest}
      >
        {renderThumbnail()}
      </div>
      {mediaItem.file && (
        <span className="block text-center text-blue-500/75 text-sm">
          {Math.floor(mediaItem.file.size / 10485.76) / 100}MB
        </span>
      )}
    </>
  );
}
