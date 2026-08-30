import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import styles from './LargeTitle.module.css';

export interface LargeTitleProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
}

// bold by default, like the iOS Large Title it mirrors
export function LargeTitle({
  ref,
  weight = '1',
  className,
  Component = 'h1',
  ...rest
}: LargeTitleProps) {
  return (
    <Typography
      ref={ref}
      weight={weight}
      Component={Component}
      className={cn(styles['large-title'], className)}
      {...rest}
    />
  );
}

LargeTitle.displayName = 'LargeTitle';
