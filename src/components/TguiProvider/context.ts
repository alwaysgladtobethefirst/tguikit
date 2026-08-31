import { createContext } from 'react';
import type { TguiContextValue } from '../../shared/types/tgui';

export const TguiContext = createContext<TguiContextValue | null>(null);

TguiContext.displayName = 'TguiContext';
