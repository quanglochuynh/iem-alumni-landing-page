import Link from 'next/link';
import type { ComponentProps } from 'react';
import { AppRoute } from '@/interfaces';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'div'>;

const navLinks = [
  { href: AppRoute.OUR_PEOPLE, label: 'Our People' },
  { href: AppRoute.WIEMA2025, label: 'WIEMA 2025' },
  {
    href: AppRoute.EVENTS,
    label: 'Events',
  },
  {
    href: AppRoute.ARTICLES,
    label: 'Articles',
  },
];

export default function HomeNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn(
        'absolute top-0 left-0 z-50 flex w-full justify-center gap-4 p-4 text-primary-foreground md:gap-16',
        className,
      )}
      {...props}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-light text-xl hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
