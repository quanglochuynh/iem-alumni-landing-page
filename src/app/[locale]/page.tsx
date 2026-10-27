'use client';

import Lenis from '@/components/common/lenis';
import HomeNav from '@/features/home/home-nav';
import ContactSection from '@/features/home/sections/contact.section';
import GallerySection from '@/features/home/sections/gallery.section';
import HeroSection from '@/features/home/sections/hero.section';
import WhatWeDoSection from '@/features/home/sections/what-we-do.section';
import WhoWeAreSection from '@/features/home/sections/who-we-are.section';

export default function Page() {
  return (
    <Lenis>
      <HomeNav />
      <main className="relative pb-32">
        <HeroSection id="hero-section" />
        <WhoWeAreSection className="mt-32" />
        <WhatWeDoSection className="mt-32" />
        <GallerySection className="mt-32" />
        <ContactSection className="mt-32" />
      </main>
    </Lenis>
  );
}
