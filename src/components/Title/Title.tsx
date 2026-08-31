import type { Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Typography, type TypographyProps } from '../Typography';
import { TITLE_LEVELS, type TitleLevel } from './Title.variants';

export interface TitleProps extends TypographyProps {
  ref?: Ref<HTMLElement>;
  level?: TitleLevel;
}

export function Title({ ref, level = '2', Component, className, ...rest }: TitleProps) {
  const { tag, className: levelClass } = TITLE_LEVELS[level];

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
