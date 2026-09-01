'use client';

import { type HTMLAttributes, type ReactNode, type Ref, useState } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Avatar.module.css';
import { type AvatarSize, avatar } from './Avatar.variants';

export type { AvatarSize };

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  acronym?: string;
  fallbackIcon?: ReactNode;
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.2 0-7 2.4-7 4.5V20h14v-1.5c0-2.1-2.8-4.5-7-4.5Z" />
    </svg>
  );
}

export function Avatar({
  ref,
  size = 40,
  src,
  alt = '',
  acronym,
  fallbackIcon,
  className,
  children,
  ...rest
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = src != null && src !== '' && src !== failedSrc;

  return (
    <span ref={ref} className={cn(avatar({ size }), className)} {...rest}>
      {showImage ? (
        <img
          className={styles.img}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
        />
      ) : acronym ? (
        <span className={styles.acronym}>{acronym}</span>
      ) : (
        <span className={styles.icon}>{fallbackIcon ?? <PersonIcon />}</span>
      )}
      {children}
    </span>
  );
}

Avatar.displayName = 'Avatar';
