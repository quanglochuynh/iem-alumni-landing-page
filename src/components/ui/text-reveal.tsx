'use client';

import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

import { cn } from '@/lib/utils';

export interface TextRevealProps extends ComponentPropsWithoutRef<'div'> {
  children: string;
  containerClassName?: string;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef || undefined,
    offset: ['start end', '50% 50%'],
  });

  // Debugging: Log scrollYProgress value on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Force update to log the latest scrollYProgress value
  //     console.log(scrollYProgress.get());
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [scrollYProgress]);

  useEffect(() => {
    targetRef.current = document.querySelector('#hero-section');
  }, []);

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string');
  }

  const words = children.split(' ');

  return (
    <div className={cn('relative z-0', containerClassName)} ref={targetRef}>
      <div
        className={'top-0 mx-auto flex max-w-4xl items-center bg-transparent'}
      >
        <span
          className={cn(
            'flex flex-wrap text-2xl font-bold text-black/20 md:text-3xl lg:text-4xl xl:text-5xl dark:text-white/20',
            className
          )}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className='xl:lg-3 relative mx-1 lg:mx-1.5'>
      <span className='absolute opacity-30'>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={'text-black dark:text-white'}
      >
        {children}
      </motion.span>
    </span>
  );
};
