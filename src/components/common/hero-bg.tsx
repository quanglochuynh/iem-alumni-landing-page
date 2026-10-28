'use client';

import type { HTMLAttributes } from 'react';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { cn } from '@/lib/utils';

export default function HeroBg({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <FlickeringGrid
      className={cn(
        'mask-[radial-gradient(450px_circle_at_center,white,transparent)] relative inset-0 z-0 overflow-hidden',
        className,
      )}
      squareSize={20}
      gridGap={8}
      color="#76f743"
      maxOpacity={0.25}
      flickerChance={0.2}
      width={1920}
      height={1080}
    />
  );
}
