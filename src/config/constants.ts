export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth.token',
  AUTH_REFRESH_TOKEN: 'auth.refresh_token',
  THEME_MODE: 'theme.mode',
  LANGUAGE: 'i18n.language',
} as const;

export const QUERY_KEYS = {
  AUTH: ['auth'],
  USER: ['user'],
  POSTS: ['posts'],
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: string) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
  },
} as const;
