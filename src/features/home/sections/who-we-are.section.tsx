import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { TextReveal } from '@/components/ui/text-reveal';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

export default function WhoWeAreSection({ className, ...props }: Props) {
  return (
    <section
      className={cn('relative grid gap-32 px-4 md:px-32', className)}
      {...props}
    >
      <Image
        src={'/bg/light-wave.png'}
        width={1920}
        height={1080}
        alt="Light Wave"
        className="absolute top-0 left-0 -z-10"
      />
      <div className="h-[80svh] items-center md:flex">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={'/founders/anh-ha.jpg'}
            width={400}
            height={400}
            alt="Anh Ha"
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <h2 className="ms-auto font-black text-6xl">WHO WE ARE</h2>
          <TextReveal className="mt-8 text-xl">
            Hội cựu sinh viên IEM - HCMIU là một cộng đồng gắn kết các cựu sinh
            viên của Khoa IEM - HCMIU. Hội được lập ra trên tinh thần kết nối và
            hỗ trợ lẫn nhau giữa các cựu sinh viên.
          </TextReveal>
          <p className="mt-8 text-lg italic">
            Anh Lê Chí Hà - ISE K09, Chủ tịch Hội cựu sinh viên IEM - HCMIU
          </p>
        </div>
      </div>
      <div className="h-[80svh] md:flex md:items-start">
        <div className="flex justify-center md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <Image
            src={'/founders/chi-hoa.jpg'}
            width={400}
            height={400}
            alt="Anh Ha"
            className="size-64 rounded-full object-cover"
          />
        </div>
        <div className="md:sticky md:top-[30svh] md:w-1/2 md:self-start">
          <TextReveal className="mt-8 text-xl">
            "Đối với mình, IEM Alumni chính là ngôi nhà thứ hai của các cựu sinh
            viên."
          </TextReveal>
          <p className="mt-8 text-lg italic">
            Chị Nguyễn Lê Minh Hoa - ISE K17, thành viên Ban Chấp hành Hội cựu
            sinh viên IEM - HCMIU
          </p>
        </div>
      </div>
    </section>
  );
}
