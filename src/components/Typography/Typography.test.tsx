import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders a span by default', () => {
    render(<Typography>hello</Typography>);
    expect(screen.getByText('hello').tagName).toBe('SPAN');
  });

  it('renders the Component it is given', () => {
    render(<Typography Component="h1">title</Typography>);
    expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument();
  });

  it('defaults to weight 3', () => {
    render(<Typography>x</Typography>);
    expect(screen.getByText('x').className).toContain('weight-3');
  });

  it.each([
    ['1', 'weight-1'],
    ['2', 'weight-2'],
    ['3', 'weight-3'],
  ] as const)('maps weight %s to %s', (weight, expected) => {
    render(<Typography weight={weight}>x</Typography>);
    expect(screen.getByText('x').className).toContain(expected);
  });

  it('adds the caps class only when caps is set', () => {
    const { rerender } = render(<Typography>x</Typography>);
    expect(screen.getByText('x').className).not.toContain('caps');

    rerender(<Typography caps>x</Typography>);
    expect(screen.getByText('x').className).toContain('caps');
  });

  it('forwards ref, className and arbitrary props', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Typography ref={ref} className="custom" id="t" data-role="label">
        x
      </Typography>,
    );
    const el = screen.getByText('x');
    expect(ref.current).toBe(el);
    expect(el).toHaveClass('custom');
    expect(el).toHaveAttribute('id', 't');
    expect(el).toHaveAttribute('data-role', 'label');
  });
});
