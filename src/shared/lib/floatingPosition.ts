export type FloatingSide = 'top' | 'bottom' | 'left' | 'right';
export type FloatingAlign = 'start' | 'center' | 'end';
export type FloatingPlacement = FloatingSide | `${FloatingSide}-start` | `${FloatingSide}-end`;

export interface FloatingPosition {
  top: number;
  left: number;
  side: FloatingSide;
}

const MARGIN = 8;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function parsePlacement(placement: FloatingPlacement): {
  side: FloatingSide;
  align: FloatingAlign;
} {
  const [side, align] = placement.split('-') as [FloatingSide, FloatingAlign | undefined];
  return { side, align: align ?? 'center' };
}

export function computeFloatingPosition(
  anchor: DOMRect,
  floating: DOMRect,
  placement: FloatingPlacement,
  gap: number,
): FloatingPosition {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { side: wantSide, align } = parsePlacement(placement);
  let side = wantSide;

  if (side === 'top' && anchor.top - floating.height - gap < MARGIN) side = 'bottom';
  else if (side === 'bottom' && anchor.bottom + floating.height + gap > vh - MARGIN) side = 'top';
  else if (side === 'left' && anchor.left - floating.width - gap < MARGIN) side = 'right';
  else if (side === 'right' && anchor.right + floating.width + gap > vw - MARGIN) side = 'left';

  let top = 0;
  let left = 0;

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') left = anchor.left;
    else if (align === 'end') left = anchor.right - floating.width;
    else left = anchor.left + anchor.width / 2 - floating.width / 2;
    top = side === 'top' ? anchor.top - floating.height - gap : anchor.bottom + gap;
  } else {
    if (align === 'start') top = anchor.top;
    else if (align === 'end') top = anchor.bottom - floating.height;
    else top = anchor.top + anchor.height / 2 - floating.height / 2;
    left = side === 'left' ? anchor.left - floating.width - gap : anchor.right + gap;
  }

  left = clamp(left, MARGIN, vw - floating.width - MARGIN);
  top = clamp(top, MARGIN, vh - floating.height - MARGIN);

  return { top, left, side };
}
