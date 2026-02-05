'use client';

import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants/content.constant';
import { useCommonTranslation } from '@/hooks';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const commonTrans = useCommonTranslation();
  return (
    <header className='bg-foreground text-background sticky top-0 z-50 w-full font-sans'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='flex size-16 items-center justify-center bg-gray-800'>
              <Image
                src='/android-chrome-512x512.png'
                alt='Event Landing Page'
                width={48}
                height={48}
                className='transition dark:invert'
              />
            </span>
            <span className='text-xl font-extrabold sm:text-3xl'>
              IEM ALUMNI
            </span>
          </Link>
        </div>
        <nav className='hidden items-center gap-6 md:flex'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-background hover:text-background/60 text-sm font-medium transition-colors'
            >
              {commonTrans(item.label)}
            </Link>
          ))}
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
                className='text-background hover:text-background/60 block text-sm font-medium transition-colors'
                onClick={() => setOpen(false)}
              >
                {commonTrans(item.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
