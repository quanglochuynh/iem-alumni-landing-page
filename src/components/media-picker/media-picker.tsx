import { FilePlus, Undo, X } from 'lucide-react';
import { forwardRef, type HTMLAttributes } from 'react';
import { useMediaStore } from '@/components/common/media-preview/media-store';
import Button from '@/components/common/overridden/button';
import { useMediaControl } from '@/components/media-picker/media-control.hook';
import MediaItemRenderer from '@/components/media-picker/media-item-renderer';
import { getKey, mediaIsPreviewAble } from '@/lib';
import { cn } from '@/lib/utils';
import type { TMediaItem } from '@/schemas/media-schema.zod';

export interface MediaPickerProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  disabled?: boolean;
  images: TMediaItem[];
  onImagesChange: (images: TMediaItem[]) => void;
  numImage?: number;
}

const MediaPicker = forwardRef<HTMLDivElement, MediaPickerProps>(
  (
    {
      className,
      name = 'image',
      disabled,
      images,
      onImagesChange,
      numImage = 1,
      ...rest
    }: MediaPickerProps,
    ref,
  ) => {
    const {
      inputRef,
      handleAddImg,
      handleRemoveImg,
      handleDragStart,
      handleDragOver,
      handleDrop,
      addible,
    } = useMediaControl({
      images,
      onImagesChange,
      numImage,
    });
    const onImageClick = (img: TMediaItem) => {
      if (img?.dto && mediaIsPreviewAble(img.dto.type)) {
        useMediaStore.setState({
          current: {
            title: '',
            description: '',
            dto: img.dto,
          },
        });
      }
    };
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap gap-4', className)}
        {...rest}
      >
        {images.map((img, i) => (
          // biome-ignore lint/a11y/noStaticElementInteractions: The div has drag and drop interactions but is not focusable.
          <div
            key={getKey('img', i)}
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, i)}
            className={cn(
              'relative overflow-hidden',
              img.deleted && 'opacity-25',
            )}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveImg(i);
              }}
              icon={!img.deleted ? X : Undo}
              className="absolute top-0 right-0 z-20 size-8 rounded-full border-2 border-primary-foreground p-2"
              description={!img.deleted ? 'Xoá file' : 'Khôi phục'}
              disabled={disabled}
            />
            <MediaItemRenderer
              mediaItem={img}
              onClick={() => onImageClick(img)}
              className={cn(img.dto && 'cursor-pointer')}
            />
          </div>
        ))}
        {addible && !disabled && (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
              className="flex size-28 cursor-pointer items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
              icon={FilePlus}
              description="Thêm ảnh/file"
              iconProps={{
                size: 32,
                color: '#aaa',
              }}
            />
            <input
              ref={inputRef}
              onChange={handleAddImg}
              type="file"
              className="hidden"
              multiple
              name={name}
            />
          </>
        )}
      </div>
    );
  },
);

MediaPicker.displayName = 'MediaPicker';

export default MediaPicker;
