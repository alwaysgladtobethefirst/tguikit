import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Text } from '../Text';
import { Title } from '../Title';
import styles from './Placeholder.module.css';

export interface PlaceholderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // the visual — an illustration or animation
  children?: ReactNode;
  header?: ReactNode;
  description?: ReactNode;
  // a call to action, usually a Button
  action?: ReactNode;
}

export function Placeholder({
  ref,
  children,
  header,
  description,
  action,
  className,
  ...rest
}: PlaceholderProps) {
  return (
    <section ref={ref} className={cn(styles.placeholder, className)} {...rest}>
      {children}
      {header != null || description != null ? (
        <dl className={styles.fields}>
          {header != null ? (
            <Title Component="dt" level="3" weight="2">
              {header}
            </Title>
          ) : null}
          {description != null ? (
            <Text Component="dd" className={styles.description}>
              {description}
            </Text>
          ) : null}
        </dl>
      ) : null}
      {action}
    </section>
  );
}

Placeholder.displayName = 'Placeholder';
