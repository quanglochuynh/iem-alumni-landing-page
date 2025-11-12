import Footer from '@/components/sections/footer';
import { Gallery } from '@/components/sections/gallery';
import { Hero } from '@/components/sections/hero';
import Navbar from '@/components/sections/navbar';
import { Schedule } from '@/components/sections/schedule';

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main className='relative'>
        <Hero />
        <Schedule />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
