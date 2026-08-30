'use client';

import { type HTMLAttributes, type Ref, useMemo } from 'react';
import { cn } from '../../shared/lib/cn';
import { CardContext, type CardType } from './Card.context';
import styles from './Card.module.css';
import { CardCell } from './CardCell';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // 'ambient' floats a gradient CardCell over a media background
  type?: CardType;
}

export function Card({ ref, type = 'plain', className, children, ...rest }: CardProps) {
  const context = useMemo(() => ({ type }), [type]);

  return (
    <CardContext.Provider value={context}>
      <article
        ref={ref}
        className={cn(styles.card, type === 'ambient' && styles.cardAmbient, className)}
        {...rest}
      >
        {children}
      </article>
    </CardContext.Provider>
  );
}

Card.displayName = 'Card';
Card.Cell = CardCell;
