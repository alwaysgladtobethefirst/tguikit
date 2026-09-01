import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { type SpinnerSize, spinner } from './Spinner.variants';

export type { SpinnerSize };

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  size?: SpinnerSize;
}

export function Spinner({ ref, size = 'm', className, ...rest }: SpinnerProps) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(spinner({ size }), className)}
      {...rest}
    />
  );
}

Spinner.displayName = 'Spinner';
