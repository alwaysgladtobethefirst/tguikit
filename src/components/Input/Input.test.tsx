import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Input } from './Input';

function renderInput(ui: ReactNode, platform: TguiPlatform = 'base') {
  const result = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return {
    ...result,
    wrapper: result.container.firstElementChild?.firstElementChild as HTMLElement,
  };
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Input', () => {
  it('renders an input and takes typing', () => {
    renderInput(<Input placeholder="Name" />);
    const el = screen.getByPlaceholderText('Name') as HTMLInputElement;
    expect(el.tagName).toBe('INPUT');
    fireEvent.change(el, { target: { value: 'Ada' } });
    expect(el.value).toBe('Ada');
  });

  it('shows the header as a floating label on base only', () => {
    const { rerender } = renderInput(<Input header="Email" />, 'base');
    expect(screen.getByText('Email')).toBeInTheDocument();

    rerender(
      <TguiProvider platform="ios">
        <Input header="Email" />
      </TguiProvider>,
    );
    expect(screen.queryByText('Email')).toBeNull();
  });

  it('tracks focus and can be pinned with status', () => {
    const { wrapper, rerender } = renderInput(<Input />);
    const el = screen.getByRole('textbox');

    fireEvent.focus(el);
    expect(wrapper.className).toContain('focused');
    fireEvent.blur(el);
    expect(wrapper.className).not.toContain('focused');

    rerender(
      <TguiProvider platform="base">
        <Input status="error" />
      </TguiProvider>,
    );
    expect(wrapper.className).toContain('error');
  });

  it('renders before / after slots', () => {
    renderInput(
      <Input before={<span data-testid="ic" />} after={<button type="button">clear</button>} />,
    );
    expect(screen.getByTestId('ic')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument();
  });

  it('disables and dims', () => {
    const { wrapper } = renderInput(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(wrapper.className).toContain('disabled');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLInputElement | null };
    renderInput(<Input ref={ref} className="field" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
