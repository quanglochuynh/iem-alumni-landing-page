'use client';

import Lenis from '@/components/common/lenis';
import AboutUsSection from '@/features/home/sections/about-us.section';
import HeroSection from '@/features/home/sections/hero.section';

export default function LandingPage() {
  return (
    <Lenis>
      <main className='relative min-h-[calc(100vh-4rem)] font-sans'>
        <HeroSection id='hero-section' />
        <AboutUsSection />
        {/* <WhatWeDoSection /> */}
      </main>
    </Lenis>
  );
}
