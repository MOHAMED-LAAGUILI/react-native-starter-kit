import { ENV } from '@/config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  debug(message: string, data?: unknown): void {
    if (!ENV.IS_DEV) return;
    const entry = this.formatMessage('debug', message, data);
    console.debug(`[DEBUG] ${entry.timestamp}`, entry.message, data ?? '');
  }

  info(message: string, data?: unknown): void {
    const entry = this.formatMessage('info', message, data);
    console.info(`[INFO] ${entry.timestamp}`, entry.message, data ?? '');
  }

  warn(message: string, data?: unknown): void {
    const entry = this.formatMessage('warn', message, data);
    console.warn(`[WARN] ${entry.timestamp}`, entry.message, data ?? '');
  }

  error(message: string, data?: unknown): void {
    const entry = this.formatMessage('error', message, data);
    console.error(`[ERROR] ${entry.timestamp}`, entry.message, data ?? '');
  }
}

export const logger = new Logger();
