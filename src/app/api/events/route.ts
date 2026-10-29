import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { TEventPreview } from '@/features/event/event.type';

export async function GET() {
  const { env } = getCloudflareContext();
  const events: TEventPreview[] = await (env.ADMIN_SERVICE as any).getEvents(
    {},
  );
  return Response.json(events);
}
