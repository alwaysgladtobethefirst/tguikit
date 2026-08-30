import { cva } from 'class-variance-authority';
import styles from './Cell.module.css';

export const cell = cva(styles.cell, {
  variants: {
    platform: { ios: styles.ios, base: null },
    hovered: { true: styles.hovered },
    multiline: { true: styles.multiline },
  },
});
