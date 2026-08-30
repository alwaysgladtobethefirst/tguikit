'use client';

import {
  Children,
  Fragment,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '../../shared/lib/cn';
import { Divider } from '../Divider';
import { useTgui } from '../TguiProvider';
import styles from './Section.module.css';
import { SectionFooter } from './SectionFooter';
import { SectionHeader } from './SectionHeader';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  // a string is wrapped in Section.Header automatically; pass <Section.Header large> for control
  header?: ReactNode;
  // a string is wrapped in Section.Footer automatically
  footer?: ReactNode;
}

const isText = (node: ReactNode) => typeof node === 'string' || typeof node === 'number';

export function Section({ ref, header, footer, className, children, ...rest }: SectionProps) {
  const { platform } = useTgui();
  const rows = Children.toArray(children);

  return (
    <section
      ref={ref}
      className={cn(platform === 'ios' ? styles.sectionIos : styles.sectionBase, className)}
      {...rest}
    >
      <div className={styles.bodyWithHeader}>
        {isText(header) ? <SectionHeader>{header}</SectionHeader> : header}
        <div className={styles.body}>
          {rows.map((row, i) => (
            <Fragment key={isValidElement(row) ? row.key : i}>
              {row}
              {i < rows.length - 1 ? <Divider /> : null}
            </Fragment>
          ))}
        </div>
      </div>
      {isText(footer) ? <SectionFooter>{footer}</SectionFooter> : footer}
    </section>
  );
}

Section.displayName = 'Section';
Section.Header = SectionHeader;
Section.Footer = SectionFooter;
