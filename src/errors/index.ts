import { logger } from '@/logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export function handleError(error: unknown): void {
  if (error instanceof ApiError) {
    logger.error(`API Error [${error.statusCode}]: ${error.message}`, error.details);
  } else if (error instanceof NetworkError) {
    logger.error('Network Error: No internet connection');
  } else if (error instanceof AppError) {
    logger.error(`App Error: ${error.message}`);
  } else if (error instanceof Error) {
    logger.error(`Unhandled Error: ${error.message}`, error.stack);
  } else {
    logger.error('Unknown error', error);
  }
}
