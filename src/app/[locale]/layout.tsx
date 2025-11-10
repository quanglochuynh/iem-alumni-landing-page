import { getMetadataTranslations } from '@/hooks';
import { routing } from '@/i18n/routing';
import { ILocaleParams } from '@/interfaces';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Noto_Sans_Mono, Noto_Serif } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
});

const notoMono = Noto_Sans_Mono({
  variable: '--font-noto-mono',
  subsets: ['latin'],
});

export async function generateMetadata(
  props: ILocaleParams
): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getMetadataTranslations(locale);

  return {
    applicationName: 'IEM Alumni - HCMIU',
    title: t('Title'),
    description: t('Description'),
    openGraph: {
      locale,
      type: 'website',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('Title'),
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({ children, params }: ILocaleParams) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <meta
          property='og:image'
          content='/iema-logo-bg-md.png'
          key={'og:image'}
        />
        <meta property='og:image:width' content='512' />
        <meta property='og:image:height' content='512' />
        <meta name='mobile-web-app-capable' content='yes' />
      </head>
      <body
        // className={`${notoSerif.className} ${notoMono.variable} antialiased`}
        className={cn(
          notoSerif.className,
          notoMono.variable,
          'font-serif antialiased'
        )}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
