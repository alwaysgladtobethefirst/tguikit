'use client';

import type { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { useTgui } from '../TguiProvider';
import styles from './Switch.module.css';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function Switch({ ref, disabled, className, style, ...rest }: SwitchProps) {
  const { platform } = useTgui();

  return (
    <label
      className={cn(styles.switch, platform === 'ios' ? styles.ios : styles.base, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <input ref={ref} type="checkbox" className={styles.input} disabled={disabled} {...rest} />
      <span aria-hidden className={styles.control} />
    </label>
  );
}

Switch.displayName = 'Switch';
