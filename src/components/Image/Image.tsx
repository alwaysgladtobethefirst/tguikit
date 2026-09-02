'use client';

import {
  type CSSProperties,
  type ImgHTMLAttributes,
  type ReactNode,
  type Ref,
  useState,
} from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Image.module.css';

type Fit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  ref?: Ref<HTMLImageElement>;
  size?: number;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  fit?: Fit;
  radius?: number | 'full';
  bordered?: boolean;
  fallback?: ReactNode;
}

const BrokenIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export function Image({
  ref,
  size,
  width,
  height,
  aspectRatio,
  fit = 'cover',
  radius,
  bordered = false,
  fallback = BrokenIcon,
  src,
  alt = '',
  className,
  style,
  onLoad,
  onError,
  ...rest
}: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const errored = src != null && src === failedSrc;

  const frameStyle: CSSProperties = {
    ...style,
    width: size ?? width,
    height: size ?? height,
    aspectRatio,
    borderRadius: radius === 'full' ? '50%' : radius,
    '--tgui--image--fit': fit,
  } as CSSProperties;

  return (
    <div
      className={cn(
        styles.frame,
        bordered && styles.bordered,
        !loaded && styles.loading,
        className,
      )}
      style={frameStyle}
    >
      {src != null && !errored ? (
        <img
          ref={ref}
          className={styles.img}
          src={src}
          alt={alt}
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setFailedSrc(src);
            onError?.(event);
          }}
          {...rest}
        />
      ) : null}
      {!loaded && !errored ? <div className={styles.placeholder} aria-hidden /> : null}
      {errored ? (
        <div className={styles.fallback} aria-hidden>
          {fallback}
        </div>
      ) : null}
    </div>
  );
}

Image.displayName = 'Image';
