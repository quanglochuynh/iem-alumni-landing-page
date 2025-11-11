'use client';

import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants/content';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className='bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href='#home' className='flex items-center gap-2'>
            {/* Placeholder logo to match example */}
            <Image
              src='/android-chrome-512x512.png'
              alt='Event Landing Page'
              width={48}
              height={48}
              className='rounded-xl bg-gray-100 transition hover:bg-gray-200 dark:invert'
            />
          </Link>
        </div>
        <nav className='hidden items-center gap-6 md:flex'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
            >
              {item.label}
            </Link>
          ))}
          <Button>Get Tickets</Button>
        </nav>
        <div className='flex items-center gap-2 md:hidden'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setOpen((s) => !s)}
            aria-label='Toggle Menu'
          >
            <Menu />
          </Button>
        </div>
      </div>
      {open && (
        <div className='bg-background border-t md:hidden'>
          <div className='container space-y-3 py-3'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-muted-foreground hover:text-foreground block text-sm font-medium'
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className='w-full' onClick={() => setOpen(false)}>
              Get Tickets
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
