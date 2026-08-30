import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { List } from './List';

function renderList(ui: ReactNode, platform: TguiPlatform = 'base') {
  const result = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return { ...result, list: result.container.firstElementChild?.firstElementChild as HTMLElement };
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('List', () => {
  it('renders a div wrapping its children by default', () => {
    const { list } = renderList(
      <List>
        <div>a</div>
        <div>b</div>
      </List>,
    );
    expect(list.tagName).toBe('DIV');
    expect(list.className).toContain('list');
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  it('adds the iOS padding class on iOS only', () => {
    const { list: base } = renderList(<List>x</List>, 'base');
    expect(base.className).not.toContain('ios');

    const { list: ios } = renderList(<List>x</List>, 'ios');
    expect(ios.className).toContain('ios');
  });

  it('renders as another element when Component is set', () => {
    renderList(
      <List Component="main" data-testid="l">
        x
      </List>,
    );
    expect(screen.getByTestId('l').tagName).toBe('MAIN');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    renderList(
      <List ref={ref} className="screen">
        x
      </List>,
    );
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current).toHaveClass('screen');
  });
});
