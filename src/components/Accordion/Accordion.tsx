'use client';

import { type HTMLAttributes, type Ref, useCallback, useMemo, useState } from 'react';
import { cn } from '../../shared/lib/cn';
import styles from './Accordion.module.css';
import { AccordionContext } from './context';

const toArray = (value: string | string[] | undefined): string[] =>
  value == null ? [] : Array.isArray(value) ? value : [value];

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: Ref<HTMLDivElement>;
  multiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string[]) => void;
}

export function Accordion({
  ref,
  multiple = false,
  value: valueProp,
  defaultValue,
  onChange,
  className,
  children,
  ...rest
}: AccordionProps) {
  const [uncontrolled, setUncontrolled] = useState(() => toArray(defaultValue));
  const open = valueProp != null ? toArray(valueProp) : uncontrolled;

  const toggle = useCallback(
    (item: string) => {
      const isOpen = open.includes(item);
      const next = isOpen ? open.filter((v) => v !== item) : multiple ? [...open, item] : [item];
      if (valueProp == null) setUncontrolled(next);
      onChange?.(next);
    },
    [open, multiple, valueProp, onChange],
  );

  const context = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <AccordionContext.Provider value={context}>
      <div ref={ref} className={cn(styles.accordion, className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

Accordion.displayName = 'Accordion';
