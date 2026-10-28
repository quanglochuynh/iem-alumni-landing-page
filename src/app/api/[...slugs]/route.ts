import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { NextRequest } from 'next/server';

async function ALL(req: NextRequest) {
  const { env } = getCloudflareContext();
  const target = new URL(
    `${req.nextUrl.pathname}${req.nextUrl.search}`,
    'https://iem-alumni-admin',
  );

  const result = await env.ADMIN_SERVICE.fetch(
    new Request(target, {
      method: req.method,
      headers: req.headers,
      body:
        req.method === 'GET' || req.method === 'HEAD'
          ? undefined
          : await req.arrayBuffer(),
    }),
  );

  return new Response(result.body, result);
}

export { ALL as DELETE, ALL as GET, ALL as PATCH, ALL as POST, ALL as PUT };
