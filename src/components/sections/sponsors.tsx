import Image from "next/image";
import { SPONSORS_INTRO, SPONSOR_LOGOS } from "@/constants/content";

export function Sponsors() {
  return (
    <section id="sponsors" className="container py-16 md:py-24">
      <div className="max-w-3xl mb-10">
        <h2 className="text-3xl font-bold mb-4">{SPONSORS_INTRO.heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SPONSORS_INTRO.description}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {SPONSOR_LOGOS.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center p-4 rounded-md border bg-card"
          >
            <Image
              src={logo}
              alt={`Sponsor ${i + 1}`}
              width={160}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
