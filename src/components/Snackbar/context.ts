import type { ReactNode } from 'react';
import { createContext } from 'react';

export interface SnackbarOptions {
  message: ReactNode;
  description?: ReactNode;
  before?: ReactNode;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export interface SnackbarApi {
  show: (options: SnackbarOptions) => string;
  dismiss: (id: string) => void;
}

export const SnackbarContext = createContext<SnackbarApi | null>(null);

SnackbarContext.displayName = 'SnackbarContext';
