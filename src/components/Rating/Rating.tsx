'use client';

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Rating.module.css';

const DefaultStar = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9.1l6.9-.8z" />
  </svg>
);

export interface RatingProps {
  ref?: Ref<HTMLDivElement>;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  name?: string;
  'aria-label'?: string;
  className?: string;
}

export function Rating({
  ref,
  value: valueProp,
  defaultValue = 0,
  onChange,
  count = 5,
  readOnly = false,
  disabled = false,
  icon = DefaultStar,
  name,
  'aria-label': ariaLabel = 'Rating',
  className,
}: RatingProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const [hovered, setHovered] = useState<number | null>(null);

  const interactive = !readOnly && !disabled;
  const shown = hovered ?? value;
  const pct = Math.max(0, Math.min(1, shown / count)) * 100;

  const set = (next: number) => {
    if (!interactive) return;
    if (valueProp == null) setUncontrolled(next);
    onChange?.(next);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      set(Math.min(count, Math.round(value) + 1));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      set(Math.max(0, Math.round(value) - 1));
    }
  };

  const stars = Array.from({ length: count }, (_, i) => i + 1);

  const interactiveHandlers = interactive
    ? { onKeyDown, onMouseLeave: () => setHovered(null) }
    : {};

  const role = interactive ? 'radiogroup' : 'img';
  const label = interactive ? ariaLabel : `${ariaLabel}: ${value} out of ${count}`;

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: role is radiogroup or img, both support aria-label
    <div
      ref={ref}
      className={cn(styles.rating, interactive && styles.interactive, className)}
      data-disabled={disabled || undefined}
      role={role}
      aria-label={label}
      {...interactiveHandlers}
    >
      <div className={styles.row} aria-hidden={!interactive}>
        {stars.map((star) =>
          interactive ? (
            // biome-ignore lint/a11y/useSemanticElements: a button in a radiogroup is the rating ARIA pattern; a native radio can't hold the icon
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={Math.round(value) === star}
              aria-label={`${star}`}
              tabIndex={star === (Math.round(value) || 1) ? 0 : -1}
              name={name}
              className={styles.star}
              onClick={() => set(star)}
              onMouseEnter={() => setHovered(star)}
              onFocus={() => setHovered(star)}
              onBlur={() => setHovered(null)}
            >
              {icon}
            </button>
          ) : (
            <span key={star} className={styles.star}>
              {icon}
            </span>
          ),
        )}
      </div>
      <div className={styles.fill} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} aria-hidden>
        <div className={styles.row}>
          {stars.map((star) => (
            <span key={star} className={styles.star}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

Rating.displayName = 'Rating';
