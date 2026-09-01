'use client';

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { Portal } from '../Portal';
import styles from './Sheet.module.css';
import { useReducedMotion } from './useReducedMotion';

const DURATION_MS = 340;
const DRAG_THRESHOLD = 6;
const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5;

export interface SheetProps {
  ref?: Ref<HTMLDivElement>;
  open: boolean;
  onClose: () => void;
  header?: ReactNode;
  children?: ReactNode;
  dismissable?: boolean;
  closeLabel?: string;
  className?: string;
  container?: Element | DocumentFragment | null;
}

function focusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

export function Sheet({
  ref,
  open,
  onClose,
  header,
  children,
  dismissable = true,
  closeLabel = 'Close',
  className,
  container,
}: SheetProps) {
  const reducedMotion = useReducedMotion();
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const drag = useRef({ id: -1, active: false, startY: 0, lastY: 0, lastT: 0, velocity: 0 });

  useEffect(() => {
    if (open) {
      setRendered(true);
      return;
    }
    setVisible(false);
    if (reducedMotion) {
      setRendered(false);
      return;
    }
    const id = setTimeout(() => setRendered(false), DURATION_MS);
    return () => clearTimeout(id);
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!rendered || !open) return;
    const panel = panelRef.current;
    if (!panel) return;
    // reflow so the browser registers the off-screen start before the class flips
    void panel.offsetHeight;
    setVisible(true);
  }, [rendered, open]);

  useEffect(() => {
    if (!rendered) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const id = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(id);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissable) {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [rendered, dismissable, onClose]);

  const trapTab = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const items = focusable(panelRef.current);
    if (items.length === 0) {
      event.preventDefault();
      panelRef.current.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dismissable || event.button !== 0 || reducedMotion) return;
    if ((event.target as HTMLElement).closest('button')) return;
    drag.current = {
      id: event.pointerId,
      active: false,
      startY: event.clientY,
      lastY: event.clientY,
      lastT: event.timeStamp,
      velocity: 0,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.id !== event.pointerId) return;
    const delta = event.clientY - state.startY;
    if (!state.active) {
      if (delta < DRAG_THRESHOLD) return;
      state.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      if (panelRef.current) panelRef.current.style.transition = 'none';
    }
    const dt = event.timeStamp - state.lastT;
    if (dt >= 1) {
      const instant = (event.clientY - state.lastY) / dt;
      state.velocity = state.velocity * 0.6 + instant * 0.4;
      state.lastY = event.clientY;
      state.lastT = event.timeStamp;
    }
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.id !== event.pointerId) return;
    drag.current = { ...state, id: -1, active: false };
    if (!state.active) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    const panel = panelRef.current;
    const travelled = event.clientY - state.startY;
    const dismiss = travelled > DISMISS_DISTANCE || state.velocity > DISMISS_VELOCITY;

    if (panel) {
      panel.style.transition = '';
      panel.getBoundingClientRect();
      panel.style.transform = '';
    }
    if (dismiss) {
      setVisible(false);
      onClose();
    }
  };

  if (!rendered) return null;

  const showPanel = visible && open;

  return (
    <Portal container={container}>
      <div
        ref={ref}
        className={cn(styles.backdrop, showPanel && styles['backdrop--visible'])}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget && dismissable) onClose();
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(styles.panel, showPanel && styles['panel--visible'], className)}
          onKeyDown={trapTab}
        >
          <div
            className={styles.grip}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {dismissable ? <span className={styles.handle} aria-hidden /> : null}
            {header != null ? (
              <div className={styles.header}>
                <div className={styles.title}>{header}</div>
                {dismissable ? (
                  <button
                    type="button"
                    className={styles.close}
                    aria-label={closeLabel}
                    onClick={onClose}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                      <path
                        d="M4 4l8 8M12 4l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}

Sheet.displayName = 'Sheet';
