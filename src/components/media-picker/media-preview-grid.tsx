import type { HTMLAttributes } from 'react';
import { useMediaStore } from '@/components/common/media-preview/media-store';
import MediaItemRenderer from '@/components/media-picker/media-item-renderer';
import { baseButtonClass } from '@/components/ui/button';
import { cn, mediaIsPreviewAble } from '@/lib';
import type { TFileRecord } from '@/schemas/file.schema';

interface Props extends HTMLAttributes<HTMLDivElement> {
  media?: TFileRecord[];
}

export default function MediaPreviewGrid({ media, className, ...rest }: Props) {
  if (!media) return null;
  return (
    <div className={cn(className, 'flex flex-wrap gap-2')} {...rest}>
      {media.map((file) => (
        <button
          type="button"
          key={file.name}
          className={cn(baseButtonClass, 'size-28 hover:opacity-50')}
          onClick={() => {
            if (!mediaIsPreviewAble(file.type)) {
              window.open(file.path, 'blank');
              return;
            }
            useMediaStore.setState({
              current: {
                title: '',
                description: '',
                dto: file,
              },
            });
          }}
        >
          <MediaItemRenderer
            mediaItem={{
              dto: file,
              file: null,
            }}
          />
        </button>
      ))}
    </div>
  );
}
