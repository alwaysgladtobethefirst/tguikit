import { useContext } from 'react';
import type { TguiContextValue } from '../../shared/types/tgui';
import { TguiContext } from './context';

export function useTgui(): TguiContextValue {
  const context = useContext(TguiContext);

  if (context === null) {
    throw new Error('useTgui must be used within a <TguiProvider>.');
  }

  return context;
}
