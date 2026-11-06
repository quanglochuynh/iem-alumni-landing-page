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
      <h2 className="z-10 font-black text-6xl">{t('whoWeAre.title')}</h2>
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
      {descriptions.map(({ id, img, text, author }) => (
        <div className="md:flex md:h-[60svh] md:items-start" id={id} key={id}>
          <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
            <Image
              src={t(img)}
              width={400}
              height={400}
              alt={t(img)}
              className="size-64 rounded-full object-cover"
            />
          </div>
          <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
            <TextReveal
              className="mt-8 text-xl"
              offset={['start 50%', 'end 50%']}
              targetSelector={`#${id}`}
            >
              {t(text)}
            </TextReveal>
            <p className="mt-8 text-lg italic">{t(author)}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

const descriptions = [
  {
    id: 'anh-ha',
    img: 'whoWeAre.descriptions.1.img',
    text: 'whoWeAre.descriptions.1.text',
    author: 'whoWeAre.descriptions.1.author',
  },
  {
    id: 'co-hoa',
    img: 'whoWeAre.descriptions.0.img',
    text: 'whoWeAre.descriptions.0.text',
    author: 'whoWeAre.descriptions.0.author',
  },
];
