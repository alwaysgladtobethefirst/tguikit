import type { CSSProperties } from 'react';

// the tgui provider resets font-family to the client's system font, so doc pages set these back.
export const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";
export const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";

// the small mono label that sits above an example and names what it shows
export const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};
