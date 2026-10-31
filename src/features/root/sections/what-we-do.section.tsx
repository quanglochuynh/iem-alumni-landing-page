'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type HTMLAttributes, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLElement>;

const SLIDES = [
  {
    image: '/bg/IMG_1832.JPG',
    titleKey: 'connect',
    descriptionKey: 'connectDescription',
  },
  {
    image: '/bg/hoc-bong.jpg',
    titleKey: 'support',
    descriptionKey: 'supportDescription',
  },
  {
    image: '/bg/IDSC00042.jpg',
    titleKey: 'celebrate',
    descriptionKey: 'celebrateDescription',
  },
] as const;

export default function WhatWeDoSection({ className, ...props }: Props) {
  const t = useTranslations('Landing');
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const index = Math.min(
      SLIDES.length - 1,
      Math.max(0, Math.floor(progress * SLIDES.length)),
    );
    setActiveIndex(index);
  });

  const slide = SLIDES[activeIndex];

  return (
    <section
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${SLIDES.length * 100}svh` }}
      {...props}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden text-primary-foreground">
        <AnimatePresence>
          <motion.div
            key={slide.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={t(slide.titleKey)}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full flex-col p-4 md:p-8 lg:p-16">
          <h2 className="font-black text-6xl">{t('whatWeDo')}</h2>

          <div className="mt-auto max-w-2xl pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.titleKey}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <h3 className="mb-4 font-extrabold text-4xl md:text-6xl">
                  {t(slide.titleKey)}
                </h3>
                <p className="text-lg md:text-2xl">{t(slide.descriptionKey)}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              {SLIDES.map((s, i) => (
                <span
                  key={s.titleKey}
                  className={cn(
                    'h-1 w-12 rounded-full bg-white/30 transition-colors',
                    i === activeIndex && 'bg-white',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
