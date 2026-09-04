'use client';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { IconButton } from '../IconButton';
import styles from './Pagination.module.css';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  ref?: Ref<HTMLElement>;
  page: number;
  count: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

const DOTS = 'dots' as const;

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function paginationRange(page: number, count: number, siblingCount: number) {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalNumbers >= count) return range(1, count);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, count);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < count - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, count];
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(count - (3 + siblingCount * 2) + 1, count)];
  }
  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, count];
}

const ArrowIcon = ({ direction }: { direction: 'prev' | 'next' }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d={direction === 'prev' ? 'M11.25 4.5L6.75 9l4.5 4.5' : 'M6.75 4.5L11.25 9l-4.5 4.5'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Pagination({
  ref,
  page,
  count,
  onChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  const items = paginationRange(page, count, siblingCount);

  return (
    <nav ref={ref} aria-label="Pagination" className={cn(styles.nav, className)} {...rest}>
      <ul className={styles.list}>
        <li>
          <IconButton
            mode="gray"
            size="s"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onChange(page - 1)}
          >
            <ArrowIcon direction="prev" />
          </IconButton>
        </li>
        {items.map((item, index) =>
          item === DOTS ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable per render
            <li key={`dots-${index}`} className={styles.dots} aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(styles.page, item === page && styles['page--active'])}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <IconButton
            mode="gray"
            size="s"
            aria-label="Next page"
            disabled={page >= count}
            onClick={() => onChange(page + 1)}
          >
            <ArrowIcon direction="next" />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}

Pagination.displayName = 'Pagination';
