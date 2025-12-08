import { Gallery } from '@/features/home/sections/gallery';
import { Hero } from '@/features/home/sections/hero';
import { Schedule } from '@/features/home/sections/schedule';

export default function WIEM2025Page() {
  return (
    <main className='font-serif'>
      <Hero />
      <Schedule />
      <Gallery />
    </main>
  );
}
