import { useMediaStore } from '@/components/common/media-preview/media-store';
import { Button } from '@/components/ui/button';
import { getR2ImageUrl } from '@/lib';
import { handleDownloadFile } from '@/lib/download.util';
import { isImage, isVideo } from '@common/utils/media.util';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../modal';

export default function ImagePreviewModal() {
  const { current: media, setCurrent } = useMediaStore();

  const handleDownload = async () => {
    if (!media) return;
    handleDownloadFile(media.dto, (e) => {
      toast.error(`Tải xuống thất bại: ${e.message}`);
    });
  };

  return (
    <Modal
      title={media?.title || ''}
      description={media?.description || ''}
      open={media !== null}
      onOpenChange={(open) => {
        if (!open) {
          setCurrent(null);
        }
      }}
      contentProps={{ className: 'sm:p-4 px-0 min-w-[80vw]' }}
    >
      {media !== null && (
        <>
          {isImage(media.dto.type) && (
            <img
              src={getR2ImageUrl(media.dto.path)}
              alt={media.dto.name}
              className="max-h-[90vh] w-full object-contain"
            />
          )}
          {isVideo(media.dto.type) && (
            <>
              <video
                width={400}
                src={getR2ImageUrl(media.dto.path)}
                autoPlay
                controls
                className="mx-auto"
              />
              <Button
                variant="link"
                className="mx-auto mt-2"
                onClick={handleDownload}
                icon={Download}
              >
                Tải xuống
              </Button>
            </>
          )}
          {!isImage(media.dto.type) && !isVideo(media.dto.type) && (
            <div className="flex justify-center p-4">
              <button
                onClick={handleDownload}
                className="hover:bg-accent/20 text-accent flex cursor-pointer flex-col items-center justify-center rounded-lg p-4"
              >
                <Download className="mr-2 size-20" />
                Tải tệp xuống
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
