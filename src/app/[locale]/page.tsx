import Footer from '@/components/sections/footer';
import { Hero } from '@/components/sections/hero';
import Navbar from '@/components/sections/navbar';
import { Organisers } from '@/components/sections/organisers';
import { Schedule } from '@/components/sections/schedule';
import { Speakers } from '@/components/sections/speakers';
import { Sponsors } from '@/components/sections/sponsors';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale handled by app layout elsewhere for now
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Schedule />
        <Speakers />
        <Organisers />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
