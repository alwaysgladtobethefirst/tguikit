'use client';

import {
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  useId,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { useReducedMotion } from '../../shared/lib/useReducedMotion';
import styles from './Spoiler.module.css';

export interface SpoilerProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealLabel?: string;
}

export function Spoiler({
  ref,
  revealed: revealedProp,
  defaultRevealed = false,
  onRevealedChange,
  revealLabel = 'Reveal hidden text',
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: SpoilerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultRevealed);
  const revealed = revealedProp ?? uncontrolled;
  const reducedMotion = useReducedMotion();
  const filterId = useId();

  const toggle = () => {
    const next = !revealed;
    if (revealedProp == null) setUncontrolled(next);
    onRevealedChange?.(next);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    onKeyDown?.(event);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  const animate = !revealed && !reducedMotion;

  return (
    // biome-ignore lint/a11y/useSemanticElements: a spoiler sits inline inside a sentence; a <button> would break the text flow and reset typography
    <span
      ref={ref}
      className={cn(styles.spoiler, revealed && styles.revealed, className)}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label={revealed ? undefined : revealLabel}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className={styles.content} aria-hidden={!revealed}>
        {children}
      </span>
      <svg className={styles.filter} aria-hidden focusable="false">
        <title>Spoiler grain</title>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.62"
            numOctaves="2"
            stitchTiles="stitch"
            seed="4"
            result="noise"
          >
            {animate ? (
              <animate
                attributeName="seed"
                values="4;11;6;15;9;13;5"
                dur="0.5s"
                repeatCount="indefinite"
                calcMode="discrete"
              />
            ) : null}
          </feTurbulence>
          <feColorMatrix in="noise" type="luminanceToAlpha" result="mono" />
          <feComponentTransfer in="mono" result="mask">
            <feFuncA type="linear" slope="1.7" intercept="-0.22" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </svg>
      <span className={styles.grain} style={{ filter: `url(#${filterId})` }} aria-hidden />
    </span>
  );
}

Spoiler.displayName = 'Spoiler';
