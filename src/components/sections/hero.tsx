import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ABOUT, HERO } from "@/constants/content";

export function Hero() {
  return (
    <section id="home" className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">{HERO.title}</h1>
          <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground">
            {HERO.subtitle}
          </h3>
          <div className="space-y-2 text-sm md:text-base">
            <p className="font-medium">{HERO.date}</p>
            <p>{HERO.address}</p>
          </div>
          <div className="pt-4 space-y-6">
            <h2 id="about" className="text-3xl font-bold">
              {ABOUT.heading}
            </h2>
            <p className="text-lg font-semibold">{ABOUT.strong}</p>
            <p>{ABOUT.p1}</p>
            <p>{ABOUT.p2}</p>
            <Button>{ABOUT.cta}</Button>
          </div>
        </div>
        <div className="relative aspect-12/5 w-full overflow-hidden rounded-lg shadow">
          <Image
            src={HERO.image}
            alt="Event hero image"
            fill
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
