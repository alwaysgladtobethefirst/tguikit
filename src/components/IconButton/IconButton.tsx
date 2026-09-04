'use client';

import type { AllHTMLAttributes, ElementType, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Tappable } from '../Tappable';
import { useTgui } from '../TguiProvider';
import styles from './IconButton.module.css';
import { type IconButtonMode, type IconButtonSize, iconButton } from './IconButton.variants';

export type { IconButtonMode, IconButtonSize };

export interface IconButtonProps extends Omit<AllHTMLAttributes<HTMLElement>, 'size'> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
  mode?: IconButtonMode;
  size?: IconButtonSize;
  circle?: boolean;
}

export function IconButton({
  ref,
  Component = 'button',
  mode = 'plain',
  size = 'm',
  circle = false,
  type,
  className,
  children,
  ...rest
}: IconButtonProps) {
  const { platform } = useTgui();

  return (
    <Tappable
      ref={ref}
      Component={Component}
      type={Component === 'button' ? (type ?? 'button') : type}
      className={cn(iconButton({ mode, size, circle, platform }), className)}
      {...rest}
    >
      <span className={styles.icon}>{children}</span>
    </Tappable>
  );
}

IconButton.displayName = 'IconButton';
