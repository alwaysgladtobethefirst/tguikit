import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Progress.module.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  value?: number;
}

export function Progress({ ref, value = 0, className, ...rest }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(styles.track, className)}
      {...rest}
    >
      <div className={styles.bar} style={{ width: `${clamped}%` }} />
    </div>
  );
}

Progress.displayName = 'Progress';
