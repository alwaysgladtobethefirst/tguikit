'use client';

import type { AllHTMLAttributes, ElementType, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Subheadline } from '../Subheadline';
import { Tappable } from '../Tappable';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Button.module.css';
import { type ButtonMode, type ButtonSize, button } from './Button.variants';

export interface ButtonProps extends Omit<AllHTMLAttributes<HTMLElement>, 'size'> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
  mode?: ButtonMode;
  size?: ButtonSize;
  stretched?: boolean;
  loading?: boolean;
  before?: ReactNode;
  after?: ReactNode;
}

function Label({ size, children }: { size: ButtonSize; children: ReactNode }) {
  const shared = { weight: '2', className: styles.content } as const;
  const inner = <span className={styles.label}>{children}</span>;
  return size === 'l' ? (
    <Text {...shared}>{inner}</Text>
  ) : (
    <Subheadline level="2" {...shared}>
      {inner}
    </Subheadline>
  );
}

export function Button({
  ref,
  Component = 'button',
  mode = 'filled',
  size = 'm',
  stretched = false,
  loading = false,
  type,
  before,
  after,
  children,
  className,
  ...rest
}: ButtonProps) {
  const { platform } = useTgui();

  return (
    <Tappable
      ref={ref}
      Component={Component}
      type={Component === 'button' ? (type ?? 'button') : type}
      aria-busy={loading || undefined}
      className={cn(
        button({ mode, size, stretched, platform }),
        loading && styles.loading,
        className,
      )}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden /> : null}
      {before ? <span className={styles.before}>{before}</span> : null}
      <Label size={size}>{children}</Label>
      {after ? <span className={styles.after}>{after}</span> : null}
    </Tappable>
  );
}

Button.displayName = 'Button';
