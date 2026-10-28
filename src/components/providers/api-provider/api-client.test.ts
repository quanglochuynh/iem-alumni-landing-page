import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { apiClient } from './api-client';

jest.mock('@/constants', () => ({
  STORAGE_KEY: { REFRESH_TOKEN: 'refresh_token' },
}));

const storage = new Map<string, string>();
const originalAdapter = apiClient.defaults.adapter;

function unauthorized(config: InternalAxiosRequestConfig) {
  return new AxiosError('Unauthorized', '401', config, undefined, {
    data: {},
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config,
  });
}

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
});

afterEach(() => {
  storage.clear();
  authStore.getState().logout();
  apiClient.defaults.adapter = originalAdapter;
});

test('invalid login does not attempt to refresh an existing session', async () => {
  storage.set('refresh_token', 'old-token');
  const urls: string[] = [];
  apiClient.defaults.adapter = async (config) => {
    urls.push(config.url ?? '');
    throw unauthorized(config);
  };

  await expect(apiClient.post('/api/login', {})).rejects.toMatchObject({
    response: { status: 401 },
  });
  expect(urls).toEqual(['/api/login']);
  expect(storage.get('refresh_token')).toBe('old-token');
});

test('concurrent unauthorized requests share a refresh and retry', async () => {
  storage.set('refresh_token', 'old-token');
  let refreshes = 0;
  apiClient.defaults.adapter = async (config) => {
    if (config.url === '/api/refresh-token') {
      refreshes += 1;
      await new Promise((resolve) => setTimeout(resolve, 10));
      return {
        data: { refreshToken: 'new-token' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }
    if (storage.get('refresh_token') === 'old-token') {
      throw unauthorized(config);
    }
    return { data: 'ok', status: 200, statusText: 'OK', headers: {}, config };
  };

  const responses = await Promise.all([
    apiClient.get('/api/protected/me'),
    apiClient.get('/api/protected/other'),
  ]);
  expect(responses.map((response) => response.data)).toEqual(['ok', 'ok']);
  expect(refreshes).toBe(1);
  expect(storage.get('refresh_token')).toBe('new-token');
});

test('an expired refresh token is removed and the error is surfaced', async () => {
  storage.set('refresh_token', 'expired');
  apiClient.defaults.adapter = async (config) => {
    throw unauthorized(config);
  };

  await expect(apiClient.get('/api/protected/me')).rejects.toBeInstanceOf(
    axios.AxiosError,
  );
  expect(storage.has('refresh_token')).toBe(false);
});

test('a failed refresh due to a network error retains the token', async () => {
  storage.set('refresh_token', 'valid-token');
  apiClient.defaults.adapter = async (config) => {
    if (config.url === '/api/refresh-token') {
      throw new AxiosError('Network error', 'ERR_NETWORK', config);
    }
    throw unauthorized(config);
  };

  await expect(apiClient.get('/api/protected/me')).rejects.toMatchObject({
    code: 'ERR_NETWORK',
  });
  expect(storage.get('refresh_token')).toBe('valid-token');
});
