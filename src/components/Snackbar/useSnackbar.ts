import { useContext } from 'react';
import { type SnackbarApi, SnackbarContext } from './context';

export function useSnackbar(): SnackbarApi {
  const api = useContext(SnackbarContext);
  if (!api) {
    throw new Error('useSnackbar must be used within a <SnackbarProvider>.');
  }
  return api;
}
