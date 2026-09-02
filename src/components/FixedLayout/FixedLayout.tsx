import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './FixedLayout.module.css';

export interface FixedLayoutProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  vertical?: 'top' | 'bottom';
}

export function FixedLayout({ ref, vertical = 'bottom', className, ...rest }: FixedLayoutProps) {
  return (
    <div ref={ref} className={cn(styles.fixedLayout, styles[vertical], className)} {...rest} />
  );
}

FixedLayout.displayName = 'FixedLayout';
