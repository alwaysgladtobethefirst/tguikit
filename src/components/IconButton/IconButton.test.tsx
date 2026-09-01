import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { IconButton } from './IconButton';

const Dot = () => <svg viewBox="0 0 4 4" aria-hidden />;

function renderIB(ui: ReactNode) {
  return render(<TguiProvider platform="base">{ui}</TguiProvider>);
}

describe('IconButton', () => {
  it('renders a button with type="button" and fires onClick', () => {
    const onClick = vi.fn();
    renderIB(
      <IconButton aria-label="Add" onClick={onClick}>
        <Dot />
      </IconButton>,
    );
    const el = screen.getByRole('button', { name: 'Add' });
    expect(el).toHaveAttribute('type', 'button');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies mode, size and circle classes', () => {
    renderIB(
      <IconButton aria-label="x" mode="gray" size="l" circle>
        <Dot />
      </IconButton>,
    );
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('mode-gray');
    expect(cls).toContain('l');
    expect(cls).toContain('circle');
  });

  it('renders as another element without a type attribute', () => {
    renderIB(
      <IconButton Component="a" href="/x" aria-label="link">
        <Dot />
      </IconButton>,
    );
    const el = screen.getByRole('link', { name: 'link' });
    expect(el).not.toHaveAttribute('type');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    renderIB(
      <IconButton ref={ref} className="mine" aria-label="x">
        <Dot />
      </IconButton>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toHaveClass('mine');
  });
});
