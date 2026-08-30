import { cva } from 'class-variance-authority';
import styles from './Typography.module.css';

export const typography = cva(styles.typography, {
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
