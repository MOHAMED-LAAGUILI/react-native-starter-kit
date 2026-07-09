export type PublicPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  message: string;
  code?: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};
