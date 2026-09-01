import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { type BadgeMode, type BadgeType, badge } from './Badge.variants';

export type { BadgeMode, BadgeType };

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  type?: BadgeType;
  mode?: BadgeMode;
  large?: boolean;
  children?: ReactNode;
}

export function Badge({
  ref,
  type = 'number',
  mode = 'primary',
  large = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span ref={ref} className={cn(badge({ type, mode, large }), className)} {...rest}>
      {type === 'number' ? children : null}
    </span>
  );
}

Badge.displayName = 'Badge';
