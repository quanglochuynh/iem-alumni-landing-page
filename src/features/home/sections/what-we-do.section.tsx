import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

export default function WhatWeDoSection({ className, ...props }: Props) {
  return (
    <section className={cn('p-4 md:p-8 lg:p-16', className)} {...props}>
      <h2 className="font-black text-6xl">WHAT WE DO</h2>
    </section>
  );
}
