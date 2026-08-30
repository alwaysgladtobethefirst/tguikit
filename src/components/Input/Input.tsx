'use client';

import {
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Input.module.css';

export type InputStatus = 'default' | 'error' | 'focused';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  // floating label, shown on the base platform only
  header?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  // pin the visual state; otherwise it tracks focus
  status?: InputStatus;
}

export function Input({
  ref,
  type = 'text',
  header,
  before,
  after,
  status,
  disabled,
  className,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';
  const [focused, setFocused] = useState(false);
  const state = status ?? (focused ? 'focused' : 'default');
  const Typography = ios ? Text : Subheadline;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!disabled) setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
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
      {/* biome-ignore lint/a11y/noLabelWithoutControl: the control is <input> below, rendered via Typography */}
      <label className={styles.body}>
        {before != null ? <span className={styles.before}>{before}</span> : null}
        <Typography
          ref={ref as Ref<HTMLElement>}
          Component="input"
          className={styles.field}
          type={type}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {after != null ? <span className={styles.after}>{after}</span> : null}
      </label>
      {header != null && !ios ? <span className={styles.header}>{header}</span> : null}
    </div>
  );
}

Input.displayName = 'Input';
