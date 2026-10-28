import { STORAGE_KEY } from '@/constants';
import { AppRoute } from '@/interfaces';
import type { RefreshTokenResponse } from '@/types/user.types';
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const refreshEndpoint = '/api/refresh-token';

export const apiClient = axios.create({
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Avoid infinite loop if the refresh request itself fails
    if (originalRequest.url === refreshEndpoint) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (apiClient.defaults.headers.common['isRefreshing']) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!apiClient.defaults.headers.common['isRefreshing']) {
              clearInterval(interval);
              resolve(apiClient.request(originalRequest));
            }
          }, 100);
        });
      }

      originalRequest._retry = true;
      apiClient.defaults.headers.common['isRefreshing'] = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);

        if (!refreshToken) {
          return Promise.reject(error);
        }
        const { data } = await apiClient.post<RefreshTokenResponse>(
          refreshEndpoint,
          {
            refreshToken,
          }
        );

        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
        return apiClient.request(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
        window.location.href = AppRoute.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        delete apiClient.defaults.headers.common['isRefreshing'];
      }
    }

    return Promise.reject(error);
  }
);
