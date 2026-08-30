import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { TabBar } from './TabBar';

const renderBar = (ui: ReactNode, platform: TguiPlatform = 'base') =>
  render(<TguiProvider platform={platform}>{ui}</TguiProvider>);

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('TabBar', () => {
  it('renders a nav of tappable items', () => {
    const onClick = vi.fn();
    renderBar(
      <TabBar>
        <TabBar.Item text="Chats" onClick={onClick}>
          <span>ic</span>
        </TabBar.Item>
        <TabBar.Item text="Settings">
          <span>ic</span>
        </TabBar.Item>
      </TabBar>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const chats = screen.getByRole('button', { name: /Chats/ });
    fireEvent.click(chats);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('marks the selected item with aria-current and the selected class', () => {
    renderBar(
      <TabBar>
        <TabBar.Item text="Chats" selected>
          <span>ic</span>
        </TabBar.Item>
        <TabBar.Item text="Calls">
          <span>ic</span>
        </TabBar.Item>
      </TabBar>,
    );
    const selected = screen.getByRole('button', { name: /Chats/ });
    expect(selected).toHaveAttribute('aria-current', 'page');
    expect(selected.className).toContain('itemSelected');
  });

  it('picks the platform padding', () => {
    const { container } = renderBar(
      <TabBar>
        <TabBar.Item text="a">
          <span>ic</span>
        </TabBar.Item>
      </TabBar>,
      'ios',
    );
    expect(container.querySelector('nav')?.className).toContain('barIos');
  });

  it('forwards ref and className on the bar', () => {
    const ref = { current: null as HTMLElement | null };
    renderBar(
      <TabBar ref={ref} className="dock">
        <TabBar.Item text="a">
          <span>ic</span>
        </TabBar.Item>
      </TabBar>,
    );
    expect(ref.current?.tagName).toBe('NAV');
    expect(ref.current).toHaveClass('dock');
  });
});
