import { createContext } from 'react';

export interface AccordionContextValue {
  open: string[];
  toggle: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

AccordionContext.displayName = 'AccordionContext';
