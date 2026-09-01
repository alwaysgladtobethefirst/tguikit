'use client';

import {
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { FormField } from '../FormField';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Input.module.css';

export type InputStatus = 'default' | 'error' | 'focused';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  header?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
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
    <FormField
      ios={ios}
      status={state}
      disabled={disabled}
      header={header}
      before={before}
      after={after}
      className={className}
    >
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
    </FormField>
  );
}

Input.displayName = 'Input';
