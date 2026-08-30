import { render, renderHook, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from './TguiProvider';
import { useTgui } from './useTgui';

function installMatchMedia(initialDark: boolean) {
  const listeners = new Set<() => void>();
  const state = { matches: initialDark };

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes('dark') ? state.matches : !state.matches;
    },
    media: query,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    addListener: (cb: () => void) => listeners.add(cb),
    removeListener: (cb: () => void) => listeners.delete(cb),
    dispatchEvent: () => true,
    onchange: null,
  })) as unknown as typeof window.matchMedia;

  return {
    setDark(next: boolean) {
      state.matches = next;
      for (const cb of listeners) cb();
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(window, 'Telegram');
});

describe('TguiProvider', () => {
  beforeEach(() => {
    installMatchMedia(false);
  });

  it('renders children inside a wrapper element', () => {
    render(
      <TguiProvider data-testid="root">
        <span>content</span>
      </TguiProvider>,
    );

    expect(screen.getByTestId('root')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('forwards ref and extra div props', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TguiProvider ref={ref} id="app" aria-label="mini app" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.id).toBe('app');
    expect(ref.current?.getAttribute('aria-label')).toBe('mini app');
  });

  it('applies explicit platform and appearance classes', () => {
    const { container } = render(<TguiProvider platform="ios" appearance="dark" />);
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.className).toContain('wrapper--ios');
    expect(wrapper.className).toContain('wrapper--dark');
  });

  it('exposes context values through useTgui', () => {
    const { result } = renderHook(() => useTgui(), {
      wrapper: ({ children }) => (
        <TguiProvider platform="base" appearance="light">
          {children}
        </TguiProvider>
      ),
    });

    expect(result.current.platform).toBe('base');
    expect(result.current.appearance).toBe('light');
    expect(result.current.portalContainer).toBeInstanceOf(HTMLElement);
  });

  it('follows the system colour scheme when appearance is not set', () => {
    const media = installMatchMedia(false);
    const { container } = render(<TguiProvider />);
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.className).not.toContain('wrapper--dark');

    act(() => media.setDark(true));
    expect(wrapper.className).toContain('wrapper--dark');
  });

  it('ignores system changes when appearance is pinned', () => {
    const media = installMatchMedia(false);
    const { container } = render(<TguiProvider appearance="light" />);
    const wrapper = container.firstElementChild as HTMLElement;

    act(() => media.setDark(true));
    expect(wrapper.className).not.toContain('wrapper--dark');
  });

  it('reads platform and theme from the Telegram WebApp when present', () => {
    const handlers: Record<string, () => void> = {};
    (window as unknown as { Telegram: unknown }).Telegram = {
      WebApp: {
        platform: 'ios',
        colorScheme: 'dark',
        onEvent: (evt: string, cb: () => void) => {
          handlers[evt] = cb;
        },
        offEvent: (evt: string) => {
          delete handlers[evt];
        },
      },
    };

    const { container } = render(<TguiProvider />);
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper.className).toContain('wrapper--ios');
    expect(wrapper.className).toContain('wrapper--dark');
  });

  it('throws when useTgui is used outside a provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useTgui())).toThrow(/within a <TguiProvider>/);
  });
});
