import type { ElementType } from 'react';
import styles from './Title.module.css';

export type TitleLevel = '1' | '2' | '3';

// each level bundles its heading tag with its size class
export const TITLE_LEVELS: Record<TitleLevel, { tag: ElementType; className: string }> = {
  '1': { tag: 'h2', className: styles['level-1'] },
  '2': { tag: 'h3', className: styles['level-2'] },
  '3': { tag: 'h4', className: styles['level-3'] },
};
