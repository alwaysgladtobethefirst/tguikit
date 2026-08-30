import { cva } from 'class-variance-authority';
import styles from './Caption.module.css';

export type CaptionLevel = '1' | '2';

export const caption = cva('', {
  variants: {
    // 1 = 13px (--tgui--caption1), 2 = 11px (--tgui--caption2)
    level: {
      '1': styles['level-1'],
      '2': styles['level-2'],
    },
  },
  defaultVariants: { level: '1' },
});
