import type { CSSProperties } from 'react';

export const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";
export const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";

export const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};
