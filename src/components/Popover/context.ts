import { createContext, type RefObject } from 'react';

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentId: string;
}

export const PopoverContext = createContext<PopoverContextValue>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  contentId: '',
});

PopoverContext.displayName = 'PopoverContext';
