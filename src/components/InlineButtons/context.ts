import { createContext } from 'react';
import type { InlineButtonsMode } from './InlineButtons.variants';

export interface InlineButtonsContextValue {
  mode: InlineButtonsMode;
}

export const InlineButtonsContext = createContext<InlineButtonsContextValue>({ mode: 'bezeled' });

InlineButtonsContext.displayName = 'InlineButtonsContext';
