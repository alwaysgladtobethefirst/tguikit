import { type InputHTMLAttributes, type Ref, useEffect, useRef } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  // the dash state — a partial selection
  indeterminate?: boolean;
}

export function Checkbox({
  ref,
  indeterminate = false,
  disabled,
  className,
  style,
  ...rest
}: CheckboxProps) {
  const inner = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const mergeRef = (node: HTMLInputElement | null) => {
    inner.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    // a span, not a label: the input overlays the box for standalone taps, and in a
    // row the surrounding Cell can be the label without nesting one label in another
    <span
      className={cn(styles.checkbox, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <input
        ref={mergeRef}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.box} aria-hidden />
    </span>
  );
}

Checkbox.displayName = 'Checkbox';
