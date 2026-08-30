import { cva } from 'class-variance-authority';
import styles from './Caption.module.css';

export type CaptionLevel = '1' | '2';

export const caption = cva('', {
  variants: {
    level: {
      '1': styles['level-1'],
      '2': styles['level-2'],
    },
  },
  defaultVariants: { level: '1' },
});
