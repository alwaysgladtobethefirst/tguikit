import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Timeline.module.css';

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  ref?: Ref<HTMLOListElement>;
}

export function Timeline({ ref, className, children, ...rest }: TimelineProps) {
  return (
    <ol ref={ref} className={cn(styles.timeline, className)} {...rest}>
      {children}
    </ol>
  );
}

Timeline.displayName = 'Timeline';
