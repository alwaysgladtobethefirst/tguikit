'use client';

import {
  type ClipboardEvent as ReactClipboardEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './PinInput.module.css';

const PATTERNS = {
  numeric: /[0-9]/,
  alphanumeric: /[a-z0-9]/i,
};

export interface PinInputProps {
  ref?: Ref<HTMLDivElement>;
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric';
  mask?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  'aria-label'?: string;
  className?: string;
}

export function PinInput({
  ref,
  length = 4,
  value: valueProp,
  defaultValue = '',
  onChange,
  onComplete,
  type = 'numeric',
  mask = false,
  disabled = false,
  invalid = false,
  name,
  'aria-label': ariaLabel = 'Verification code',
  className,
}: PinInputProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue.slice(0, length));
  const raw = valueProp ?? uncontrolled;
  const chars = useMemo(() => {
    const next = raw.split('').slice(0, length);
    while (next.length < length) next.push('');
    return next;
  }, [raw, length]);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const pattern = PATTERNS[type];

  const commit = (next: string[]) => {
    const value = next.join('');
    if (valueProp == null) setUncontrolled(value);
    onChange?.(value);
    if (value.length === length && next.every(Boolean)) onComplete?.(value);
  };

  const focusCell = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    inputs.current[clamped]?.focus();
    inputs.current[clamped]?.select();
  };

  const handleChange = (index: number, incoming: string) => {
    const char = incoming
      .split('')
      .reverse()
      .find((c) => pattern.test(c));
    if (!char) return;
    const next = [...chars];
    next[index] = char;
    commit(next);
    focusCell(index + 1);
  };

  const handleKeyDown = (index: number, event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = [...chars];
      if (next[index]) {
        next[index] = '';
        commit(next);
      } else if (index > 0) {
        next[index - 1] = '';
        commit(next);
        focusCell(index - 1);
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusCell(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (index: number, event: ReactClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData('text')
      .split('')
      .filter((c) => pattern.test(c));
    if (pasted.length === 0) return;
    const next = [...chars];
    for (let i = 0; i < pasted.length && index + i < length; i += 1) {
      next[index + i] = pasted[i];
    }
    commit(next);
    focusCell(index + pasted.length);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: a labelled group of separate inputs; <fieldset> would add a border box and legend semantics we don't want
    <div
      ref={ref}
      className={cn(styles.pinInput, className)}
      role="group"
      aria-label={ariaLabel}
      data-invalid={invalid || undefined}
    >
      {chars.map((char, index) => (
        <input
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length positional cells
          key={index}
          ref={(node) => {
            inputs.current[index] = node;
          }}
          className={styles.cell}
          type={mask ? 'password' : 'text'}
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          name={name ? `${name}-${index}` : undefined}
          aria-label={`${ariaLabel}, digit ${index + 1}`}
          maxLength={1}
          value={char}
          disabled={disabled}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}

PinInput.displayName = 'PinInput';
