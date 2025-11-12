'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative w-full overflow-hidden rounded-lg bg-gray-200 transition-all duration-300 ease-out md:h-48 dark:bg-neutral-900',
        hovered !== null && hovered !== index && 'scale-[0.98] blur-sm',
        hovered === index && 'scale-105'
      )}
    >
      {card.children}
      {card.src && (
        <img
          src={card.src}
          alt={card.title}
          className='absolute inset-0 object-cover'
        />
      )}
      {card.title && (
        <div
          className={cn(
            'flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300',
            hovered === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className='bg-linear-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl'>
            {card.title}
          </div>
        </div>
      )}
    </div>
  )
);

Card.displayName = 'Card';

type Card = {
  title?: string;
  src?: string;
  children?: React.ReactNode;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:px-8'>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
