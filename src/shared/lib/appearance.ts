import type { Appearance } from '../types/tgui';
import { getTelegramWebApp } from './telegram';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function canMatchMedia() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

export function getAppearance(): Appearance {
  const webApp = getTelegramWebApp();
  if (webApp) {
    return webApp.colorScheme === 'dark' ? 'dark' : 'light';
  }

  if (canMatchMedia()) {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  }

  return 'light';
}

export function subscribeAppearance(onChange: () => void): () => void {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.onEvent('themeChanged', onChange);
    return () => webApp.offEvent('themeChanged', onChange);
  }

  if (!canMatchMedia()) {
    return () => {};
  }

  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
