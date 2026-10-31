'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type HTMLAttributes, useRef } from 'react';
import { TextReveal } from '@/components/ui/text-reveal';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

export default function WhoWeAreSection({ className, ...props }: Props) {
  const t = useTranslations('Landing');
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-400, 800]);

  return (
    <section
      ref={container}
      className={cn('relative grid gap-32 px-4 md:px-32', className)}
      {...props}
    >
      <h2 className="z-10 font-black font-heading text-6xl">{t('whoWeAre')}</h2>
      <motion.div style={{ y: parallaxY }}>
        <Image
          src={'/bg/light-wave.png'}
          width={1920}
          height={1080}
          loading="eager"
          alt=""
          className="absolute -z-50"
        />
      </motion.div>
      <div className="z-40 items-center md:flex md:h-[60svh]">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={'/founders/anh-ha.jpg'}
            width={400}
            height={400}
            alt={t('founderHaAlt')}
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <TextReveal className="mt-8 text-xl">
            {t('whoWeAreDescription')}
          </TextReveal>
          <p className="mt-8 text-lg italic">{t('founderHaName')}</p>
        </div>
      </div>
      <div className="md:flex md:h-[60svh] md:items-start">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={'/founders/chi-hoa.jpg'}
            width={400}
            height={400}
            alt={t('founderHoaAlt')}
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <TextReveal className="mt-8 text-xl">
            {t('founderHoaQuote')}
          </TextReveal>
          <p className="mt-8 text-lg italic">{t('founderHoaName')}</p>
        </div>
      </div>
    </section>
  );
}
