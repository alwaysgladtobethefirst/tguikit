import { cva } from 'class-variance-authority';
import styles from './Subheadline.module.css';

export type SubheadlineLevel = '1' | '2';

export const subheadline = cva('', {
  variants: {
    level: {
      '1': styles['level-1'],
      '2': styles['level-2'],
    },
  },
  defaultVariants: { level: '1' },
});
