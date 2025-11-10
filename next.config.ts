import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "websitedemos.net",
      },
      {
        protocol: "https",
        hostname: "websitedemos.net",
        pathname: "/brandstore-05/**",
      },
    ],
  },
};

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev();

const i18nConfig = withNextIntl(nextConfig);

export default i18nConfig;
