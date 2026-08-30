import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Subheadline } from './Subheadline';

describe('Subheadline', () => {
  it('renders an h6 at level 1 by default', () => {
    render(<Subheadline>Recent</Subheadline>);
    const el = screen.getByRole('heading', { level: 6, name: 'Recent' });
    expect(el.className).toContain('level-1');
  });

  it('renders level 2 when asked', () => {
    render(<Subheadline level="2">smaller</Subheadline>);
    expect(screen.getByRole('heading', { level: 6 }).className).toContain('level-2');
  });

  it('keeps the level class when Component changes the tag', () => {
    render(
      <Subheadline level="2" Component="span">
        x
      </Subheadline>,
    );
    const el = screen.getByText('x');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('level-2');
  });

  it('inherits Typography weight and caps', () => {
    render(
      <Subheadline weight="1" caps>
        x
      </Subheadline>,
    );
    const el = screen.getByRole('heading');
    expect(el.className).toContain('weight-1');
    expect(el.className).toContain('caps');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Subheadline ref={ref} className="group-label">
        x
      </Subheadline>,
    );
    expect(ref.current).toBe(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toHaveClass('group-label');
  });
});
