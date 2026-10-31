'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants/content.constant';
import { useCommonTranslation } from '@/hooks';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const commonTrans = useCommonTranslation();
  const path = usePathname(); // '/en', the first segment is the locale, the second segment is the page (if any)
  const isHomePage = path.split('/').slice(2).length === 0; // Check if there are no segments after the locale

  return (
    <header className="sticky top-0 z-50 w-full bg-foreground font-sans text-background">
      <div className="flex h-(--navbar-height) items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-16 items-center justify-center bg-white transition hover:bg-gray-100">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="Event Landing Page"
                width={48}
                height={48}
                className="transition dark:invert"
              />
            </span>
            {!isHomePage && (
              <span className="font-extrabold text-xl sm:text-3xl">
                IEM ALUMNI
              </span>
            )}
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-background text-sm transition-colors hover:text-background/60"
            >
              {commonTrans(item.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle Menu"
          >
            <Menu />
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container space-y-3 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block font-medium text-background text-sm transition-colors hover:text-background/60"
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
