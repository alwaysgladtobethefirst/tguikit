import type { AllHTMLAttributes, ElementType, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { typography } from './Typography.variants';

export interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  weight?: '1' | '2' | '3';
  caps?: boolean;
  Component?: ElementType;
}

export function Typography({
  ref,
  weight,
  caps,
  Component = 'span',
  className,
  ...rest
}: TypographyProps) {
  return <Component ref={ref} className={cn(typography({ weight, caps }), className)} {...rest} />;
}

Typography.displayName = 'Typography';
