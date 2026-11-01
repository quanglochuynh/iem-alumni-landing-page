import { AppRoute } from '@/interfaces';

export const NAV_ITEMS = [
  { href: AppRoute.ROOT, label: 'Home' },
  { href: AppRoute.WIEMA2025, label: 'WIEMA 2025' },
  { href: AppRoute.ARTICLES, label: 'Blogs' },
  { href: AppRoute.CAREERS, label: 'Careers' },
  { href: AppRoute.EVENTS, label: 'Events' },
];

export const HERO = {
  image: '/wiema-cover.webp',
  rsvpUrl: 'https://forms.gle/LqCuU8F2haZRd51y5',
};

export const FOOTER = {
  mapUrl: 'https://maps.app.goo.gl/CCcJkSmoDBJiY3dcA',
  suggestEditsUrl: 'https://github.com/quanglochuynh/iem-alumni-landing-page',
};
