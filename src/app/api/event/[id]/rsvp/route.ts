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
    `/api/protected/event/${encodeURIComponent(id)}/rsvp`,
    'https://iem-alumni-admin',
  );
  const cookie = request.headers.get('Cookie');
  const adminRequest = new Request(target, {
    method: 'POST',
    headers: {
      'Content-Type': request.headers.get('Content-Type') ?? 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: await request.arrayBuffer(),
  });

  const result = await env.ADMIN_SERVICE.fetch(adminRequest);
  return new Response(result.body, result);
}
