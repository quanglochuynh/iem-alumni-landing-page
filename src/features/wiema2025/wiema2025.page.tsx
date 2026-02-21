import { Gallery } from '@/features/wiema2025/sections/gallery';
import { Hero } from '@/features/wiema2025/sections/hero';
import { Schedule } from '@/features/wiema2025/sections/schedule';

export default function WIEMA2025Page() {
  return (
    <div className='font-serif'>
      <Hero />
      <Schedule />
      <Gallery />
    </div>
  );
}
