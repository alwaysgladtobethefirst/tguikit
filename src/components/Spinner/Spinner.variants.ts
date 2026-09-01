import { cva } from 'class-variance-authority';
import styles from './Spinner.module.css';

export type SpinnerSize = 's' | 'm' | 'l';

export const spinner = cva(styles.spinner, {
  variants: {
    size: { s: styles.s, m: styles.m, l: styles.l },
  },
  defaultVariants: { size: 'm' },
});
