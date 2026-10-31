'use client';

import Lenis from '@/components/common/lenis';
import ScrollToTop from '@/components/common/scroll-to-top';
import Footer from '@/components/footer';
import HomeNav from '@/features/root/home-nav';
import ContactSection from '@/features/root/sections/contact.section';
import GallerySection from '@/features/root/sections/gallery.section';
import HeroSection from '@/features/root/sections/hero.section';
import WhatWeDoSection from '@/features/root/sections/what-we-do.section';
import WhoWeAreSection from '@/features/root/sections/who-we-are.section';

export default function RootPage() {
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
      <Footer />
      <ScrollToTop />
    </Lenis>
  );
}
