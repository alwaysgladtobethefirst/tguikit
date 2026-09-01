'use client';

import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { useReducedMotion } from '../../shared/lib/useReducedMotion';
import { Portal } from '../Portal';
import { SnackbarContext, type SnackbarOptions } from './context';
import styles from './Snackbar.module.css';

const EXIT_MS = 240;
const SWIPE_DISMISS = 80;

interface SnackItem extends SnackbarOptions {
  id: string;
}

export interface SnackbarProviderProps {
  children: ReactNode;
  duration?: number;
  max?: number;
}

export function SnackbarProvider({ children, duration = 4000, max = 3 }: SnackbarProviderProps) {
  const [items, setItems] = useState<SnackItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const show = useCallback(
    (options: SnackbarOptions) => {
      const id = `snackbar-${nextId.current++}`;
      setItems((current) => [...current, { ...options, id }].slice(-max));
      return id;
    },
    [max],
  );

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <SnackbarContext.Provider value={api}>
      {children}
      {items.length > 0 ? (
        <Portal>
          <div className={styles.viewport}>
            {items.map((item) => (
              <SnackbarItem
                key={item.id}
                item={item}
                defaultDuration={duration}
                onDismiss={() => dismiss(item.id)}
              />
            ))}
          </div>
        </Portal>
      ) : null}
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.displayName = 'SnackbarProvider';

interface SnackbarItemProps {
  item: SnackItem;
  defaultDuration: number;
  onDismiss: () => void;
}

function SnackbarItem({ item, defaultDuration, onDismiss }: SnackbarItemProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const duration = item.duration ?? defaultDuration;
  const remaining = useRef(duration);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef({ id: -1, startX: 0, active: false });

  useEffect(() => {
    const node = nodeRef.current;
    if (node) void node.offsetHeight;
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setLeaving(true);
    setVisible(false);
    if (reducedMotion) {
      onDismiss();
      return;
    }
    const id = setTimeout(onDismiss, EXIT_MS);
    return () => clearTimeout(id);
  }, [reducedMotion, onDismiss]);

  const pause = useCallback(() => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
    remaining.current -= Date.now() - startedAt.current;
  }, []);

  const resume = useCallback(() => {
    if (duration <= 0 || leaving || timer.current) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(() => close(), Math.max(0, remaining.current));
  }, [duration, leaving, close]);

  useEffect(() => {
    resume();
    return pause;
  }, [resume, pause]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = { id: event.pointerId, startX: event.clientX, active: false };
    pause();
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.id !== event.pointerId) return;
    const dx = event.clientX - state.startX;
    if (!state.active) {
      if (Math.abs(dx) < 6) return;
      state.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      nodeRef.current?.classList.add(styles['snackbar--dragging']);
    }
    if (nodeRef.current) {
      nodeRef.current.style.transform = `translateX(${dx}px)`;
      nodeRef.current.style.opacity = `${Math.max(0, 1 - Math.abs(dx) / 240)}`;
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (state.id !== event.pointerId) return;
    drag.current = { id: -1, startX: 0, active: false };
    const node = nodeRef.current;
    if (!node) return;
    node.classList.remove(styles['snackbar--dragging']);
    const dx = event.clientX - state.startX;
    if (state.active && Math.abs(dx) > SWIPE_DISMISS) {
      close();
      return;
    }
    node.style.transform = '';
    node.style.opacity = '';
    resume();
  };

  return (
    <div
      ref={nodeRef}
      className={cn(styles.snackbar, visible && !leaving && styles['snackbar--visible'])}
      role="status"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {item.before != null ? <span className={styles.before}>{item.before}</span> : null}
      <div className={styles.body}>
        <span className={styles.message}>{item.message}</span>
        {item.description != null ? (
          <span className={styles.description}>{item.description}</span>
        ) : null}
      </div>
      {item.action != null ? (
        <button
          type="button"
          className={styles.action}
          onClick={() => {
            item.action?.onClick();
            close();
          }}
        >
          {item.action.label}
        </button>
      ) : null}
    </div>
  );
}
