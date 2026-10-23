'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

export default function HeroSection({ className, ...props }: Props) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 200]);

  return (
    <section
      {...props}
      className={cn('relative h-[80svh] w-full md:flex', className)}
    >
      <Image
        src={'/I_M1A0855.webp'}
        alt="Hero Image"
        loading="eager"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 z-30 h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/70 p-4">
        <motion.div
          style={{ y: parallaxY }}
          className="text-primary-foreground"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-4 font-black font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            IEM-IU Alumni <br />
            Association
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mb-6 max-w-3xl text-lg md:text-3xl"
          >
            Reunite, Celebrate, and Ignite the Future of IEM Alumni
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
