'use client';

import { cloneElement, isValidElement, type ReactElement, useContext } from 'react';
import { PopoverContext } from './context';

export interface PopoverTriggerProps {
  children: ReactElement;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef, contentId } = useContext(PopoverContext);

  if (!isValidElement(children)) return children;

  const child = children as ReactElement<Record<string, unknown>>;
  const childRef = (child.props as { ref?: unknown }).ref;
  const childOnClick = child.props.onClick as ((event: unknown) => void) | undefined;

  return cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object')
        (childRef as { current: HTMLElement | null }).current = node;
    },
    onClick: (event: unknown) => {
      childOnClick?.(event);
      setOpen(!open);
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? contentId : undefined,
  });
}

PopoverTrigger.displayName = 'PopoverTrigger';
