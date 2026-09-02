import { cva } from 'class-variance-authority';
import styles from './Chip.module.css';

export type ChipMode = 'elevated' | 'outline';

export const chip = cva(styles.chip, {
  variants: {
    mode: {
      elevated: styles['mode-elevated'],
      outline: styles['mode-outline'],
    },
    clickable: { true: styles.clickable },
  },
  defaultVariants: { mode: 'elevated' },
});
