import { type ChangeEvent, createRef } from 'react';
import type { TMediaItem } from '@/schemas/media-schema.zod';

type TMediaControlProps = {
  images: TMediaItem[];
  onImagesChange: (images: TMediaItem[]) => void;
  numImage: number;
};

export function useMediaControl({
  images,
  onImagesChange,
  numImage,
}: TMediaControlProps) {
  const inputRef = createRef<HTMLInputElement>();

  const handleAddImg = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    if (!files) {
      return;
    }
    const fileList = Array.from(files);
    onImagesChange([
      ...images,
      ...fileList.map((file) => ({ file, dto: null, deleted: false })),
    ]);
  };

  const handleRemoveImg = (index: number) => {
    onImagesChange(
      images
        .map((item, i) =>
          i === index
            ? item?.dto
              ? { ...item, deleted: !item.deleted }
              : null
            : item,
        )
        .filter(Boolean) as TMediaItem[],
    );
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.dataTransfer.setData('imageIndex', String(index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData('imageIndex'));
    const newImages = [...images];
    const [dragImage] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, dragImage);
    onImagesChange(newImages);
  };

  const reset = (images: TMediaItem[] = []) => {
    onImagesChange(images);
  };

  const numDeleted = images.reduce(
    (count, img) => (img.deleted ? count + 1 : count),
    0,
  );

  return {
    images,
    inputRef,
    handleAddImg,
    handleRemoveImg,
    handleDragStart,
    handleDragOver,
    handleDrop,
    reset,
    addible: images.length - numDeleted < numImage,
    numDeleted,
  };
}

export type TMediaControl = ReturnType<typeof useMediaControl>;
