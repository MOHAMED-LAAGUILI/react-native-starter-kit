export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};
