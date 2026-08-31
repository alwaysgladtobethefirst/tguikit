import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import { type CaptionLevel, caption } from './Caption.variants';

export interface CaptionProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
  level?: CaptionLevel;
}

export function Caption({ ref, level, Component = 'span', className, ...rest }: CaptionProps) {
  return (
    <Typography
      ref={ref}
      Component={Component}
      className={cn(caption({ level }), className)}
      {...rest}
    />
  );
}

Caption.displayName = 'Caption';
