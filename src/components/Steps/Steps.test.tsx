import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Steps } from './Steps';

describe('Steps', () => {
  it('exposes the progressbar role and value', () => {
    render(<Steps count={4} progress={1.5} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '1.5');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '4');
  });

  it('renders one segment per count', () => {
    const { container } = render(<Steps count={5} progress={0} />);
    expect(container.querySelectorAll('[role="progressbar"] > div')).toHaveLength(5);
  });

  it('fills each segment relative to progress', () => {
    const { container } = render(<Steps count={3} progress={1.5} />);
    const fills = container.querySelectorAll('[role="progressbar"] > div > div');
    expect((fills[0] as HTMLElement).style.width).toBe('100%');
    expect((fills[1] as HTMLElement).style.width).toBe('50%');
    expect((fills[2] as HTMLElement).style.width).toBe('0%');
  });

  it('clamps progress to the valid range', () => {
    render(<Steps count={3} progress={10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Steps ref={ref} className="mine" count={2} progress={0} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });
});
