import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/constants';
import { postsApi } from '@/api/endpoints';

export function usePosts() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: ({ pageParam = 1 }) => postsApi.list({ page: pageParam, pageSize: 20 }),
    getNextPageParam: (lastPage: { meta?: { page: number; totalPages: number } }) => {
      if (!lastPage.meta) return undefined;
      return lastPage.meta.page < lastPage.meta.totalPages
        ? lastPage.meta.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POSTS, id],
    queryFn: () => postsApi.detail(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => postsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
}

export function useUpdatePost(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => postsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.POSTS, id] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
    },
  });
}
