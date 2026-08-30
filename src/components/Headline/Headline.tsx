import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import styles from './Headline.module.css';

export interface HeadlineProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
}

// semibold by default – that emphasis is what makes a headline read as one (iOS Headline)
export function Headline({
  ref,
  weight = '2',
  className,
  Component = 'h5',
  ...rest
}: HeadlineProps) {
  return (
    <Typography
      ref={ref}
      weight={weight}
      Component={Component}
      className={cn(styles.headline, className)}
      {...rest}
    />
  );
}

Headline.displayName = 'Headline';
