'use client';

import HeroBg from '@/components/common/hero-bg';
import { Highlighter } from '@/components/ui/highlighter';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { HERO } from '@/constants/content.constant';
import { triggerV1Popup } from '@/features/home/popup-modal/popup.util';
import { useInfoTranslation } from '@/hooks';
import { TicketCheck } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const infoTrans = useInfoTranslation();
  const aboutStrong = infoTrans.rich('ABOUT.strong', {
    underline: (children) => (
      <Highlighter
        animationDuration={1000}
        action='underline'
        color='#1186ed'
        strokeWidth={2}
        delay={2500}
      >
        {children}
      </Highlighter>
    ),
    underline2: (children) => (
      <Highlighter
        animationDuration={1000}
        action='underline'
        color='#ed9111'
        strokeWidth={2}
        delay={5500}
      >
        {children}
      </Highlighter>
    ),
    highlight: (children) => (
      <Highlighter
        animationDuration={1000}
        action='highlight'
        color='rgba(255, 199, 0, 0.5)'
        strokeWidth={8}
        delay={4000}
      >
        {children}
      </Highlighter>
    ),
  });
  return (
    <>
      <section id='home' className='relative container py-16 md:py-24'>
        <HeroBg className='absolute inset-0 top-0 z-0' />
        <div className='relative z-10 grid items-center gap-10 lg:grid-cols-2'>
          <div className='space-y-6'>
            <h1 className='text-4xl font-bold md:text-5xl'>
              <TypingAnimation duration={75}>
                {infoTrans('WIEMA.title')}
              </TypingAnimation>
            </h1>
            <h3 className='text-muted-foreground text-xl font-semibold md:text-2xl'>
              {infoTrans('WIEMA.subtitle')}
            </h3>
            <div className='space-y-2 text-sm md:text-base'>
              <p className='font-medium'>{infoTrans('WIEMA.date')}</p>
              <p>{infoTrans('WIEMA.address')}</p>
            </div>
            <section className='space-y-6 pt-4' id='about'>
              <h2 className='text-3xl font-bold'>
                {infoTrans('ABOUT.heading')}
              </h2>
              <p className='text-lg font-semibold'>{aboutStrong}</p>
              <p>{infoTrans('ABOUT.p1')}</p>
              <p>{infoTrans('ABOUT.p2')}</p>
              <p>{infoTrans('ABOUT.price')}</p>
              <a href={HERO.rsvpUrl} target='_blank' rel='noopener noreferrer'>
                <RainbowButton onClick={triggerV1Popup}>
                  <TicketCheck className='mr-2' />
                  {infoTrans('ABOUT.cta')}
                </RainbowButton>
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
    </>
  );
}
