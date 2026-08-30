'use client';

import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../shared/lib/cn';
import { Caption } from '../Caption';
import { Subheadline } from '../Subheadline';
import { useTgui } from '../TguiProvider';
import styles from './Section.module.css';

export interface SectionFooterProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // centre the text and add breathing room, for a standalone note
  centered?: boolean;
}

function FooterText({ ios, children }: { ios: boolean; children: ReactNode }) {
  return ios ? (
    <Caption className={styles.footerText}>{children}</Caption>
  ) : (
    <Subheadline level="2" className={styles.footerText}>
      {children}
    </Subheadline>
  );
}

export function SectionFooter({
  ref,
  centered = false,
  className,
  children,
  ...rest
}: SectionFooterProps) {
  const { platform } = useTgui();
  const ios = platform === 'ios';

  return (
    <footer
      ref={ref}
      className={cn(
        styles.footer,
        ios && styles.footerIos,
        centered && styles.footerCentered,
        className,
      )}
      {...rest}
    >
      <FooterText ios={ios}>{children}</FooterText>
    </footer>
  );
}

SectionFooter.displayName = 'SectionFooter';
