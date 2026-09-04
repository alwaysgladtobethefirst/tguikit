import { cva } from 'class-variance-authority';
import styles from './InlineButtons.module.css';

export type InlineButtonsMode = 'bezeled' | 'plain' | 'gray';

export const inlineButtonsItem = cva(styles.item, {
  variants: {
    mode: {
      bezeled: styles['mode-bezeled'],
      plain: styles['mode-plain'],
      gray: styles['mode-gray'],
    },
  },
  defaultVariants: { mode: 'bezeled' },
});
