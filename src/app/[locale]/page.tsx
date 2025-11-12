import Footer from '@/features/home/sections/footer';
import { Gallery } from '@/features/home/sections/gallery';
import { Hero } from '@/features/home/sections/hero';
import Navbar from '@/features/home/sections/navbar';
import { Schedule } from '@/features/home/sections/schedule';

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
