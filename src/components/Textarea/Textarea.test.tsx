import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Textarea } from './Textarea';

function renderTextarea(ui: ReactNode, platform: TguiPlatform = 'base') {
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

describe('Textarea', () => {
  it('renders a textarea and takes typing', () => {
    renderTextarea(<Textarea placeholder="Bio" />);
    const el = screen.getByPlaceholderText('Bio') as HTMLTextAreaElement;
    expect(el.tagName).toBe('TEXTAREA');
    fireEvent.change(el, { target: { value: 'hi' } });
    expect(el.value).toBe('hi');
  });

  it('shows the header on base only', () => {
    renderTextarea(<Textarea header="About" />, 'base');
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('tracks focus and pins with status', () => {
    const { wrapper, rerender } = renderTextarea(<Textarea />);
    const el = screen.getByRole('textbox');
    fireEvent.focus(el);
    expect(wrapper.className).toContain('focused');
    fireEvent.blur(el);
    expect(wrapper.className).not.toContain('focused');
    rerender(
      <TguiProvider platform="base">
        <Textarea status="error" />
      </TguiProvider>,
    );
    expect(wrapper.className).toContain('error');
  });

  it('disables', () => {
    renderTextarea(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    renderTextarea(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
