import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import styles from './Text.module.css';

export interface TextProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
}

export function Text({ ref, className, Component = 'span', ...rest }: TextProps) {
  return (
    <Typography ref={ref} Component={Component} className={cn(styles.text, className)} {...rest} />
  );
}

Text.displayName = 'Text';
