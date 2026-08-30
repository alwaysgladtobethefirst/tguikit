'use client';

import {
  type FocusEvent,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import type { InputStatus } from '../Input';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Select.module.css';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
  header?: ReactNode;
  status?: InputStatus;
}

export function Select({
  ref,
  header,
  status,
  disabled,
  className,
  onFocus,
  onBlur,
  children,
  ...rest
}: SelectProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';
  const [focused, setFocused] = useState(false);
  const state = status ?? (focused ? 'focused' : 'default');
  const Typography = ios ? Text : Subheadline;

  const handleFocus = (event: FocusEvent<HTMLSelectElement>) => {
    if (!disabled) setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: FocusEvent<HTMLSelectElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <div
      className={cn(
        ios ? styles.ios : styles.base,
        state === 'error' && styles.error,
        state === 'focused' && styles.focused,
        disabled && styles.disabled,
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      <div className={styles.row}>
        <Typography
          ref={ref as Ref<HTMLElement>}
          Component="select"
          className={styles.select}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        >
          {children}
        </Typography>
        <span aria-hidden className={styles.chevron} />
      </div>
      {header != null && !ios ? <span className={styles.header}>{header}</span> : null}
    </div>
  );
}

Select.displayName = 'Select';
