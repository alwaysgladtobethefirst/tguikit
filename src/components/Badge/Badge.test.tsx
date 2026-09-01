import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the count for a number badge', () => {
    render(<Badge data-testid="b">7</Badge>);
    expect(screen.getByTestId('b')).toHaveTextContent('7');
    expect(screen.getByTestId('b').className).toContain('number');
  });

  it('drops children for a dot badge', () => {
    render(
      <Badge data-testid="b" type="dot">
        99
      </Badge>,
    );
    expect(screen.getByTestId('b')).toHaveTextContent('');
    expect(screen.getByTestId('b').className).toContain('dot');
  });

  it('applies mode and large classes', () => {
    render(
      <Badge data-testid="b" mode="critical" large>
        3
      </Badge>,
    );
    const cls = screen.getByTestId('b').className;
    expect(cls).toContain('mode-critical');
    expect(cls).toContain('large');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(
      <Badge ref={ref} className="mine">
        1
      </Badge>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass('mine');
  });
});
