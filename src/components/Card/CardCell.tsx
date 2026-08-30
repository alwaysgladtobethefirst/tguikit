'use client';

import { type Ref, useContext } from 'react';
import { cn } from '../../shared/lib/cn';
import { Cell, type CellProps } from '../Cell';
import { CardContext } from './Card.context';
import styles from './Card.module.css';

export interface CardCellProps extends CellProps {
  ref?: Ref<HTMLElement>;
}

export function CardCell({ ref, children, subtitle, className, ...rest }: CardCellProps) {
  const { type } = useContext(CardContext);
  const ambient = type === 'ambient';

  return (
    <Cell
      ref={ref}
      className={cn(styles.cell, ambient && styles.cellAmbient, className)}
      subtitle={
        subtitle != null ? <span className={styles.cellSubtitle}>{subtitle}</span> : undefined
      }
      {...rest}
    >
      {children != null ? <span className={styles.cellHeader}>{children}</span> : null}
    </Cell>
  );
}

CardCell.displayName = 'CardCell';
