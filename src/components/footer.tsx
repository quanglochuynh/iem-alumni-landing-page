'use client';

import { Edit } from 'lucide-react';
import Image from 'next/image';
import { FOOTER } from '@/constants/content.constant';
import { useInfoTranslation } from '@/hooks';
import { StripTags } from '@/lib/rich-text.util';

export default function Footer() {
  const infoTrans = useInfoTranslation();
  return (
    <footer className="border-t bg-primary font-sans text-primary-foreground">
      <div className="container mt-16 flex flex-col items-center gap-4 md:flex-row">
        <Image
          width={64}
          height={64}
          src={'/iema-logo-bg-md.png'}
          alt={'IEMA Logo'}
          className="rounded-2xl"
        />
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
              {infoTrans('CONTACT_US.address')}
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
        </div>
      </div>
      {/* <div className='mt-8 flex justify-center'>
        <iframe
          title='map'
          className='w-full md:w-3/2'
          height={400}
          style={{ border: 0 }}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          src={FOOTER.mapSrc}
        />
      </div> */}
      <div className="container flex flex-wrap items-center gap-2 py-6 text-primary-foreground">
        <p className="text-muted-foreground text-sm">{FOOTER.copyright}</p>
        <a
          className="ms-auto font-mono text-muted-foreground text-sm hover:underline"
          href={FOOTER.suggestEditsUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Edit className="mr-2 inline" size={16} />
          Suggest edits
        </a>
      </div>
    </footer>
  );
}
