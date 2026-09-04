'use client';

import { type HTMLAttributes, type ReactNode, type Ref, useContext, useId } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Accordion.module.css';
import { AccordionContext } from './context';

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  value: string;
  header: ReactNode;
}

export function AccordionItem({
  ref,
  value,
  header,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an <Accordion>.');
  }
  const panelId = useId();
  const open = context.open.includes(value);

  return (
    <div ref={ref} className={cn(styles.item, className)} {...rest}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => context.toggle(value)}
      >
        <span className={styles.title}>{header}</span>
        <svg className={styles.chevron} viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M4.5 7l4.5 4.5L13.5 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={cn(styles.panel, open && styles['panel--open'])}>
        <div className={styles.panelInner}>
          <div id={panelId} className={styles.panelContent} inert={!open} aria-hidden={!open}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

AccordionItem.displayName = 'AccordionItem';
