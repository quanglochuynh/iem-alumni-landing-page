import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ORGANISERS } from "@/constants/content";

export function Organisers() {
  return (
    <section
      id="organisers"
      className="container py-16 md:py-24 bg-secondary/30 rounded-xl"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-5/4 w-full overflow-hidden rounded-lg shadow">
          <Image
            src={ORGANISERS.image}
            alt="Organisers"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{ORGANISERS.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {ORGANISERS.description1}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {ORGANISERS.description2}
          </p>
          <Button size="md">{ORGANISERS.cta}</Button>
        </div>
      </div>
    </section>
  );
}
