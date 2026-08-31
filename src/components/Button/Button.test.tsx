import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Button } from './Button';

function renderButton(ui: ReactNode, platform: TguiPlatform = 'base') {
  return render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Button', () => {
  it('renders a real button with type="button" and the label', () => {
    renderButton(<Button>Save</Button>);
    const el = screen.getByRole('button', { name: 'Save' });
    expect(el.tagName).toBe('BUTTON');
    expect(el).toHaveAttribute('type', 'button');
  });

  it('defaults to filled / medium', () => {
    renderButton(<Button>x</Button>);
    const el = screen.getByRole('button');
    expect(el.className).toContain('mode-filled');
    expect(el.className).toContain('size-m');
  });

  it.each(['bezeled', 'plain', 'gray', 'outline', 'white'] as const)('applies mode %s', (mode) => {
    renderButton(<Button mode={mode}>x</Button>);
    expect(screen.getByRole('button').className).toContain(`mode-${mode}`);
  });

  it.each(['s', 'm', 'l'] as const)('applies size %s', (size) => {
    renderButton(<Button size={size}>x</Button>);
    expect(screen.getByRole('button').className).toContain(`size-${size}`);
  });

  it('stretches when asked', () => {
    renderButton(<Button stretched>x</Button>);
    expect(screen.getByRole('button').className).toContain('stretched');
  });

  it('shows a spinner and marks itself busy while loading', () => {
    const { container } = renderButton(<Button loading>Save</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('aria-busy', 'true');
    expect(el.className).toContain('loading');
    expect(container.querySelector('[class*="spinner"]')).toBeInTheDocument();
  });

  it('renders before and after slots', () => {
    renderButton(
      <Button before={<span data-testid="ic-before" />} after={<span data-testid="ic-after" />}>
        x
      </Button>,
    );
    expect(screen.getByTestId('ic-before')).toBeInTheDocument();
    expect(screen.getByTestId('ic-after')).toBeInTheDocument();
  });

  it('renders as another element without forcing a type attribute', () => {
    renderButton(
      <Button Component="a" href="/x">
        link
      </Button>,
    );
    const el = screen.getByRole('link', { name: 'link' });
    expect(el.tagName).toBe('A');
    expect(el).not.toHaveAttribute('type');
  });

  it('passes disabled through to the element', () => {
    renderButton(<Button disabled>x</Button>);
    const el = screen.getByRole('button');
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('data-disabled');
  });

  it('forwards ref, className and click handlers', () => {
    const ref = { current: null as HTMLElement | null };
    const onClick = vi.fn();
    renderButton(
      <Button ref={ref} className="cta" onClick={onClick}>
        x
      </Button>,
    );
    const el = screen.getByRole('button');
    expect(ref.current).toBe(el);
    expect(el).toHaveClass('cta');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders the large label with Text and smaller sizes with Subheadline', () => {
    const { rerender } = renderButton(<Button size="l">x</Button>);
    expect(screen.getByText('x').parentElement?.className).toContain('text');

    rerender(
      <TguiProvider platform="base">
        <Button size="s">x</Button>
      </TguiProvider>,
    );
    expect(screen.getByText('x').parentElement?.className).toContain('level-2');
  });
});
