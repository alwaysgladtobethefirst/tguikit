import type { ElementType, Ref } from 'react';
import { Typography, type TypographyProps } from '../../foundations/Typography';
import { cn } from '../../shared/lib/cn';
import styles from './Title.module.css';

type Level = '1' | '2' | '3';

// each level bundles its heading tag with its size class
const LEVELS: Record<Level, { tag: ElementType; className: string }> = {
  '1': { tag: 'h2', className: styles['level-1'] },
  '2': { tag: 'h3', className: styles['level-2'] },
  '3': { tag: 'h4', className: styles['level-3'] },
};

export interface TitleProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
  // 1 = largest (h2), 2 = default (h3), 3 = smallest (h4)
  level?: Level;
}

export function Title({ ref, level = '2', Component, className, ...rest }: TitleProps) {
  const { tag, className: levelClass } = LEVELS[level];

  return (
    <Typography
      ref={ref}
      Component={Component ?? tag}
      className={cn(levelClass, className)}
      {...rest}
    />
  );
}

Title.displayName = 'Title';
