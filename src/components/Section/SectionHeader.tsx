'use client';

import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Caption } from '../Caption';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { useTgui } from '../TguiProvider';
import styles from './Section.module.css';

export interface SectionHeaderProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // switches to a page-title style (bigger, primary text colour)
  large?: boolean;
}

function HeaderText({
  ios,
  large,
  children,
}: {
  ios: boolean;
  large: boolean;
  children: ReactNode;
}) {
  if (large) {
    return ios ? (
      <Subheadline Component="h2" level="1" weight="2">
        {children}
      </Subheadline>
    ) : (
      <Text Component="h2" weight="2">
        {children}
      </Text>
    );
  }
  return ios ? (
    <Caption Component="h2" caps>
      {children}
    </Caption>
  ) : (
    <Subheadline Component="h2" level="2" weight="2">
      {children}
    </Subheadline>
  );
}

export function SectionHeader({
  ref,
  large = false,
  className,
  children,
  ...rest
}: SectionHeaderProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';

  return (
    <header
      ref={ref}
      className={cn(styles.header, ios && styles.headerIos, large && styles.headerLarge, className)}
      {...rest}
    >
      <HeaderText ios={ios} large={large}>
        {children}
      </HeaderText>
    </header>
  );
}

SectionHeader.displayName = 'SectionHeader';
