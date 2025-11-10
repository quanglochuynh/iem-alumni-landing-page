import type { Config } from 'tailwindcss';

// Tailwind v4 uses the new "@tailwindcss/postcss" preset via PostCSS; config kept minimal.
// We expose font families so utility classes (e.g., font-serif, font-mono) map correctly.
const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'serif'],
        mono: ['var(--font-noto-mono)'],
      },
    },
  },
};

export default config;
