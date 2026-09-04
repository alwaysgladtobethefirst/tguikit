'use client';

import {
  type ChangeEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { useReducedMotion } from '../../shared/lib/useReducedMotion';
import { IconButton } from '../IconButton';
import styles from './Stepper.module.css';

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: Ref<HTMLDivElement>;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
    <path d="M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
    <path d="M7 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export function Stepper({
  ref,
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled = false,
  className,
  ...rest
}: StepperProps) {
  const reducedMotion = useReducedMotion();
  const [text, setText] = useState(String(value));
  const [pulse, setPulse] = useState<'up' | 'down' | null>(null);
  const previousValue = useRef(value);

  useEffect(() => {
    setText(String(value));
    if (value !== previousValue.current) {
      if (!reducedMotion) setPulse(value > previousValue.current ? 'up' : 'down');
      previousValue.current = value;
    }
  }, [value, reducedMotion]);

  const commit = () => {
    const parsed = Number.parseFloat(text);
    const next = clamp(Number.isNaN(parsed) ? value : parsed, min, max);
    onChange(next);
    setText(String(next));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    commit();
    event.currentTarget.blur();
  };

  return (
    <div ref={ref} className={cn(styles.stepper, className)} {...rest}>
      <IconButton
        mode="gray"
        size="s"
        circle
        aria-label="Decrease"
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - step, min, max))}
      >
        <MinusIcon />
      </IconButton>
      <input
        className={styles.value}
        type="number"
        inputMode="numeric"
        aria-label="Value"
        value={text}
        disabled={disabled}
        data-pulse={pulse ?? undefined}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        onAnimationEnd={() => setPulse(null)}
      />
      <IconButton
        mode="gray"
        size="s"
        circle
        aria-label="Increase"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + step, min, max))}
      >
        <PlusIcon />
      </IconButton>
    </div>
  );
}

Stepper.displayName = 'Stepper';
