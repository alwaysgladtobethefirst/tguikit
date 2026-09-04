'use client';

import {
  type ChangeEvent,
  type HTMLAttributes,
  type MouseEvent,
  type Ref,
  useRef,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: Ref<HTMLDivElement>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onCancel?: () => void;
  label?: string;
}

const preventFocusLoss = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

export function SearchBar({
  ref,
  value,
  onChange,
  placeholder = 'Search',
  onCancel,
  label = 'Search',
  className,
  ...rest
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    onCancel?.();
    inputRef.current?.blur();
  };

  return (
    <div ref={ref} className={cn(styles.bar, className)} {...rest}>
      <div className={styles.field}>
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11.5 11.5L14.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          aria-label={label}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {value.length > 0 ? (
          <button
            type="button"
            className={styles.clear}
            aria-label="Clear"
            onMouseDown={preventFocusLoss}
            onClick={handleClear}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <circle cx="7" cy="7" r="7" fill="currentColor" opacity="0.15" />
              <path
                d="M4.5 4.5l5 5M9.5 4.5l-5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
      {onCancel != null ? (
        <button
          type="button"
          className={cn(styles.cancel, focused && styles['cancel--visible'])}
          tabIndex={focused ? 0 : -1}
          onMouseDown={preventFocusLoss}
          onClick={handleCancel}
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}

SearchBar.displayName = 'SearchBar';
