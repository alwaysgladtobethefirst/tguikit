import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FixedLayout } from './FixedLayout';

describe('FixedLayout', () => {
  it('pins to the bottom by default', () => {
    render(<FixedLayout data-testid="fl">actions</FixedLayout>);
    expect(screen.getByTestId('fl').className).toContain('bottom');
  });

  it('pins to the top when asked', () => {
    render(
      <FixedLayout data-testid="fl" vertical="top">
        header
      </FixedLayout>,
    );
    const cls = screen.getByTestId('fl').className;
    expect(cls).toContain('top');
    expect(cls).not.toContain('bottom');
  });

  it('forwards ref, className and children', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <FixedLayout ref={ref} className="mine">
        content
      </FixedLayout>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
    expect(ref.current).toHaveTextContent('content');
  });
});
