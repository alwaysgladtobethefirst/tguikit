'use client';

import { type HTMLAttributes, type Ref, useState } from 'react';
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
const MARGIN = 1;

function clampStart(start: number, count: number) {
  return Math.max(1, Math.min(start, count - WINDOW + 1));
}

function initialStart(page: number, count: number) {
  return clampStart(page - Math.floor(WINDOW / 2), count);
}

export function CompactPagination({
  ref,
  page,
  count,
  onChange,
  className,
  ...rest
}: CompactPaginationProps) {
  const [start, setStart] = useState(() => initialStart(page, count));

  const windowed = count > MAX_DOTS;
  const effectiveStart = windowed
    ? page < start + MARGIN
      ? clampStart(page - MARGIN, count)
      : page > start + WINDOW - 1 - MARGIN
        ? clampStart(page - WINDOW + 1 + MARGIN, count)
        : clampStart(start, count)
    : 1;

  if (windowed && effectiveStart !== start) setStart(effectiveStart);

  const pages = windowed
    ? Array.from({ length: WINDOW }, (_, index) => effectiveStart + index)
    : Array.from({ length: count }, (_, index) => index + 1);

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
