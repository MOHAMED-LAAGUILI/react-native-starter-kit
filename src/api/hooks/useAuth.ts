import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/constants';
import { authApi } from '@/api/endpoints';
import { useAuthStore } from '@/store';
import type { LoginRequest } from '@/types/auth';

export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      login(response.user, response.tokens);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: { email: string; password: string; name: string }) => authApi.register(data),
    onSuccess: (response) => {
      login(response.user, response.tokens);
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      logout();
    },
  });
}

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: () => authApi.getMe(),
    enabled: isAuthenticated,
  });
}
