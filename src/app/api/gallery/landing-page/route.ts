import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getCloudflareContext();
  const albums = await (env.ADMIN_SERVICE as any).getLandingPageAlbums();
  return Response.json(albums);
}
