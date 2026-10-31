'use client';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Album } from '@/features/gallery/album.type';
import { cn } from '@/lib/utils';

async function fetchGalleryData() {
  return axios.get<Album[]>('/api/gallery/landing-page');
}

const BUCKET_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

function resolveUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${BUCKET_URL}/${path.replace(/^\//, '')}`;
}

type Props = ComponentProps<'section'>;

type Selected = { album: Album; index: number };

export default function GallerySection({ className, ...props }: Props) {
  const t = useTranslations('Landing');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selected, setSelected] = useState<Selected | null>(null);

  useEffect(() => {
    fetchGalleryData()
      .then((response) => setAlbums(response.data))
      .catch(() => setAlbums([]));
  }, []);

  const sortedImages = (album: Album) =>
    [...album.images].sort((a, b) => a.position - b.position);

  const step = (delta: number) =>
    setSelected((current) => {
      if (!current) return current;
      const total = current.album.images.length;
      return {
        ...current,
        index: (current.index + delta + total) % total,
      };
    });

  const currentImage = selected
    ? sortedImages(selected.album)[selected.index]
    : null;

  if (albums.length === 0) return null;

  return (
    <section
      className={cn('p-4 md:p-8 lg:p-16', className)}
      id="gallery"
      {...props}
    >
      <h2 className="font-black text-6xl">{t('gallery')}</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {t('galleryDescription')}
      </p>

      <div className="mt-16 space-y-24">
        {albums.map((album) => {
          const images = sortedImages(album);
          return (
            <div key={album.id}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-4"
              >
                <div>
                  <h3 className="font-extrabold text-3xl md:text-4xl">
                    {album.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-muted-foreground">
                    {album.description}
                  </p>
                </div>
                <span className="rounded-full border px-4 py-1 text-sm">
                  {t('photoCount', { count: images.length })}
                </span>
              </motion.div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {images.map((image, i) => {
                  const isLarge = i % 7 === 0;
                  return (
                    <motion.button
                      key={image.id}
                      type="button"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: (i % 4) * 0.07,
                        ease: 'easeOut',
                      }}
                      onClick={() => setSelected({ album, index: i })}
                      aria-label={t('openPhoto', {
                        number: i + 1,
                        album: album.name,
                      })}
                      className={cn(
                        'group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl bg-muted',
                        isLarge && 'md:col-span-2 md:row-span-2',
                      )}
                    >
                      <Image
                        src={resolveUrl(image.file.path)}
                        alt={t('photoAlt', {
                          album: album.name,
                          number: i + 1,
                        })}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          className="max-w-[calc(100%-2rem)] gap-3 border-0 bg-black/90 p-3 text-white sm:max-w-5xl"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
          }}
        >
          {selected && currentImage && (
            <>
              <DialogTitle className="sr-only">
                {selected.album.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t('photoPosition', {
                  number: selected.index + 1,
                  total: selected.album.images.length,
                })}
              </DialogDescription>
              <div className="relative h-[70svh] w-full">
                <Image
                  key={currentImage.id}
                  src={resolveUrl(currentImage.file.path)}
                  alt={t('photoAlt', {
                    album: selected.album.name,
                    number: selected.index + 1,
                  })}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
                {selected.album.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label={t('previousPhoto')}
                      className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/80"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label={t('nextPhoto')}
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/80"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-center text-sm text-white/70">
                {selected.album.name} · {selected.index + 1} /{' '}
                {selected.album.images.length}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
