import { NextRequest } from 'next/server';
import { GET, POST } from './route';

const mockFetchAdmin = jest.fn();

jest.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({
    env: { ADMIN_SERVICE: { fetch: mockFetchAdmin } },
  }),
}));

afterEach(() => {
  mockFetchAdmin.mockReset();
});

test('forwards login requests and preserves the session cookie', async () => {
  mockFetchAdmin.mockImplementation(async (request: Request) => {
    expect(request.url).toBe('https://iem-alumni-admin/api/login?source=web');
    expect(request.method).toBe('POST');
    expect(request.headers.get('content-type')).toBe('application/json');
    expect(await request.json()).toEqual({
      studentId: '123',
      password: 'secret',
    });
    return new Response('{"message":"ok"}', {
      status: 200,
      headers: { 'set-cookie': 'session=token; HttpOnly; Path=/' },
    });
  });
  const response = await POST(
    new NextRequest('https://landing.test/api/login?source=web', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ studentId: '123', password: 'secret' }),
    }),
  );
  expect(response.status).toBe(200);
  expect(response.headers.get('set-cookie')).toContain('session=token');
  expect(mockFetchAdmin).toHaveBeenCalledTimes(1);
});

test('forwards cookies on protected GET requests', async () => {
  mockFetchAdmin.mockImplementation(async (request: Request) => {
    expect(request.url).toBe('https://iem-alumni-admin/api/protected/me');
    expect(request.headers.get('cookie')).toBe('session=token');
    return new Response('unauthorized', { status: 401 });
  });
  const response = await GET(
    new NextRequest('https://landing.test/api/protected/me', {
      headers: { cookie: 'session=token' },
    }),
  );
  expect(response.status).toBe(401);
});
