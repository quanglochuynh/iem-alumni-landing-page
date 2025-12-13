import AboutUsSection from '@/features/home/sections/about-us.section';
import HeroSection from '@/features/home/sections/hero.section';
import WhatWeDoSection from '@/features/home/sections/what-we-do.section';

export default function LandingPage() {
  return (
    <main className='relative min-h-[calc(100vh-4rem)] font-sans'>
      <HeroSection />
      <AboutUsSection />
      <WhatWeDoSection />
    </main>
  );
}
