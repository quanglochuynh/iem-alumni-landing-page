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
      <h2 className="z-10 font-black font-heading text-6xl">
        {t('whoWeAre.title')}
      </h2>
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
      <div className="z-40 items-center md:flex md:h-[60svh]" id="anh-ha">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={t('whoWeAre.descriptions.1.img')}
            width={400}
            height={400}
            alt={t('whoWeAre.descriptions.1.img')}
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <TextReveal
            className="mt-8 text-xl"
            offset={['start 50%', 'end 50%']}
            targetSelector="#anh-ha"
          >
            {t('whoWeAre.descriptions.1.text')}
          </TextReveal>
          <p className="mt-8 text-lg italic">
            {t('whoWeAre.descriptions.1.author')}
          </p>
        </div>
      </div>
      <div className="md:flex md:h-[60svh] md:items-start" id="co-hoa">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={t('whoWeAre.descriptions.0.img')}
            width={400}
            height={400}
            alt={t('whoWeAre.descriptions.0.img')}
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <TextReveal
            className="mt-8 text-xl"
            offset={['start 50%', 'end 50%']}
            targetSelector="#co-hoa"
          >
            {t('whoWeAre.descriptions.0.text')}
          </TextReveal>
          <p className="mt-8 text-lg italic">
            {t('whoWeAre.descriptions.0.author')}
          </p>
        </div>
      </div>
    </section>
  );
}
