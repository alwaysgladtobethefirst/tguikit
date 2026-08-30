import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders a span carrying the text class', () => {
    render(<Text>body copy</Text>);
    const el = screen.getByText('body copy');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('text');
  });

  it('inherits Typography weight and caps', () => {
    render(
      <Text weight="1" caps>
        loud
      </Text>,
    );
    const el = screen.getByText('loud');
    expect(el.className).toContain('weight-1');
    expect(el.className).toContain('caps');
  });

  it('renders as another element when Component is set', () => {
    render(<Text Component="p">para</Text>);
    expect(screen.getByText('para').tagName).toBe('P');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Text ref={ref} className="lead">
        x
      </Text>,
    );
    expect(ref.current).toBe(screen.getByText('x'));
    expect(screen.getByText('x')).toHaveClass('lead');
  });
});
