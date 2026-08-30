import type { TguiPlatform } from '../types/tgui';
import { getTelegramWebApp } from './telegram';

const TELEGRAM_IOS_LIKE = new Set(['ios', 'macos']);

export function getPlatform(): TguiPlatform {
  const webApp = getTelegramWebApp();
  if (webApp) {
    return TELEGRAM_IOS_LIKE.has(webApp.platform) ? 'ios' : 'base';
  }

  if (typeof navigator === 'undefined') {
    return 'base';
  }

  const ua = navigator.userAgent;
  // ipados 13+ reports a mac ua, so check touch points too
  const isIpadOs = ua.includes('Macintosh') && navigator.maxTouchPoints > 1;

  return /iphone|ipad|ipod/i.test(ua) || isIpadOs ? 'ios' : 'base';
}
