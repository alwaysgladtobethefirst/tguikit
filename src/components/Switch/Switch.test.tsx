import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Switch } from './Switch';

const renderSwitch = (ui: ReactNode, platform: TguiPlatform = 'base') => {
  const r = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return { ...r, label: r.container.querySelector('label') as HTMLElement };
};

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Switch', () => {
  it('renders a role=switch checkbox that toggles', () => {
    renderSwitch(<Switch aria-label="Wi-Fi" />);
    const el = screen.getByRole('checkbox', { name: 'Wi-Fi' }) as HTMLInputElement;
    expect(el.checked).toBe(false);
    fireEvent.click(el);
    expect(el.checked).toBe(true);
  });

  it('picks the platform style', () => {
    const { label: base } = renderSwitch(<Switch aria-label="x" />, 'base');
    expect(base.className).toContain('base');
    const { label: ios } = renderSwitch(<Switch aria-label="x" />, 'ios');
    expect(ios.className).toContain('ios');
  });

  it('disables', () => {
    const { label } = renderSwitch(<Switch aria-label="x" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(label).toHaveAttribute('data-disabled');
  });

  it('supports controlled checked + onChange and forwards ref', () => {
    const onChange = vi.fn();
    const ref = { current: null as HTMLInputElement | null };
    renderSwitch(<Switch ref={ref} aria-label="x" checked readOnly onChange={onChange} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
