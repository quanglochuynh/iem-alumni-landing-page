'use client';

import Lenis from '@/components/common/lenis';
import HeroSection from '@/features/home/sections/hero.section';
import WhoWeAreSection from '@/features/home/sections/who-we-are.section';

export default function LandingPage() {
  return (
    <Lenis>
      <main className="relative min-h-[calc(100vh-4rem)] pb-32">
        <HeroSection id="hero-section" />
        <WhoWeAreSection className="mt-32" />
      </main>
    </Lenis>
  );
}
