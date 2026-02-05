import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function HeroSection({ className, ...props }: Props) {
  return (
    <section
      {...props}
      className={cn('relative h-[80svh] w-full md:flex', className)}
    >
      <div className='p-4'>
        <h1 className='mb-4 text-4xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl'>
          IEM-IU Alumni <br />
          Association
        </h1>
        <p className='mb-6 max-w-2xl text-lg md:text-3xl'>
          Reunite, Celebrate, and Ignite the Future of IEM Alumni
        </p>
      </div>
      <Image
        src={'/I_M1A0855.webp'}
        alt='Hero Image'
        width={1920}
        height={1080}
        className='ms-auto w-full rounded-l-lg object-cover md:h-full md:w-1/2'
      />
    </section>
  );
}
