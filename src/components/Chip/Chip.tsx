import type { AllHTMLAttributes, ElementType, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Chip.module.css';
import { type ChipMode, chip } from './Chip.variants';

export type { ChipMode };

export interface ChipProps extends Omit<AllHTMLAttributes<HTMLElement>, 'onClick'> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
  mode?: ChipMode;
  before?: ReactNode;
  after?: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
}

export function Chip({
  ref,
  Component = 'div',
  mode = 'elevated',
  before,
  after,
  onClick,
  onRemove,
  removeLabel = 'Remove',
  className,
  children,
  ...rest
}: ChipProps) {
  const clickable = onClick != null;

  return (
    <Component
      ref={ref}
      className={cn(chip({ mode, clickable }), className)}
      onClick={onClick}
      {...rest}
    >
      {before != null ? <span className={styles.before}>{before}</span> : null}
      <span className={styles.label}>{children}</span>
      {onRemove != null ? (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : after != null ? (
        <span className={styles.after}>{after}</span>
      ) : null}
    </Component>
  );
}

Chip.displayName = 'Chip';
