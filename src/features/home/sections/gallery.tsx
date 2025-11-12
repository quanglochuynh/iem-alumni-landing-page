import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/carousel';
import { useInfoTranslation } from '@/hooks';
import { Image } from 'lucide-react';

export function Gallery() {
  const infoTrans = useInfoTranslation();
  return (
    <section id='gallery' className='py-16 md:py-24'>
      <div className='container mb-10 max-w-3xl'>
        <h2 className='mb-4 text-3xl font-bold'>
          {infoTrans('GALLERY.heading')}
        </h2>
        <p className='text-muted-foreground leading-relaxed'>
          {infoTrans('GALLERY.description')}
        </p>
        <a
          href='https://www.facebook.com/IEMIUAlumni/photos_albums'
          target='_blank'
          rel='noreferrer'
          className='text-primary mt-4 inline-block hover:underline'
        >
          <Button>
            <Image className='mr-2' size={16} />
            {infoTrans('GALLERY.cta')}
          </Button>
        </a>
      </div>
      <div className='h-[calc(50vmin+5rem)] w-full overflow-hidden'>
        <Carousel
          slides={[
            {
              src: '/images/img3.webp',
            },
            {
              src: '/images/img1.webp',
            },
            {
              src: '/images/img2.webp',
            },
            {
              src: '/images/img4.webp',
            },
            {
              src: '/images/img6.webp',
            },
            {
              src: '/images/img5.webp',
            },
          ]}
        />
      </div>
    </section>
  );
}
