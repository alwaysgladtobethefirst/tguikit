import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a status role with a default label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading');
  });

  it('applies the size class, m by default', () => {
    const { rerender } = render(<Spinner data-testid="s" />);
    expect(screen.getByTestId('s').className).toContain('m');
    rerender(<Spinner data-testid="s" size="l" />);
    expect(screen.getByTestId('s').className).toContain('l');
  });

  it('forwards ref, className and a custom label', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Spinner ref={ref} className="mine" aria-label="Saving" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass('mine');
    expect(screen.getByRole('status')).toHaveAccessibleName('Saving');
  });
});
