import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LargeTitle } from './LargeTitle';

describe('LargeTitle', () => {
  it('renders an h1 carrying the large-title class', () => {
    render(<LargeTitle>Settings</LargeTitle>);
    const el = screen.getByRole('heading', { level: 1, name: 'Settings' });
    expect(el.className).toContain('large-title');
  });

  it('is bold (weight 1) by default, overridable', () => {
    const { rerender } = render(<LargeTitle>x</LargeTitle>);
    expect(screen.getByRole('heading').className).toContain('weight-1');

    rerender(<LargeTitle weight="3">x</LargeTitle>);
    expect(screen.getByRole('heading').className).toContain('weight-3');
  });

  it('renders as another element when Component is set', () => {
    render(<LargeTitle Component="span">x</LargeTitle>);
    expect(screen.getByText('x').tagName).toBe('SPAN');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <LargeTitle ref={ref} className="page-title">
        x
      </LargeTitle>,
    );
    expect(ref.current).toBe(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toHaveClass('page-title');
  });
});
