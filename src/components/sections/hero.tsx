import { Button } from '@/components/ui/button';
import { HERO } from '@/constants/content';
import { useInfoTranslation } from '@/hooks';
import Image from 'next/image';

export function Hero() {
  const infoTrans = useInfoTranslation();
  return (
    <section id='home' className='z-10 container py-16 md:py-24'>
      <div className='grid items-center gap-10 lg:grid-cols-2'>
        <div className='space-y-6'>
          <h1 className='text-4xl font-bold md:text-5xl'>
            {infoTrans('WIEMA.title')}
          </h1>
          <h3 className='text-muted-foreground text-xl font-semibold md:text-2xl'>
            {infoTrans('WIEMA.subtitle')}
          </h3>
          <div className='space-y-2 text-sm md:text-base'>
            <p className='font-medium'>{infoTrans('WIEMA.date')}</p>
            <p>{infoTrans('WIEMA.address')}</p>
          </div>
          <section className='space-y-6 pt-4' id='about'>
            <h2 className='text-3xl font-bold'>{infoTrans('ABOUT.heading')}</h2>
            <p className='text-lg font-semibold'>{infoTrans('ABOUT.strong')}</p>
            <p>{infoTrans('ABOUT.p1')}</p>
            <p>{infoTrans('ABOUT.p2')}</p>
            <p>{infoTrans('ABOUT.price')}</p>
            <a href={HERO.rsvpUrl} target='_blank' rel='noopener noreferrer'>
              <Button>{infoTrans('ABOUT.cta')}</Button>
            </a>
          </section>
        </div>
        <div className='relative aspect-12/5 w-full overflow-hidden rounded-lg shadow'>
          <Image
            src={HERO.image}
            alt='Event hero image'
            fill
            className='object-cover'
            sizes='(max-width: 800px) 100vw, 50vw'
            priority
          />
        </div>
      </div>
    </section>
  );
}
