import Footer from '@/components/sections/footer';
import { Gallery } from '@/components/sections/gallery';
import { Hero } from '@/components/sections/hero';
import Navbar from '@/components/sections/navbar';
import { Schedule } from '@/components/sections/schedule';

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
        <Gallery />
        {/* <Organisers />
        <Sponsors /> */}
      </main>
      <Footer />
    </div>
  );
}
