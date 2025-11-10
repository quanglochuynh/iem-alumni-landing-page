import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { ILocaleParams } from "@/interfaces";
import { getMetadataTranslations } from "@/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  props: ILocaleParams
): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getMetadataTranslations(locale);

  return {
    applicationName: "IEM Alumni - HCMIU",
    title: t("Title"),
    description: t("Description"),
    openGraph: {
      locale,
      type: "website",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("Title"),
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
