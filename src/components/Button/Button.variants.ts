import { cva } from 'class-variance-authority';
import type { TguiPlatform } from '../../shared/types/tgui';
import styles from './Button.module.css';

export type ButtonMode = 'filled' | 'bezeled' | 'plain' | 'gray' | 'outline' | 'white';
export type ButtonSize = 's' | 'm' | 'l';

export const button = cva(styles.button, {
  variants: {
    mode: {
      filled: styles['mode-filled'],
      bezeled: styles['mode-bezeled'],
      plain: styles['mode-plain'],
      gray: styles['mode-gray'],
      outline: styles['mode-outline'],
      white: styles['mode-white'],
    },
    size: {
      s: styles['size-s'],
      m: styles['size-m'],
      l: styles['size-l'],
    },
    stretched: { true: styles.stretched },
    platform: { ios: styles.ios, base: null },
  },
  defaultVariants: { mode: 'filled', size: 'm' },
});

export type ButtonVariantInput = {
  mode?: ButtonMode;
  size?: ButtonSize;
  stretched?: boolean;
  platform: TguiPlatform;
};
