'use client';

import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Slider.module.css';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  ref?: Ref<HTMLInputElement>;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  before?: ReactNode;
  after?: ReactNode;
}

export function Slider({
  ref,
  value: valueProp,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  before,
  after,
  disabled,
  className,
  ...rest
}: SliderProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? min);
  const value = valueProp ?? uncontrolled;
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (valueProp == null) setUncontrolled(next);
    onChange?.(next);
  };

  return (
    <div className={cn(styles.slider, className)} data-disabled={disabled || undefined}>
      {before != null ? <span className={styles.side}>{before}</span> : null}
      <span className={styles.track}>
        <span className={styles.rail} />
        <span
          className={styles.fill}
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
        <input
          ref={ref}
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          {...rest}
        />
      </span>
      {after != null ? <span className={styles.side}>{after}</span> : null}
    </div>
  );
}

Slider.displayName = 'Slider';
