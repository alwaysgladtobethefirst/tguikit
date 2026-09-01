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
import styles from './Modal.module.css';
import { useReducedMotion } from './useReducedMotion';

const EXIT_MS = 260;
const DRAG_THRESHOLD = 6;
const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5;

export interface ModalProps {
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

export function Modal({
  ref,
  open,
  onClose,
  header,
  children,
  dismissable = true,
  closeLabel = 'Close',
  className,
  container,
}: ModalProps) {
  const reducedMotion = useReducedMotion();
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const drag = useRef({ id: -1, active: false, startY: 0, lastY: 0, lastT: 0, velocity: 0 });
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    if (reducedMotion) {
      setRendered(false);
      return;
    }
    const id = setTimeout(() => setRendered(false), EXIT_MS);
    return () => clearTimeout(id);
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!rendered) {
      setDragY(0);
      setDragging(false);
    }
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
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
    if (!dismissable || event.button !== 0) return;
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
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const dt = event.timeStamp - state.lastT;
    if (dt > 0) state.velocity = (event.clientY - state.lastY) / dt;
    state.lastY = event.clientY;
    state.lastT = event.timeStamp;
    setDragY(Math.max(0, delta));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.id !== event.pointerId) return;
    drag.current = { ...state, id: -1, active: false };
    if (!state.active) return;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const travelled = event.clientY - state.startY;
    if (travelled > DISMISS_DISTANCE || state.velocity > DISMISS_VELOCITY) {
      onClose();
    } else {
      setDragY(0);
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
          className={cn(
            styles.panel,
            showPanel && styles['panel--visible'],
            dragging && styles['panel--dragging'],
            className,
          )}
          style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
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

Modal.displayName = 'Modal';
