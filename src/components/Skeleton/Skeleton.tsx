import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  visible?: boolean;
  children?: ReactNode;
}

export function Skeleton({ ref, visible = true, className, children, ...rest }: SkeletonProps) {
  return (
    <div
      ref={ref}
      aria-hidden={visible || undefined}
      className={cn(styles.skeleton, visible && styles.visible, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Skeleton.displayName = 'Skeleton';
