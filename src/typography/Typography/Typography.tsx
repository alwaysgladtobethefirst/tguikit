import { cva } from 'class-variance-authority';
import type { AllHTMLAttributes, ElementType, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Typography.module.css';

const typography = cva(styles.typography, {
  variants: {
    weight: {
      '1': styles['weight-1'],
      '2': styles['weight-2'],
      '3': styles['weight-3'],
    },
    caps: { true: styles.caps },
  },
  defaultVariants: { weight: '3' },
});

export interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // 1 = bold, 2 = semibold, 3 = regular (maps to --tgui--font_weight--accent1..3)
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
