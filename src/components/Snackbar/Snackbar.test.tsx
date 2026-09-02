import { act, fireEvent, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { SnackbarProvider } from './SnackbarProvider';
import { useSnackbar } from './useSnackbar';

const wrapper = ({ children }: { children: ReactNode }) => (
  <TguiProvider>
    <SnackbarProvider duration={1000}>{children}</SnackbarProvider>
  </TguiProvider>
);

beforeEach(() => {
  vi.useFakeTimers();
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('Snackbar', () => {
  it('throws without a provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useSnackbar())).toThrow(/within a <SnackbarProvider>/);
  });

  it('shows a snackbar and auto-dismisses after the duration', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.show({ message: 'Saved' });
    });
    expect(screen.getByText('Saved')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000 + 300);
    });
    expect(screen.queryByText('Saved')).toBeNull();
  });

  it('runs the action and dismisses', () => {
    const onClick = vi.fn();
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.show({ message: 'Deleted', action: { label: 'Undo', onClick } });
    });
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText('Deleted')).toBeNull();
  });

  it('caps the stack at max', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper: makeWrapper(2) });
    act(() => {
      result.current.show({ message: 'One', duration: 0 });
      result.current.show({ message: 'Two', duration: 0 });
      result.current.show({ message: 'Three', duration: 0 });
    });
    expect(screen.queryByText('One')).toBeNull();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });
});

function makeWrapper(max: number) {
  return ({ children }: { children: ReactNode }) => (
    <TguiProvider>
      <SnackbarProvider max={max}>{children}</SnackbarProvider>
    </TguiProvider>
  );
}
