'use client';

import type { ElementType, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Caption } from '../Caption';
import { Subheadline } from '../Subheadline';
import { Tappable, type TappableProps } from '../Tappable';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Cell.module.css';
import { cell } from './Cell.variants';

export interface CellProps extends Omit<TappableProps, 'Component'> {
  ref?: Ref<HTMLElement>;
  Component?: ElementType;
  subhead?: ReactNode;
  hint?: ReactNode;
  titleBadge?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  hovered?: boolean;
  multiline?: boolean;
}

function CellTitle({ ios, children }: { ios: boolean; children: ReactNode }) {
  return ios ? (
    <Text className={styles.head}>{children}</Text>
  ) : (
    <Subheadline level="1" className={styles.head}>
      {children}
    </Subheadline>
  );
}

function CellDescription({ ios, children }: { ios: boolean; children: ReactNode }) {
  return ios ? (
    <Caption className={styles.description}>{children}</Caption>
  ) : (
    <Subheadline level="2" className={styles.description}>
      {children}
    </Subheadline>
  );
}

export function Cell({
  ref,
  Component = 'div',
  subhead,
  children,
  hint,
  titleBadge,
  subtitle,
  description,
  before,
  after,
  hovered,
  multiline,
  className,
  ...rest
}: CellProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';
  const hasTitle = children != null || hint != null || titleBadge != null;
  const interactive =
    rest.onClick != null ||
    rest.href != null ||
    Component === 'a' ||
    Component === 'button' ||
    Component === 'label';

  return (
    <Tappable
      ref={ref}
      Component={Component}
      className={cn(cell({ platform, hovered, multiline, interactive }), className)}
      {...rest}
    >
      {before != null ? <div className={styles.before}>{before}</div> : null}

      <div className={styles.middle}>
        {subhead != null ? (
          <Subheadline level="2" className={styles.subhead}>
            {subhead}
          </Subheadline>
        ) : null}

        {hasTitle ? (
          <CellTitle ios={ios}>
            {children != null ? <span className={styles.title}>{children}</span> : null}
            {hint != null ? <span className={styles.hint}>{hint}</span> : null}
            {titleBadge}
          </CellTitle>
        ) : null}

        {subtitle != null ? (
          <Subheadline level="2" className={styles.subtitle}>
            {subtitle}
          </Subheadline>
        ) : null}

        {description != null ? <CellDescription ios={ios}>{description}</CellDescription> : null}
      </div>

      {after != null ? <div className={styles.after}>{after}</div> : null}
    </Tappable>
  );
}

Cell.displayName = 'Cell';
