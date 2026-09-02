'use client';

import {
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
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
    </span>
  );
}

Spoiler.displayName = 'Spoiler';
