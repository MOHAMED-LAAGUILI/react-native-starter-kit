import { StorageService } from '@/storage';
import { STORAGE_KEYS } from '@/config/constants';
import type { User, AuthTokens } from '@/types/auth';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user }),

  setTokens: (tokens) => {
    if (tokens) {
      StorageService.setString(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
      StorageService.setString(STORAGE_KEYS.AUTH_REFRESH_TOKEN, tokens.refreshToken);
    } else {
      StorageService.delete(STORAGE_KEYS.AUTH_TOKEN);
      StorageService.delete(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
    }
    set({ tokens, isAuthenticated: tokens !== null });
  },

  setLoading: (isLoading) => set({ isLoading }),

  login: (user, tokens) => {
    StorageService.setString(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    StorageService.setString(STORAGE_KEYS.AUTH_REFRESH_TOKEN, tokens.refreshToken);
    set({ user, tokens, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    StorageService.delete(STORAGE_KEYS.AUTH_TOKEN);
    StorageService.delete(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
    set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
  },

  hydrate: () => {
    const accessToken = StorageService.getString(STORAGE_KEYS.AUTH_TOKEN);
    const refreshToken = StorageService.getString(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
    if (accessToken && refreshToken) {
      set({
        tokens: { accessToken, refreshToken },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },
}));
