import { createContext } from 'react';
import type { TguiContextValue } from '../../shared/types/tgui';

// null outside a provider — useTgui turns that into an error
export const TguiContext = createContext<TguiContextValue | null>(null);

TguiContext.displayName = 'TguiContext';
