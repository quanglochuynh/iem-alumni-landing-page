import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function WhatWeDoSection({ className, ...props }: Props) {
  return (
    <section className={cn('p-4 md:p-8 lg:p-16', className)} {...props}>
      <h2 className='text-6xl font-black'>WHAT WE DO</h2>
    </section>
  );
}
