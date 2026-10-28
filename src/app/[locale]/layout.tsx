import type { Metadata, Viewport } from 'next';
import { Lexend_Deca } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PopupModal from '@/features/wiema2025/popup-modal/popup-modal';
import { getMetadataTranslations } from '@/hooks';
import { routing } from '@/i18n/routing';
import type { ILocaleParams } from '@/interfaces';
import { cn } from '@/lib/utils';
import '../globals.css';
import localFont from 'next/font/local';

const brodille = localFont({
  src: '../../../public/fonts/Brodille.woff2',
  variable: '--font-heading',
});

const lexendDeca = Lexend_Deca({
  variable: '--font-sans',
  subsets: ['latin', 'vietnamese'],
});

export async function generateMetadata(
  props: ILocaleParams,
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
          property="og:image"
          content="/wiema-cover.webp"
          key={'og:image'}
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={cn(brodille.variable, lexendDeca.variable, 'antialiased')}
      >
        <NextIntlClientProvider messages={messages}>
          <PopupModal />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
