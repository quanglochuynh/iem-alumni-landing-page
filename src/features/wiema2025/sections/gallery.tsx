import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/carousel';
import { useInfoTranslation } from '@/hooks';
import { ImageIcon } from 'lucide-react';

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
            <ImageIcon className='mr-2' size={16} />
            {infoTrans('GALLERY.cta')}
          </Button>
        </a>
      </div>
      <div className='h-[calc(50vmin+5rem)] w-full overflow-hidden'>
        <Carousel
          slides={[
            {
              src: 'https://bucket.iemalumni.org/I_M1A0855_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/Messenger_creation_F5EB9078-3855-4C5A-A5CF-C407263A02DC_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/IDSCF7612_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/IMG_1832_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/Messenger_creation_7605ACED-3986-48AB-A4A9-6C4D6CEB0006_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/I_M1A0891_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/IDSC00072_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/Messenger_creation_A9B85D55-DD11-4048-B255-02CB33360BDD_XLARGE.webp',
            },
            {
              src: 'https://bucket.iemalumni.org/IDSC00042_XLARGE.webp',
            },
          ]}
        />
      </div>
    </section>
  );
}
