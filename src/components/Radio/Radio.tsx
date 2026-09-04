import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Radio.module.css';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function Radio({ ref, disabled, className, style, ...rest }: RadioProps) {
  return (
    <span
      className={cn(styles.radio, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <input ref={ref} type="radio" className={styles.input} disabled={disabled} {...rest} />
      <span className={styles.dot} aria-hidden />
    </span>
  );
}

Radio.displayName = 'Radio';
