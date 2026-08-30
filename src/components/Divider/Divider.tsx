import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  ref?: Ref<HTMLHRElement>;
}

export function Divider({ ref, className, ...rest }: DividerProps) {
  return <hr ref={ref} className={cn(styles.divider, className)} {...rest} />;
}

Divider.displayName = 'Divider';
