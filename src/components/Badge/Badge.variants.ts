import { cva } from 'class-variance-authority';
import styles from './Badge.module.css';

export type BadgeType = 'number' | 'dot';
export type BadgeMode = 'primary' | 'critical' | 'secondary' | 'gray' | 'white';

export const badge = cva(styles.badge, {
  variants: {
    type: { number: styles.number, dot: styles.dot },
    mode: {
      primary: styles['mode-primary'],
      critical: styles['mode-critical'],
      secondary: styles['mode-secondary'],
      gray: styles['mode-gray'],
      white: styles['mode-white'],
    },
    large: { true: styles.large },
  },
  defaultVariants: { type: 'number', mode: 'primary' },
});
