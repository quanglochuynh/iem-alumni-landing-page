import { Button } from "@/components/ui/button";
import { FOOTER } from "@/constants/content";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-primary text-primary-foreground">
      <div className="container py-10">
        <h2 className="text-2xl font-bold">{FOOTER.title}</h2>
      </div>
      <div className="bg-background text-foreground">
        <div className="container grid md:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="font-semibold mb-3">{FOOTER.aboutTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{FOOTER.aboutText}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{FOOTER.addressTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{FOOTER.addressText}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{FOOTER.dateTitle}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{FOOTER.dateText}</p>
          </div>
          <div>
            <Button>{FOOTER.cta}</Button>
          </div>
        </div>
      </div>
      <div>
        <iframe
          title="map"
          className="w-full"
          height={300}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={FOOTER.mapSrc}
        />
      </div>
      <div className="bg-background text-foreground border-t">
        <div className="container py-6 text-sm text-muted-foreground">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
