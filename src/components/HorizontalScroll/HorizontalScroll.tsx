'use client';

import {
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './HorizontalScroll.module.css';

const DRAG_THRESHOLD = 4;

export interface HorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  snap?: boolean;
  fade?: boolean;
}

export function HorizontalScroll({
  ref,
  snap = false,
  fade = true,
  className,
  children,
  ...rest
}: HorizontalScrollProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState({ start: false, end: false });
  const drag = useRef({ down: false, moved: false, startX: 0, startScroll: 0 });

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const start = el.scrollLeft > 1;
    const end = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      observer?.disconnect();
    };
  }, [measure]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      moved: false,
      startX: event.clientX,
      startScroll: el.scrollLeft,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = scrollerRef.current;
    if (!state.down || !el) return;
    const dx = event.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      state.moved = true;
      el.setPointerCapture(event.pointerId);
      el.style.cursor = 'grabbing';
      el.style.scrollBehavior = 'auto';
    }
    el.scrollLeft = state.startScroll - dx;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (el && drag.current.moved) {
      el.releasePointerCapture?.(event.pointerId);
      el.style.cursor = '';
      el.style.scrollBehavior = '';
    }
    drag.current.down = false;
  };

  return (
    <div
      ref={ref}
      className={cn(styles.root, fade && styles.fade, className)}
      data-start={fade ? String(edges.start) : undefined}
      data-end={fade ? String(edges.end) : undefined}
      {...rest}
    >
      <div
        ref={scrollerRef}
        className={cn(styles.scroller, snap && styles.snap)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

HorizontalScroll.displayName = 'HorizontalScroll';
