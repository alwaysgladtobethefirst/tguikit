import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './AvatarStack.module.css';

export interface AvatarStackProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  overlap?: number;
}

export function AvatarStack({ ref, overlap, className, style, ...rest }: AvatarStackProps) {
  return (
    <div
      ref={ref}
      className={cn(styles.stack, className)}
      style={
        overlap != null
          ? ({ ...style, '--tgui--avatar-stack--overlap': `${overlap}px` } as CSSProperties)
          : style
      }
      {...rest}
    />
  );
}

AvatarStack.displayName = 'AvatarStack';
