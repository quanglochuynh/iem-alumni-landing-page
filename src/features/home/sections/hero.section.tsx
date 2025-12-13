import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function HeroSection({ className, ...props }: Props) {
  return (
    <section {...props} className={cn('relative h-[60vh] w-full', className)}>
      <Image
        src={'/I_M1A0855.webp'}
        alt='Hero Image'
        width={1920}
        height={1080}
        className='h-full w-full object-cover'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-4 text-center text-white'>
        <h1 className='mb-4 text-4xl font-bold md:text-5xl'>
          IEM-IU Alumni Association
        </h1>
        <p className='mb-6 max-w-2xl text-lg md:text-2xl'>
          Reunite, Celebrate, and Ignite the Future of IEM Alumni
        </p>
      </div>
    </section>
  );
}
