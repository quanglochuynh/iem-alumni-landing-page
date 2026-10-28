import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { NextRequest } from 'next/server';

async function ALL(req: NextRequest) {
  const { env } = getCloudflareContext();
  const path = req.nextUrl.pathname;
  const forwardPath = `${env.ADMIN_SERVICE_URL}${path.split('/api').pop()}`;

  // biome-ignore lint/suspicious/noExplicitAny: check wrangler.jsonc
  const result: Response = await (env.ADMIN_SERVICE as any).fetch(
    new Request(forwardPath, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    })
  );

  return new Response(result.body, result);
}

export { ALL as DELETE, ALL as GET, ALL as PATCH, ALL as POST, ALL as PUT };
