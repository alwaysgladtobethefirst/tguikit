import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Caption } from './Caption';

describe('Caption', () => {
  it('renders a span at level 1 by default', () => {
    render(<Caption>3:42 PM</Caption>);
    const el = screen.getByText('3:42 PM');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('level-1');
  });

  it('renders level 2 when asked', () => {
    render(<Caption level="2">tiny</Caption>);
    expect(screen.getByText('tiny').className).toContain('level-2');
  });

  it('keeps the level class when Component changes the tag', () => {
    render(
      <Caption level="2" Component="p">
        x
      </Caption>,
    );
    const el = screen.getByText('x');
    expect(el.tagName).toBe('P');
    expect(el.className).toContain('level-2');
  });

  it('inherits Typography weight and caps', () => {
    render(
      <Caption weight="1" caps>
        x
      </Caption>,
    );
    const el = screen.getByText('x');
    expect(el.className).toContain('weight-1');
    expect(el.className).toContain('caps');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Caption ref={ref} className="hint">
        x
      </Caption>,
    );
    expect(ref.current).toBe(screen.getByText('x'));
    expect(screen.getByText('x')).toHaveClass('hint');
  });
});
