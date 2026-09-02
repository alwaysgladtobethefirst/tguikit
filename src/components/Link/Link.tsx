import type { AnchorHTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

export function Link({ ref, target, rel, className, children, ...rest }: LinkProps) {
  const external = target === '_blank';
  return (
    <a
      ref={ref}
      target={target}
      rel={external ? (rel ?? 'noopener noreferrer') : rel}
      className={cn(styles.link, className)}
      {...rest}
    >
      {children}
      {external ? (
        <svg className={styles.icon} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M6 3h7v7M13 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}

Link.displayName = 'Link';
