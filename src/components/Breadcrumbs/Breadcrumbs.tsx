import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  ref?: Ref<HTMLElement>;
  items: BreadcrumbItem[];
  maxItems?: number;
}

const Chevron = () => (
  <svg
    className={styles.chevron}
    width="14"
    height="14"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden
  >
    <path
      d="M6.75 4.5L11.25 9l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Breadcrumbs({ ref, items, maxItems = 4, className, ...rest }: BreadcrumbsProps) {
  const collapsed = items.length > maxItems;
  const visible: (BreadcrumbItem | 'ellipsis')[] = collapsed
    ? [items[0], 'ellipsis', ...items.slice(items.length - (maxItems - 1))]
    : items;

  return (
    <nav ref={ref} aria-label="Breadcrumbs" className={cn(styles.nav, className)} {...rest}>
      <ol className={styles.list}>
        {visible.map((item, index) => {
          const isLast = index === visible.length - 1;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: breadcrumb trail order is stable
            <li key={index} className={styles.item}>
              {item === 'ellipsis' ? (
                <span className={styles.ellipsis} aria-hidden>
                  …
                </span>
              ) : isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href != null ? (
                <a href={item.href} className={styles.link} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <button type="button" className={styles.link} onClick={item.onClick}>
                  {item.label}
                </button>
              )}
              {!isLast ? <Chevron /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = 'Breadcrumbs';
