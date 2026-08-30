import type { WebApp } from '../types/telegram';

export function getTelegramWebApp(): WebApp | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.Telegram?.WebApp;
}
