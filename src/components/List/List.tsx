'use client';

import type { ElementType, HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { useTgui } from '../TguiProvider';
import styles from './List.module.css';

export interface ListProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
}

export function List({ ref, Component = 'div', className, children, ...rest }: ListProps) {
  const { platform } = useTgui();

  return (
    <Component
      ref={ref}
      className={cn(styles.list, platform === 'ios' && styles.ios, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

List.displayName = 'List';
