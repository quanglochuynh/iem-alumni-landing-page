# IEM Alumni Landing Page

Built with Next.js App Router, Tailwind CSS v4, and shadcn-style UI components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5500](http://localhost:5500) with your browser to see the result.

The localized landing page is at `src/app/[locale]/page.tsx`. Content is composed from section components under `src/components/sections` and data in `src/constants/content.ts`.

Tailwind v4 is enabled via `@import "tailwindcss"` in `globals.css`. A small set of shadcn-like design tokens (CSS variables) are defined there for consistent theming.

Remote images from the demo site are allowed via `next.config.ts` `images.remotePatterns`.

## Structure

- `src/components/ui/button.tsx` – Minimal Button component styled with Tailwind and the design tokens.
- `src/components/sections/*` – Navbar, Hero, Schedule, Speakers, Organisers, Sponsors, Footer.
- `src/constants/content.ts` – All strings, images, and arrays for the landing page sections.
- `src/app/globals.css` – Tailwind import and theme tokens.

## Customization

- To update schedule items, speakers, or sponsor logos, edit `src/constants/content.ts`.
- To change section layout or styles, tweak the components in `src/components/sections`.

## Notes

- This project targets Cloudflare using `@opennextjs/cloudflare`. Use `pnpm preview` to build and preview on Cloudflare.

## Fonts

Google fonts are loaded via `next/font`. In `src/app/[locale]/layout.tsx`:

- `Noto_Serif` is applied to the `<body>` using its generated `.className`.
- `Noto_Sans_Mono` is attached as a CSS variable via `.variable` so it doesn't override the body font.

Utilities are mapped in `tailwind.config.ts` so you can use Tailwind classes:

- `font-serif` -> `var(--font-noto-serif), serif`
- `font-mono` -> `var(--font-noto-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

Additionally, `globals.css` applies the mono font to `code`, `pre`, `kbd`, and `samp` elements automatically. Use `className="font-mono"` anywhere else you want monospaced text.
