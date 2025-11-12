'use client';

import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function HeroBg({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <FlickeringGrid
      className={cn(
        'relative inset-0 z-0 overflow-hidden mask-[radial-gradient(450px_circle_at_center,white,transparent)]',
        className
      )}
      squareSize={20}
      gridGap={8}
      color='#76f743'
      maxOpacity={0.25}
      flickerChance={0.2}
      width={1920}
      height={1080}
    />
  );
}
