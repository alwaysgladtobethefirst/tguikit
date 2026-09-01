import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is visible and aria-hidden by default', () => {
    render(<Skeleton data-testid="s" />);
    const el = screen.getByTestId('s');
    expect(el.className).toContain('visible');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows children and drops the shimmer when not visible', () => {
    render(
      <Skeleton data-testid="s" visible={false}>
        <span>real content</span>
      </Skeleton>,
    );
    const el = screen.getByTestId('s');
    expect(el.className).not.toContain('visible');
    expect(el).not.toHaveAttribute('aria-hidden');
    expect(screen.getByText('real content')).toBeInTheDocument();
  });

  it('forwards ref, className and style', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Skeleton ref={ref} className="mine" style={{ width: 120 }} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
    expect(ref.current).toHaveStyle({ width: '120px' });
  });
});
