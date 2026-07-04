import { ENV } from '@/config/env';
import { StorageService } from '@/storage';
import { STORAGE_KEYS } from '@/config/constants';
import { handleError, ApiError, NetworkError } from '@/errors';
import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
}

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = StorageService.getString(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = StorageService.getString(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
        if (!refreshToken) {
          throw new ApiError('No refresh token available', 401, 'NO_REFRESH_TOKEN');
        }
        const { data } = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        });
        const newToken: string = data.accessToken ?? data.tokens?.accessToken;
        StorageService.setString(STORAGE_KEYS.AUTH_TOKEN, newToken);
        if (data.refreshToken ?? data.tokens?.refreshToken) {
          StorageService.setString(
            STORAGE_KEYS.AUTH_REFRESH_TOKEN,
            data.refreshToken ?? data.tokens?.refreshToken,
          );
        }
        processQueue(null, newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        StorageService.delete(STORAGE_KEYS.AUTH_TOKEN);
        StorageService.delete(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
        return Promise.reject(new ApiError('Session expired', 401, 'SESSION_EXPIRED'));
      } finally {
        isRefreshing = false;
      }
    }

    if (!error.response) {
      handleError(new NetworkError());
      return Promise.reject(new NetworkError());
    }

    const apiError = new ApiError(
      (error.response.data as { message?: string })?.message ?? 'Request failed',
      error.response.status,
      (error.response.data as { code?: string })?.code,
      error.response.data,
    );
    handleError(apiError);
    return Promise.reject(apiError);
  },
);

export { apiClient };
