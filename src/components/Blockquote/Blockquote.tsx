import type { BlockquoteHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Blockquote.module.css';

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  ref?: Ref<HTMLQuoteElement>;
  author?: ReactNode;
}

export function Blockquote({ ref, author, className, children, ...rest }: BlockquoteProps) {
  return (
    <blockquote ref={ref} className={cn(styles.blockquote, className)} {...rest}>
      {children}
      {author != null ? <cite className={styles.cite}>{author}</cite> : null}
    </blockquote>
  );
}

Blockquote.displayName = 'Blockquote';
