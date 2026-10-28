import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return Response.json({ message: 'Event ID is required' }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const target = new URL(
    `/api/event/${encodeURIComponent(id)}/rsvp`,
    'https://iem-alumni-admin',
  );
  const adminRequest = new Request(target, {
    method: 'POST',
    headers: {
      'Content-Type': request.headers.get('Content-Type') ?? 'application/json',
    },
    body: await request.arrayBuffer(),
  });

  return env.ADMIN_SERVICE.fetch(adminRequest);
}
