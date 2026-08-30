import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders an hr with the divider class', () => {
    render(<Divider data-testid="d" />);
    const el = screen.getByTestId('d');
    expect(el.tagName).toBe('HR');
    expect(el.className).toContain('divider');
  });

  it('forwards ref, className and props', () => {
    const ref = { current: null as HTMLHRElement | null };
    render(<Divider ref={ref} className="inset" aria-hidden />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
    expect(ref.current).toHaveClass('inset');
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
  });
});
