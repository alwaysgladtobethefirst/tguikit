import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Steps.module.css';

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  count: number;
  progress: number;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function Steps({ ref, count, progress, className, ...rest }: StepsProps) {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={Math.max(0, Math.min(count, progress))}
      className={cn(styles.steps, className)}
      {...rest}
    >
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length positional segments
        <div key={index} className={styles.segment}>
          <div className={styles.fill} style={{ width: `${clamp01(progress - index) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}

Steps.displayName = 'Steps';
