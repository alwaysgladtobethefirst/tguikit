'use client';

import { type ReactNode, useCallback, useId, useRef, useState } from 'react';
import { PopoverContext } from './context';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp == null) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentId }}>
      {children}
    </PopoverContext.Provider>
  );
}

Popover.displayName = 'Popover';
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
