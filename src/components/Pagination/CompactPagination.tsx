'use client';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Pagination.module.css';
import { DOTS, paginationRange } from './paginationRange';

export interface CompactPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  ref?: Ref<HTMLElement>;
  page: number;
  count: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

export function CompactPagination({
  ref,
  page,
  count,
  onChange,
  siblingCount = 1,
  className,
  ...rest
}: CompactPaginationProps) {
  const items = paginationRange(page, count, siblingCount);

  return (
    <nav ref={ref} aria-label="Pagination" className={cn(styles.nav, className)} {...rest}>
      <ul className={styles.dotList}>
        {items.map((item, index) =>
          item === DOTS ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable per render
            <li key={`dots-${index}`} className={styles.dotGap} aria-hidden />
          ) : (
            <li key={item}>
              <button
                type="button"
                className={styles.dot}
                data-active={item === page || undefined}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onChange(item)}
              />
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

CompactPagination.displayName = 'CompactPagination';
