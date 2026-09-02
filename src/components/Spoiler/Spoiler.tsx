'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { useReducedMotion } from '../../shared/lib/useReducedMotion';
import { createParticles, type Particle, paintParticles } from './particles';
import styles from './Spoiler.module.css';

const FADE_S = 0.5;

export interface SpoilerProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealOn?: 'click' | 'hover';
  accentColor?: string;
  density?: number;
  fps?: number;
  revealLabel?: string;
}

function parseColor(value: string): [number, number, number] {
  const parts = value.match(/-?\d*\.?\d+/g);
  if (!parts || parts.length < 3) return [128, 128, 128];
  return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
}

export function Spoiler({
  ref,
  revealed: revealedProp,
  defaultRevealed = false,
  onRevealedChange,
  revealOn = 'click',
  accentColor,
  density = 0.1,
  fps = 40,
  revealLabel = 'Reveal hidden text',
  className,
  style,
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
  const isButton = revealOn === 'click';

  const rootRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const colorRef = useRef<[number, number, number]>([128, 128, 128]);
  const inView = useRef(true);
  const stopAt = useRef<number | null>(revealed ? 0 : null);
  const loopTime = useRef(0);

  const [painting, setPainting] = useState(!revealed);

  const setRevealed = (next: boolean) => {
    if (next) {
      stopAt.current = loopTime.current;
    } else {
      stopAt.current = null;
      setPainting(true);
    }
    if (revealedProp == null) setUncontrolled(next);
    onRevealedChange?.(next);
  };

  useEffect(() => {
    if (!painting) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const sync = () => {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, Math.round((rect.width + 4) * dpr));
      const h = Math.max(1, Math.round((rect.height + 4) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        particles.current = createParticles(w / dpr, h / dpr, density);
      }
      colorRef.current = parseColor(accentColor ?? getComputedStyle(root).color);
    };
    sync();

    if (reducedMotion) {
      paintParticles(
        ctx,
        canvas.width,
        canvas.height,
        dpr,
        particles.current,
        colorRef.current,
        0.6,
        null,
        0,
      );
      return;
    }

    let raf = 0;
    let start = 0;
    let last = -1;
    const frameGap = 1000 / Math.max(8, fps);

    const loop = (now: number) => {
      if (!start) start = now;
      const time = (now - start) / 1000;
      loopTime.current = time;
      const stop = stopAt.current;

      if (stop != null && time > stop + FADE_S + 0.06) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPainting(false);
        return;
      }

      raf = requestAnimationFrame(loop);
      if (!inView.current || now - last < frameGap) return;
      last = now;

      paintParticles(
        ctx,
        canvas.width,
        canvas.height,
        dpr,
        particles.current,
        colorRef.current,
        time,
        stop,
        FADE_S,
      );
    };

    raf = requestAnimationFrame(loop);

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null;
    ro?.observe(root);
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            inView.current = entry.isIntersecting;
          })
        : null;
    io?.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
    };
  }, [painting, reducedMotion, density, fps, accentColor]);

  const toggle = () => setRevealed(!revealed);

  return (
    // biome-ignore lint/a11y/useSemanticElements: a spoiler sits inline inside a sentence; a <button> would break the text flow and reset typography
    <span
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as { current: HTMLSpanElement | null }).current = node;
      }}
      className={cn(styles.spoiler, revealed && styles.revealed, className)}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label={revealed ? undefined : revealLabel}
      style={{ ...style, '--tgui--spoiler--p': revealed ? 1 : 0 } as CSSProperties}
      onClick={(event) => {
        onClick?.(event);
        if (isButton) toggle();
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
        if (!isButton && !revealed) setRevealed(true);
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
      {painting ? <canvas ref={canvasRef} className={styles.canvas} aria-hidden /> : null}
    </span>
  );
}

Spoiler.displayName = 'Spoiler';
