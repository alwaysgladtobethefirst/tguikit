import { cva } from 'class-variance-authority';
import styles from './IconButton.module.css';

export type IconButtonMode = 'bezeled' | 'plain' | 'gray' | 'outline';
export type IconButtonSize = 's' | 'm' | 'l';

export const iconButton = cva(styles.iconButton, {
  variants: {
    mode: {
      bezeled: styles['mode-bezeled'],
      plain: styles['mode-plain'],
      gray: styles['mode-gray'],
      outline: styles['mode-outline'],
    },
    size: { s: styles.s, m: styles.m, l: styles.l },
    circle: { true: styles.circle },
    platform: { ios: styles.ios, base: null },
  },
  defaultVariants: { mode: 'plain', size: 'm' },
});
