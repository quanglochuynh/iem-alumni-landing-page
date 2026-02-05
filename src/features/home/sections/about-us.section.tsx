import { TextReveal } from '@/components/ui/text-reveal';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function AboutUsSection({ className, ...props }: Props) {
  return (
    <section className={cn('md:flex', className)} {...props}>
      <Image
        src={'/IMG_1994_LARGE.webp'}
        width={1920}
        height={1080}
        alt='About Us'
        className='w-full rounded-r-lg object-cover md:w-1/2'
      />
      <div className='p-8'>
        <h2 className='ms-auto text-6xl font-black'>WHO WE ARE</h2>
        <TextReveal className='text-2xl'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In fuga
          dolore natus asperiores? Amet, rerum! Tenetur vel nobis voluptatum,
          ratione nisi facere rem minus culpa consequuntur dolores, consectetur
          exercitationem excepturi.
        </TextReveal>
      </div>
    </section>
  );
}
