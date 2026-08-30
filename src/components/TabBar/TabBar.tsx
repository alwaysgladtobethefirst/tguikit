'use client';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { useTgui } from '../TguiProvider';
import styles from './TabBar.module.css';
import { TabBarItem } from './TabBarItem';

export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export function TabBar({ ref, className, children, ...rest }: TabBarProps) {
  const { platform } = useTgui();

  return (
    <nav
      ref={ref}
      className={cn(styles.bar, platform === 'ios' && styles.barIos, className)}
      {...rest}
    >
      {children}
    </nav>
  );
}

TabBar.displayName = 'TabBar';
TabBar.Item = TabBarItem;
