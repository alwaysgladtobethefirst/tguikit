import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import { type SubheadlineLevel, subheadline } from './Subheadline.variants';

export interface SubheadlineProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
  level?: SubheadlineLevel;
}

export function Subheadline({
  ref,
  level,
  Component = 'h6',
  className,
  ...rest
}: SubheadlineProps) {
  return (
    <Typography
      ref={ref}
      Component={Component}
      className={cn(subheadline({ level }), className)}
      {...rest}
    />
  );
}

Subheadline.displayName = 'Subheadline';
