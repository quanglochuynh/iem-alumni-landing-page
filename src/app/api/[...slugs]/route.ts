import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { NextRequest } from 'next/server';

// In `next dev`, the ADMIN_SERVICE binding resolves to the admin Vite dev
// server's proxy worker, which answers non-RPC requests with a 404. Call the
// Vite dev server over HTTP instead.
const DEV_ADMIN_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? (process.env.ADMIN_DEV_ORIGIN ?? 'http://localhost:5501')
    : null;

async function ALL(req: NextRequest) {
  const path = `${req.nextUrl.pathname}${req.nextUrl.search}`;
  const body =
    req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : await req.arrayBuffer();

  if (DEV_ADMIN_ORIGIN) {
    const headers = new Headers(req.headers);
    headers.delete('host');
    headers.delete('content-length');
    const result = await fetch(new URL(path, DEV_ADMIN_ORIGIN), {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
    });
    return new Response(result.body, result);
  }

  const { env } = getCloudflareContext();
  const result = await env.ADMIN_SERVICE.fetch(
    new Request(new URL(path, 'https://iem-alumni-admin'), {
      method: req.method,
      headers: req.headers,
      body,
    }),
  );

  return new Response(result.body, result);
}

export { ALL as DELETE, ALL as GET, ALL as PATCH, ALL as POST, ALL as PUT };
