'use client';

import {
  type CSSProperties,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { Portal } from '../Portal';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  ref?: Ref<HTMLSpanElement>;
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const GAP = 8;
const MARGIN = 8;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

interface Position {
  top: number;
  left: number;
  placement: TooltipPlacement;
  originX: number;
  originY: number;
  arrow: CSSProperties;
}

function compute(trigger: DOMRect, tip: DOMRect, want: TooltipPlacement): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let placement = want;
  if (placement === 'top' && trigger.top - tip.height - GAP < MARGIN) placement = 'bottom';
  else if (placement === 'bottom' && trigger.bottom + tip.height + GAP > vh - MARGIN)
    placement = 'top';
  else if (placement === 'left' && trigger.left - tip.width - GAP < MARGIN) placement = 'right';
  else if (placement === 'right' && trigger.right + tip.width + GAP > vw - MARGIN)
    placement = 'left';

  let top = 0;
  let left = 0;
  if (placement === 'top' || placement === 'bottom') {
    left = trigger.left + trigger.width / 2 - tip.width / 2;
    top = placement === 'top' ? trigger.top - tip.height - GAP : trigger.bottom + GAP;
  } else {
    top = trigger.top + trigger.height / 2 - tip.height / 2;
    left = placement === 'left' ? trigger.left - tip.width - GAP : trigger.right + GAP;
  }
  left = clamp(left, MARGIN, vw - tip.width - MARGIN);
  top = clamp(top, MARGIN, vh - tip.height - MARGIN);

  const centerX = trigger.left + trigger.width / 2 - left;
  const centerY = trigger.top + trigger.height / 2 - top;
  const arrow: CSSProperties = {};
  if (placement === 'top') {
    arrow.left = clamp(centerX, 10, tip.width - 10) - 4;
    arrow.bottom = -4;
  } else if (placement === 'bottom') {
    arrow.left = clamp(centerX, 10, tip.width - 10) - 4;
    arrow.top = -4;
  } else if (placement === 'left') {
    arrow.top = clamp(centerY, 10, tip.height - 10) - 4;
    arrow.right = -4;
  } else {
    arrow.top = clamp(centerY, 10, tip.height - 10) - 4;
    arrow.left = -4;
  }

  return {
    top,
    left,
    placement,
    originX: clamp(centerX, 0, tip.width),
    originY: clamp(centerY, 0, tip.height),
    arrow,
  };
}

export function Tooltip({
  ref,
  children,
  content,
  placement = 'top',
  open: openProp,
  onOpenChange,
  className,
}: TooltipProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = openProp ?? uncontrolled;

  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pos, setPos] = useState<Position | null>(null);
  const [visible, setVisible] = useState(false);
  const id = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp == null) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const reposition = useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;
    setPos(compute(trigger.getBoundingClientRect(), tip.getBoundingClientRect(), placement));
  }, [placement]);

  useLayoutEffect(() => {
    if (!open) {
      setVisible(false);
      setPos(null);
      return;
    }
    reposition();
  }, [open, reposition]);

  useEffect(() => {
    if (!open || !pos) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', reposition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open, pos, reposition, setOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const clearPress = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }, []);

  useEffect(() => clearPress, [clearPress]);

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: this span only relays hover/focus to the described tooltip; the child is the real control */}
      <span
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as { current: HTMLSpanElement | null }).current = node;
        }}
        className={cn(styles.trigger, className)}
        aria-describedby={open ? id : undefined}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'touch') setOpen(false);
          clearPress();
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') {
            pressTimer.current = setTimeout(() => setOpen(true), 450);
          }
        }}
        onPointerUp={clearPress}
        onPointerCancel={clearPress}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>
      {open ? (
        <Portal>
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            className={cn(styles.tooltip, visible && styles['tooltip--visible'])}
            style={
              pos
                ? ({
                    top: pos.top,
                    left: pos.left,
                    '--tgui--tooltip--origin-x': `${pos.originX}px`,
                    '--tgui--tooltip--origin-y': `${pos.originY}px`,
                  } as CSSProperties)
                : undefined
            }
            data-placement={pos?.placement}
          >
            {content}
            {pos ? <span className={styles.arrow} style={pos.arrow} aria-hidden /> : null}
          </div>
        </Portal>
      ) : null}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
