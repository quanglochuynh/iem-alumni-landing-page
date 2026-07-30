import { TextReveal } from '@/components/ui/text-reveal';
import { useInfoTranslation } from '@/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export default function AboutUsSection({ className, ...props }: Props) {
  const infoT = useInfoTranslation();
  return (
    <section className={cn('md:flex', className)} {...props}>
      <Image
        src={'/IMG_1994_LARGE.webp'}
        width={1920}
        height={1080}
        alt='About Us'
        className='w-full rounded-r-lg object-cover md:w-1/2'
      />
      <div className='p-8 md:w-1/2'>
        <h2 className='ms-auto text-6xl font-black'>WHO WE ARE</h2>
        <TextReveal className='text-2xl'>
          {infoT('ABOUT_US.description')}
        </TextReveal>
      </div>
    </section>
  );
}
