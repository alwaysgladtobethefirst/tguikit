import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('exposes the progressbar role and value', () => {
    render(<CircularProgress value={60} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '60');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<CircularProgress value={-5} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    rerender(<CircularProgress value={200} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('drives the indicator dash offset from the value', () => {
    const { container } = render(<CircularProgress value={0} size="m" />);
    const indicator = container.querySelectorAll('circle')[1] as SVGCircleElement;
    const dashArray = Number(indicator.getAttribute('stroke-dasharray'));
    const dashOffset = Number(indicator.getAttribute('stroke-dashoffset'));
    expect(dashOffset).toBeCloseTo(dashArray);
  });

  it('renders larger for size l', () => {
    const { container } = render(<CircularProgress value={50} size="l" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '36');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<CircularProgress ref={ref} className="mine" value={10} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass('mine');
  });
});
