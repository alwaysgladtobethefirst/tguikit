import { cva } from 'class-variance-authority';
import styles from './Banner.module.css';

export type BannerType = 'section' | 'image';

export const banner = cva(styles.banner, {
  variants: {
    type: {
      section: styles['type-section'],
      image: styles['type-image'],
    },
  },
  defaultVariants: { type: 'section' },
});
