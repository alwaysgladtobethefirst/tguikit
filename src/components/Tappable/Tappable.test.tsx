import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Tappable } from './Tappable';

function renderTappable(ui: ReactNode, platform: TguiPlatform = 'base') {
  return render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
}

function ripple(container: HTMLElement) {
  return container.querySelector('span[aria-hidden]');
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Tappable', () => {
  it('renders children in a div by default', () => {
    renderTappable(<Tappable>tap me</Tappable>);
    expect(screen.getByText('tap me').tagName).toBe('DIV');
  });

  it('renders as the Component passed in', () => {
    renderTappable(<Tappable Component="button">go</Tappable>);
    expect(screen.getByRole('button', { name: 'go' })).toBeInTheDocument();
  });

  it('marks disabled with aria-disabled and data-disabled', () => {
    renderTappable(<Tappable disabled>x</Tappable>);
    const el = screen.getByText('x');
    expect(el).toHaveAttribute('aria-disabled', 'true');
    expect(el).toHaveAttribute('data-disabled');
  });

  it('forwards ref and extra props', () => {
    const ref = { current: null as HTMLElement | null };
    renderTappable(<Tappable ref={ref} data-testid="t" title="hint" />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(screen.getByTestId('t')).toHaveAttribute('title', 'hint');
  });

  it('spawns a ripple wave on press on the base platform', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(<Tappable onClick={() => {}}>tap</Tappable>, 'base');

    fireEvent.pointerDown(screen.getByText('tap'), { clientX: 8, clientY: 12, pointerId: 1 });
    expect(ripple(container)?.children).toHaveLength(0);

    act(() => vi.advanceTimersByTime(80));
    expect(ripple(container)?.children).toHaveLength(1);
  });

  it('clears the wave once it has run its course', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(<Tappable onClick={() => {}}>tap</Tappable>, 'base');

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    act(() => vi.advanceTimersByTime(80));
    expect(ripple(container)?.children).toHaveLength(1);

    // browsers remove it on animationend; the fallback timer covers reduced motion
    act(() => vi.advanceTimersByTime(700));
    expect(ripple(container)?.children).toHaveLength(0);
  });

  it('does not ripple before the press delay elapses', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(<Tappable onClick={() => {}}>tap</Tappable>, 'base');

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    fireEvent.pointerCancel(screen.getByText('tap'), { pointerId: 1 });

    act(() => vi.advanceTimersByTime(200));
    expect(ripple(container)?.children ?? []).toHaveLength(0);
  });

  it('never ripples on the ios platform', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(<Tappable>tap</Tappable>, 'ios');

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    act(() => vi.advanceTimersByTime(200));

    expect(ripple(container)).toBeNull();
    expect(screen.getByText('tap').className).toContain('tappable--ios');
  });

  it('does not ripple when readonly or when animation is opacity', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(
      <Tappable interactiveAnimation="opacity" readOnly>
        tap
      </Tappable>,
      'base',
    );

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    act(() => vi.advanceTimersByTime(200));

    expect(ripple(container)).toBeNull();
    expect(screen.getByText('tap')).toHaveAttribute('data-readonly');
    expect(screen.getByText('tap').className).toContain('tappable--opacity');
  });

  it('does not ripple a plain wrapper with no handler', () => {
    vi.useFakeTimers();
    const { container } = renderTappable(<Tappable>tap</Tappable>, 'base');

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    act(() => vi.advanceTimersByTime(200));

    expect(ripple(container)).toBeNull();
  });

  it('still calls a caller-supplied onPointerDown', () => {
    const onPointerDown = vi.fn();
    renderTappable(<Tappable onPointerDown={onPointerDown}>tap</Tappable>, 'base');

    fireEvent.pointerDown(screen.getByText('tap'), { pointerId: 1 });
    expect(onPointerDown).toHaveBeenCalledOnce();
  });
});
