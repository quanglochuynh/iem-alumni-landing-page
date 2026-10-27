import Image from 'next/image';

export default function OurPeoplePage() {
  return (
    <main className="min-h-svh">
      <Image
        src="/bg/abstract-bg.png"
        className="pointer-events-none absolute top-0 left-0 z-0 w-full"
        alt="Our People"
        width={1920}
        height={1080}
        draggable={false}
      />
    </main>
  );
}
