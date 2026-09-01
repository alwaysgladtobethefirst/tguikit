'use client';

import {
  type HTMLAttributes,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function SegmentedControl({
  ref,
  className,
  children,
  onKeyDown,
  ...rest
}: SegmentedControlProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const selected = track.querySelector<HTMLElement>('[role="radio"][data-selected]');
    const next = selected ? { left: selected.offsetLeft, width: selected.offsetWidth } : null;
    setPill((prev) => {
      if (prev === next) return prev;
      if (prev && next && prev.left === next.left && prev.width === next.width) return prev;
      return next;
    });
  }, []);

  useLayoutEffect(measure);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      trackRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const track = trackRef.current;
    if (!track) return;
    const radios = Array.from(
      track.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)'),
    );
    const current = radios.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const next = radios[(current + delta + radios.length) % radios.length];
    next.focus();
    next.click();
  };

  return (
    <div
      ref={setRef}
      role="radiogroup"
      className={cn(styles.control, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        className={styles.pill}
        style={
          pill ? { transform: `translateX(${pill.left}px)`, width: pill.width } : { opacity: 0 }
        }
        aria-hidden
      />
      {children}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
