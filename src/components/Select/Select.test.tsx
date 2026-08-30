import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Select } from './Select';

const renderSelect = (ui: ReactNode, platform: TguiPlatform = 'base') => {
  const r = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return { ...r, wrapper: r.container.firstElementChild?.firstElementChild as HTMLElement };
};

const opts = (
  <>
    <option value="en">English</option>
    <option value="de">German</option>
  </>
);

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Select', () => {
  it('renders a select with its options and changes value', () => {
    renderSelect(
      <Select aria-label="Language" defaultValue="en">
        {opts}
      </Select>,
    );
    const el = screen.getByRole('combobox', { name: 'Language' }) as HTMLSelectElement;
    expect(el.value).toBe('en');
    fireEvent.change(el, { target: { value: 'de' } });
    expect(el.value).toBe('de');
  });

  it('shows the header on base only', () => {
    const { rerender } = renderSelect(
      <Select header="Language" aria-label="l">
        {opts}
      </Select>,
      'base',
    );
    expect(screen.getByText('Language')).toBeInTheDocument();
    rerender(
      <TguiProvider platform="ios">
        <Select header="Language" aria-label="l">
          {opts}
        </Select>
      </TguiProvider>,
    );
    expect(screen.queryByText('Language')).toBeNull();
  });

  it('tracks focus and pins status', () => {
    const { wrapper } = renderSelect(<Select aria-label="l">{opts}</Select>);
    const el = screen.getByRole('combobox');
    fireEvent.focus(el);
    expect(wrapper.className).toContain('focused');
    fireEvent.blur(el);
    expect(wrapper.className).not.toContain('focused');
  });

  it('disables and forwards ref', () => {
    const ref = { current: null as HTMLSelectElement | null };
    renderSelect(
      <Select ref={ref} aria-label="l" disabled>
        {opts}
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
