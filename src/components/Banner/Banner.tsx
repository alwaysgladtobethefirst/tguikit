import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Banner.module.css';
import { type BannerType, banner } from './Banner.variants';

export type { BannerType };

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  type?: BannerType;
  before?: ReactNode;
  callout?: ReactNode;
  header?: ReactNode;
  subheader?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  background?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Banner({
  ref,
  type = 'section',
  before,
  callout,
  header,
  subheader,
  description,
  actions,
  background,
  onClose,
  closeLabel = 'Close',
  className,
  children,
  ...rest
}: BannerProps) {
  return (
    <section ref={ref} className={cn(banner({ type }), className)} {...rest}>
      {type === 'image' && background != null ? (
        <div className={styles.background} aria-hidden>
          {background}
        </div>
      ) : null}

      {before != null ? <div className={styles.before}>{before}</div> : null}

      <div className={styles.body}>
        {callout != null ? <span className={styles.callout}>{callout}</span> : null}
        {header != null ? <span className={styles.header}>{header}</span> : null}
        {subheader != null ? <span className={styles.subheader}>{subheader}</span> : null}
        {description != null ? <p className={styles.description}>{description}</p> : null}
        {children}
        {actions != null ? <div className={styles.actions}>{actions}</div> : null}
      </div>

      {onClose != null ? (
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M3.5 3.5l7 7M10.5 3.5l-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </section>
  );
}

Banner.displayName = 'Banner';
