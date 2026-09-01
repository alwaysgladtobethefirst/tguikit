'use client';

import {
  type ChangeEvent,
  type FocusEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormField } from '../FormField';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Textarea.module.css';

export type TextareaStatus = 'default' | 'error' | 'focused';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
  header?: ReactNode;
  status?: TextareaStatus;
  autoGrow?: boolean;
  maxRows?: number;
}

export function Textarea({
  ref,
  header,
  status,
  autoGrow = false,
  maxRows,
  rows = 3,
  disabled,
  className,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextareaProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';
  const [focused, setFocused] = useState(false);
  const state = status ?? (focused ? 'focused' : 'default');
  const Typography = ios ? Text : Subheadline;

  const innerRef = useRef<HTMLTextAreaElement>(null);
  const setRefs = useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLTextAreaElement | null>).current = node;
    },
    [ref],
  );

  const resize = useCallback(() => {
    const el = innerRef.current;
    if (!el || !autoGrow) return;
    el.style.height = 'auto';
    const cs = getComputedStyle(el);
    const lineHeight = Number.parseFloat(cs.lineHeight) || 20;
    const max = maxRows ? lineHeight * maxRows : Number.POSITIVE_INFINITY;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  }, [autoGrow, maxRows]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: value drives the re-measure
  useEffect(resize, [resize, value, defaultValue]);

  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (!disabled) setFocused(true);
    onFocus?.(event);
  };
  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(event);
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resize();
    onChange?.(event);
  };

  return (
    <FormField
      ios={ios}
      status={state}
      disabled={disabled}
      alignStart
      header={header}
      className={className}
    >
      <Typography
        ref={setRefs as Ref<HTMLElement>}
        Component="textarea"
        className={styles.field}
        rows={rows}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
    </FormField>
  );
}

Textarea.displayName = 'Textarea';
