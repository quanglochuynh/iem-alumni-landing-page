import Image from "next/image";
import { SPEAKERS, SPEAKERS_INTRO } from "@/constants/content";

export function Speakers() {
  return (
    <section id="speakers" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl font-bold mb-4">{SPEAKERS_INTRO.heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SPEAKERS_INTRO.description}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {SPEAKERS.map((sp) => (
          <div key={sp.name} className="space-y-3">
            <div className="relative aspect-1 w-full overflow-hidden rounded-lg shadow">
              <Image
                src={sp.image}
                alt={sp.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h4 className="text-lg font-semibold">{sp.name}</h4>
            <p className="text-sm text-muted-foreground">{sp.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
