'use client';

import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Caption } from '../Caption';
import { Tappable } from '../Tappable';
import { useTgui } from '../TguiProvider';
import styles from './TabBar.module.css';

export interface TabBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLElement>;
  selected?: boolean;
  text?: string;
  // the icon, sized 28×28
  children?: ReactNode;
}

export function TabBarItem({ ref, selected, text, children, className, ...rest }: TabBarItemProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';

  return (
    <Tappable
      ref={ref}
      Component="button"
      interactiveAnimation="opacity"
      aria-current={selected ? 'page' : undefined}
      className={cn(styles.item, ios && styles.itemIos, selected && styles.itemSelected, className)}
      {...rest}
    >
      {children != null ? <span className={styles.icon}>{children}</span> : null}
      {text != null ? (
        <Caption className={styles.text} weight="2" level={ios ? '2' : '1'}>
          {text}
        </Caption>
      ) : null}
    </Tappable>
  );
}

TabBarItem.displayName = 'TabBarItem';
