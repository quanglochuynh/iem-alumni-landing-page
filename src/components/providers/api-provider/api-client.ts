import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { authStore } from '@/components/providers/auth-provider/auth.store';
import { STORAGE_KEY } from '@/constants';
import type { RefreshTokenResponse } from '@/types/user.types';

const refreshEndpoint = '/api/refresh-token';
let refreshPromise: Promise<void> | null = null;

export const apiClient = axios.create({
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      !request ||
      error.response?.status !== 401 ||
      request._retry ||
      request.url === refreshEndpoint ||
      request.url === '/api/login'
    ) {
      return Promise.reject(error);
    }

    request._retry = true;
    const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    if (!refreshToken) {
      authStore.getState().logout();
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = apiClient
        .post<RefreshTokenResponse>(refreshEndpoint, { refreshToken })
        .then(({ data }) => {
          localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
        })
        .catch((refreshError: unknown) => {
          if (
            axios.isAxiosError(refreshError) &&
            refreshError.response?.status === 401
          ) {
            localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
            authStore.getState().logout();
          }
          throw refreshError;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;
    return apiClient.request(request);
  },
);
