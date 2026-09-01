import { cva } from 'class-variance-authority';
import styles from './Avatar.module.css';

export type AvatarSize = 20 | 24 | 28 | 40 | 48 | 96;

export const avatar = cva(styles.avatar, {
  variants: {
    size: {
      20: styles.s20,
      24: styles.s24,
      28: styles.s28,
      40: styles.s40,
      48: styles.s48,
      96: styles.s96,
    },
  },
  defaultVariants: { size: 40 },
});
