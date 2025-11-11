import Footer from '@/components/sections/footer';
import { Gallery } from '@/components/sections/gallery';
import { Hero } from '@/components/sections/hero';
import Navbar from '@/components/sections/navbar';
import { Schedule } from '@/components/sections/schedule';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <BackgroundGradientAnimation
          gradientBackgroundStart='rgb(234, 253, 232)'
          gradientBackgroundEnd='rgb(232, 252, 253)'
          firstColor='242, 92, 147'
          secondColor='242, 136, 7'
          thirdColor='244, 222, 9'
          pointerColor='165, 207, 67'
          containerClassName='w-full h-auto'
        >
          <Hero />
        </BackgroundGradientAnimation>
        <Schedule />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
