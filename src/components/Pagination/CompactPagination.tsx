'use client';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Pagination.module.css';

export interface CompactPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  ref?: Ref<HTMLElement>;
  page: number;
  count: number;
  onChange: (page: number) => void;
}

const MAX_DOTS = 8;
const WINDOW = 7;

function visiblePages(page: number, count: number) {
  if (count <= MAX_DOTS) return Array.from({ length: count }, (_, index) => index + 1);
  const half = Math.floor(WINDOW / 2);
  const start = Math.max(1, Math.min(page - half, count - WINDOW + 1));
  return Array.from({ length: WINDOW }, (_, index) => start + index);
}

export function CompactPagination({
  ref,
  page,
  count,
  onChange,
  className,
  ...rest
}: CompactPaginationProps) {
  const pages = visiblePages(page, count);

  return (
    <nav ref={ref} aria-label="Pagination" className={cn(styles.nav, className)} {...rest}>
      <ul className={styles.dotList}>
        {pages.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
}

CompactPagination.displayName = 'CompactPagination';
