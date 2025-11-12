import { Button } from '@/components/ui/button';
import { FOOTER, HERO } from '@/constants/content';
import { useCommonTranslation, useInfoTranslation } from '@/hooks';
import { StripTags } from '@/lib/rich-text.util';

export default function Footer() {
  const infoTrans = useInfoTranslation();
  const commonTrans = useCommonTranslation();
  return (
    <footer className='bg-primary text-primary-foreground border-t text-justify'>
      <div className='container mt-16'>
        <h2 className='text-2xl font-bold'>{infoTrans('FOOTER.heading')}</h2>
      </div>
      <div>
        <div className='container grid gap-8 py-12 md:grid-cols-4'>
          <div className='md:col-span-2'>
            <h3 className='mb-3 font-semibold'>{infoTrans('ABOUT.heading')}</h3>
            <p className='text-muted-foreground text-sm'>
              {StripTags(infoTrans.raw('ABOUT.strong'))}
            </p>
          </div>
          <div>
            <h3 className='mb-3 font-semibold'>{commonTrans('Address')}</h3>
            <p className='text-muted-foreground text-sm'>
              {infoTrans('WIEMA.address')}
            </p>
          </div>
          <div>
            <h3 className='mb-3 font-semibold'>{commonTrans('DateTime')}</h3>
            <p className='text-muted-foreground text-sm whitespace-pre-line'>
              {infoTrans('WIEMA.date')}
            </p>
          </div>
          <div>
            <a href={HERO.rsvpUrl} target='_blank' rel='noopener noreferrer'>
              <Button variant={'secondary'}>{infoTrans('ABOUT.cta')}</Button>
            </a>
          </div>
        </div>
      </div>
      <div className='mt-8 flex justify-center'>
        <iframe
          title='map'
          className='w-full md:w-3/2'
          height={400}
          style={{ border: 0 }}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          src={FOOTER.mapSrc}
        />
      </div>
      <div className='text-primary-foreground bg-black'>
        <div className='text-muted-foreground container py-6 text-sm'>
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
