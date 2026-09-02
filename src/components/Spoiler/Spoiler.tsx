'use client';

import {
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { useReducedMotion } from '../../shared/lib/useReducedMotion';
import styles from './Spoiler.module.css';

const REVEAL_MS = 460;

export interface SpoilerProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealOn?: 'click' | 'hover';
  accentColor?: string;
  fps?: number;
  density?: number;
  revealLabel?: string;
}

function parseColor(value: string): [number, number, number] {
  const parts = value.match(/-?\d*\.?\d+/g);
  if (!parts || parts.length < 3) return [128, 128, 128];
  return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
}

function setRefs(ref: Ref<HTMLSpanElement> | undefined, node: HTMLSpanElement | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as { current: HTMLSpanElement | null }).current = node;
}

export function Spoiler({
  ref,
  revealed: revealedProp,
  defaultRevealed = false,
  onRevealedChange,
  revealOn = 'click',
  accentColor,
  fps = 24,
  density = 0.14,
  revealLabel = 'Reveal hidden text',
  className,
  children,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: SpoilerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultRevealed);
  const revealed = revealedProp ?? uncontrolled;
  const reducedMotion = useReducedMotion();

  const rootRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const origin = useRef({ x: 0.5, y: 0.5 });
  const progress = useRef(revealed ? 1 : 0);
  const inView = useRef(true);

  const setProgressVars = useCallback((value: number) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const ox = origin.current.x * rect.width;
    const oy = origin.current.y * rect.height;
    const maxR = Math.hypot(Math.max(ox, rect.width - ox), Math.max(oy, rect.height - oy));
    root.style.setProperty('--tgui--spoiler--p', String(value));
    root.style.setProperty('--tgui--spoiler--r', `${value * (maxR + 4)}px`);
    root.style.setProperty('--tgui--spoiler--ox', `${ox}px`);
    root.style.setProperty('--tgui--spoiler--oy', `${oy}px`);
  }, []);

  const setRevealed = useCallback(
    (next: boolean, event?: ReactMouseEvent) => {
      if (event && rootRef.current) {
        const rect = rootRef.current.getBoundingClientRect();
        origin.current = {
          x: rect.width ? (event.clientX - rect.left) / rect.width : 0.5,
          y: rect.height ? (event.clientY - rect.top) / rect.height : 0.5,
        };
      } else {
        origin.current = { x: 0.5, y: 0.5 };
      }
      if (revealedProp == null) setUncontrolled(next);
      onRevealedChange?.(next);
    },
    [revealedProp, onRevealedChange],
  );

  // reveal / conceal transition
  useEffect(() => {
    const target = revealed ? 1 : 0;
    if (reducedMotion) {
      progress.current = target;
      setProgressVars(target);
      return;
    }
    const from = progress.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / REVEAL_MS);
      const eased = 1 - (1 - t) ** 3;
      const value = from + (target - from) * eased;
      progress.current = value;
      setProgressVars(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, reducedMotion, setProgressVars]);

  // canvas sizing + accent colour
  const [color, setColor] = useState<[number, number, number]>([128, 128, 128]);
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = root.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round((rect.width + 4) * dpr));
      canvas.height = Math.max(1, Math.round((rect.height + 4) * dpr));
      setColor(parseColor(accentColor ?? getComputedStyle(root).color));
      setProgressVars(progress.current);
    };

    resize();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(root);
    window.addEventListener('resize', resize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [accentColor, setProgressVars]);

  // pause the noise when off-screen
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // noise animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (reducedMotion) {
      paintNoise(ctx, canvas.width, canvas.height, color, density);
      return;
    }

    let raf = 0;
    let last = 0;
    const frame = 1000 / Math.max(1, fps);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (revealed || !inView.current || now - last < frame) return;
      last = now;
      paintNoise(ctx, canvas.width, canvas.height, color, density);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [revealed, reducedMotion, color, density, fps]);

  const toggle = (event?: ReactMouseEvent) => setRevealed(!revealed, event);

  const isButton = revealOn === 'click';

  return (
    // biome-ignore lint/a11y/useSemanticElements: a spoiler sits inline inside a sentence; a <button> would break the text flow and reset typography
    <span
      ref={(node) => {
        rootRef.current = node;
        setRefs(ref, node);
      }}
      className={cn(styles.spoiler, revealed && styles.revealed, className)}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label={revealed ? undefined : revealLabel}
      onClick={(event) => {
        onClick?.(event);
        if (isButton) toggle(event);
      }}
      onKeyDown={(event: ReactKeyboardEvent<HTMLSpanElement>) => {
        onKeyDown?.(event);
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (!isButton && !revealed) setRevealed(true, event);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (!isButton && revealed) setRevealed(false);
      }}
      {...rest}
    >
      <span className={styles.content} aria-hidden={!revealed}>
        {children}
      </span>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
    </span>
  );
}

Spoiler.displayName = 'Spoiler';

function paintNoise(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  [r, g, b]: [number, number, number],
  density: number,
) {
  const image = ctx.createImageData(w, h);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() < density) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 150 + ((Math.random() * 105) | 0);
    }
  }
  ctx.putImageData(image, 0, 0);
}
