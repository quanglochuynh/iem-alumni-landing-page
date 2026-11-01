'use client';

import { Edit } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FOOTER } from '@/constants/content.constant';
import { useInfoTranslation } from '@/hooks';
import { getKey } from '@/lib';
import { StripTags } from '@/lib/rich-text.util';

export default function Footer() {
  const infoTrans = useInfoTranslation();
  const landingT = useTranslations('Landing');
  return (
    <footer className="border-t bg-primary font-sans text-primary-foreground">
      <div className="container mt-16 flex flex-col items-center gap-4 md:flex-row">
        <div className="rounded-lg bg-muted p-2">
          <Image
            width={64}
            height={64}
            src={'/web-app-manifest-192x192.png'}
            alt={landingT('logoAlt')}
            className="rounded-2xl"
          />
        </div>
        <h2 className="font-black text-2xl lg:text-6xl">
          {infoTrans('FOOTER.heading')}
        </h2>
      </div>
      <div>
        <div className="container grid gap-8 py-12 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold">
              {infoTrans('ABOUT_US.heading')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {StripTags(infoTrans.raw('ABOUT_US.description'))}
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">
              {infoTrans('CONTACT_US.heading')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {infoTrans('CONTACT_US.description')}
            </p>
            <p className="text-background text-sm">
              <a
                href={FOOTER.mapUrl}
                className="underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                {infoTrans('CONTACT_US.address')}
              </a>
              <br />
              {infoTrans('CONTACT_US.email')}
              <br />
              {infoTrans('CONTACT_US.phone')}
              <br />
              <a href="https://iemalumni.org" className="underline">
                iemalumni.org
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">
              {infoTrans('USEFUL_LINKS.heading')}
            </h3>
            <ul className="grid gap-2 text-muted-foreground text-sm">
              {Object.values(infoTrans.raw('USEFUL_LINKS.links')).map(
                (link: any, index: number) => {
                  const shouldOpenInNewTab = link.url.startsWith('http');
                  return (
                    <li key={getKey('link', index)} className="ms-2">
                      <a
                        href={link.url}
                        className="underline"
                        target={shouldOpenInNewTab ? '_blank' : '_self'}
                        rel={
                          shouldOpenInNewTab ? 'noreferrer noopener' : undefined
                        }
                      >
                        {link.title}
                      </a>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="container flex flex-wrap items-center gap-2 py-6 text-primary-foreground">
        <p className="text-muted-foreground text-sm">{landingT('copyright')}</p>
        <a
          className="ms-auto mr-8 font-mono text-muted-foreground text-sm hover:underline"
          href={FOOTER.suggestEditsUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Edit className="mr-2 inline" size={16} />
          {landingT('suggestEdits')}
        </a>
      </div>
    </footer>
  );
}
