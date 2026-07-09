import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { STORAGE_KEYS } from '@/config/constants';
import { ENV } from '@/config/env';
import { StorageService } from '@/storage';

class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;

  constructor(
    message: string,
    status: number,
    options?: { code?: string; data?: unknown },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = options?.code;
    this.data = options?.data;
  }
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    }
    else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
}

const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = StorageService.auth.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ reject, resolve });
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
        const refreshToken = StorageService.auth.getItem<string>(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const { data } = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        });
        const newToken: string = data.accessToken ?? data.tokens?.accessToken;
        StorageService.auth.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
        if (data.refreshToken ?? data.tokens?.refreshToken) {
          StorageService.auth.setItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN, data.refreshToken ?? data.tokens?.refreshToken);
        }
        processQueue(null, newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      }
      catch (refreshError) {
        processQueue(refreshError, null);
        StorageService.auth.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        StorageService.auth.removeItem(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
        return Promise.reject(new Error('Session expired'));
      }
      finally {
        isRefreshing = false;
      }
    }

    if (!error.response) {
      return Promise.reject(new Error('Network error'));
    }

    const apiError = new ApiError(
      (error.response.data as { message?: string })?.message ?? 'Request failed',
      error.response.status,
      { code: (error.response.data as { code?: string })?.code, data: error.response.data },
    );
    return Promise.reject(apiError);
  },
);

export { apiClient };
