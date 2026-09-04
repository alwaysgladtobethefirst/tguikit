'use client';

import { type ButtonHTMLAttributes, type ReactNode, type Ref, useContext } from 'react';
import { cn } from '../../shared/lib/cn';
import { Caption } from '../Caption';
import { Tappable } from '../Tappable';
import { InlineButtonsContext } from './context';
import styles from './InlineButtons.module.css';
import { inlineButtonsItem } from './InlineButtons.variants';

export interface InlineButtonsItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  ref?: Ref<HTMLButtonElement>;
  icon: ReactNode;
  children: ReactNode;
}

export function InlineButtonsItem({
  ref,
  icon,
  children,
  className,
  ...rest
}: InlineButtonsItemProps) {
  const { mode } = useContext(InlineButtonsContext);

  return (
    <Tappable
      ref={ref}
      Component="button"
      type="button"
      interactiveAnimation="opacity"
      className={cn(inlineButtonsItem({ mode }), className)}
      {...rest}
    >
      <span className={styles.icon}>{icon}</span>
      <Caption className={styles.label} level="2" weight="2">
        {children}
      </Caption>
    </Tappable>
  );
}

InlineButtonsItem.displayName = 'InlineButtonsItem';
