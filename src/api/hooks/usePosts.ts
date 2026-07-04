import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/api/endpoints";
import { QUERY_KEYS } from "@/config/constants";

export function usePosts() {
  return useInfiniteQuery({
    getNextPageParam: (lastPage: { meta?: { page: number; totalPages: number } }) => {
      if (!lastPage.meta) return undefined;
      return lastPage.meta.page < lastPage.meta.totalPages ? lastPage.meta.page + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => postsApi.list({ page: pageParam, pageSize: 20 }),
    queryKey: QUERY_KEYS.POSTS,
  });
}

export function usePost(id: string) {
  return useQuery({
    enabled: !!id,
    queryFn: () => postsApi.detail(id),
    queryKey: [...QUERY_KEYS.POSTS, id],
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
