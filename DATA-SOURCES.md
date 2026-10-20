# Landing Page Data Sources

This document describes where the landing page gets its content and how it
connects to the admin service. The application is split across two
repositories:

- `iem-alumni-landing-page` — Next.js site and Cloudflare Worker.
- `iem-alumni-admin` — admin UI and the Cloudflare Worker that owns content
  APIs and storage.

## At a glance

| Data                                    | Source                                               | How the landing page uses it                                         |
| --------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| Home page sections and campaign content | Components and localized messages in this repository | Rendered locally; not fetched from the admin service                 |
| Articles, careers, events               | Admin Worker, backed by Cloudflare D1                | Read server-side for listing and detail pages                        |
| Images and uploaded files               | Cloudflare R2, managed by the admin Worker           | Referenced by file path and rendered from the configured R2 base URL |
| UI text and translations                | `src/messages/` and `src/i18n/` in this repository   | Selected using the route locale                                      |
| Event registrations                     | Admin Worker's public RSVP API, backed by D1         | Submitted from the landing page's RSVP form                          |

## Request and storage flow

1. A localized Next.js route renders on the server.
2. The page obtains the Cloudflare environment with
   `getCloudflareContext()` and calls a method on `env.ADMIN_SERVICE`.
3. The landing Worker's `ADMIN_SERVICE` binding targets the service named
   `iem-alumni-admin`, as configured in `wrangler.jsonc`.
4. The admin Worker exposes these calls as `WorkerEntrypoint` methods in
   `iem-alumni-admin/worker/index.ts`. The methods use Prisma with the D1
   `DB` binding to query content records.
5. Content records refer to uploaded file paths. The landing page builds image
   URLs using `NEXT_PUBLIC_R2_BASE_URL`; the image bytes are served from the
   configured R2-facing URL, not returned in the Worker RPC response.

The landing page uses Worker service-binding RPC for content reads. These
calls are not HTTP requests to the admin site's `/api/...` routes. The admin
Worker also serves its HTTP API and a public `/api/file/*` route for R2 files.

## Content consumed by the landing page

| Page                       | Admin Worker method      | Data behavior                                                                           |
| -------------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `/[locale]/articles`       | `getArticles({})`        | Articles ordered newest first; each listing item includes author and thumbnail metadata |
| `/[locale]/article/[slug]` | `getArticleBySlug(slug)` | Article detail, including body, author, and thumbnail                                   |
| `/[locale]/careers`        | `getCareers({})`         | Active careers ordered newest first; body omitted from listing records                  |
| `/[locale]/career/[slug]`  | `getCareerBySlug(slug)`  | Career detail, including body and thumbnail                                             |
| `/[locale]/events`         | `getEvents({})`          | Up to 40 active events; the page splits them into upcoming and past events              |
| `/[locale]/event/[slug]`   | `getEventBySlug(slug)`   | Event detail, including body and thumbnail                                              |

The method implementations live in `iem-alumni-admin/worker/index.ts`; their
queries are in the corresponding `worker/features/{articles,careers,events}`
service files. D1's models are defined in
`iem-alumni-admin/prisma/schema.prisma`.

Article and career listing calls pass an empty pagination object. The Worker
accepts optional `search`, `skip`, and `take` inputs, but these page calls do
not currently specify a locale or pagination. The event Worker method fixes
the listing limit at 40. Career and event listing queries filter out inactive
records; article listing does not apply an active-state filter.

Although content records have a `locale` field, the listing and slug lookups
used here do not filter by the route locale. Route locale currently selects
the landing page's UI translations, rather than selecting a separate
language-specific content query.

## Static and localized content

The root landing page is composed locally in
`src/features/home/landing.page.tsx` and its section components. The WIEMA 2025
page content is also local, in `src/features/wiema2025/` and the localized
message files under `src/messages/`. Shared UI translations and locale routing
are maintained in `src/messages/` and `src/i18n/`.

These pages do not use the admin service as a content-management source.

## Media and RSVP

- Article, career, and event records store file metadata and paths; uploaded
  file bytes are stored in the admin Worker's R2 bucket.
- `src/lib/cloudflare.helper.ts` turns a file path into a URL using
  `NEXT_PUBLIC_R2_BASE_URL`. Configure that value for the desired public R2
  delivery host in each landing-page environment.
- The admin Worker exposes `POST /api/event/:id/rsvp` and stores registrations
  in D1's `EventRegistration` table. The landing page's event RSVP form submits
  the registration fields `name`, `email`, `phone`, `studentId`, `password`,
  `confirmPassword`, `academicYear`, and `major`, plus optional `bio`, to its
  same-origin `/api/event/:id/rsvp` route, which forwards the request through
  the `ADMIN_SERVICE` binding.

## Configuration to keep aligned

- In the landing repository, `wrangler.jsonc` declares the
  `ADMIN_SERVICE` service binding and target Worker name. Keep the target
  service name aligned with the deployed admin Worker.
- In the admin repository, `wrangler.jsonc` declares the D1 `DB` binding and
  R2 `Bucket` binding used by the content and file services.
- Set `NEXT_PUBLIC_R2_BASE_URL` in the landing repository's build/runtime
  environment to the public URL base corresponding to uploaded R2 file paths.
