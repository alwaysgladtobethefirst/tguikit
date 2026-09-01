import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './CircularProgress.module.css';
import { type CircularProgressSize, DIMENSION, STROKE } from './CircularProgress.variants';

export type { CircularProgressSize };

export interface CircularProgressProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'size'> {
  ref?: Ref<HTMLSpanElement>;
  value?: number;
  size?: CircularProgressSize;
}

export function CircularProgress({
  ref,
  value = 0,
  size = 'm',
  className,
  ...rest
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const dimension = DIMENSION[size];
  const stroke = STROKE[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = dimension / 2;

  return (
    <span
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(styles.root, className)}
      {...rest}
    >
      <svg
        className={styles.svg}
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        aria-hidden
      >
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className={styles.indicator}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          fill="none"
        />
      </svg>
    </span>
  );
}

CircularProgress.displayName = 'CircularProgress';
