import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Title } from './Title';

describe('Title', () => {
  it('defaults to level 2 (h3)', () => {
    render(<Title>Section</Title>);
    const el = screen.getByRole('heading', { level: 3, name: 'Section' });
    expect(el.className).toContain('level-2');
  });

  it.each([
    ['1', 2, 'level-1'],
    ['2', 3, 'level-2'],
    ['3', 4, 'level-3'],
  ] as const)('renders level %s as an h%d with the matching class', (level, tag, cls) => {
    render(<Title level={level}>x</Title>);
    const el = screen.getByRole('heading', { level: tag });
    expect(el.className).toContain(cls);
  });

  it('lets Component override the heading tag but keeps the level class', () => {
    render(
      <Title level="1" Component="div">
        x
      </Title>,
    );
    const el = screen.getByText('x');
    expect(el.tagName).toBe('DIV');
    expect(el.className).toContain('level-1');
  });

  it('inherits Typography weight and caps', () => {
    render(
      <Title weight="1" caps>
        x
      </Title>,
    );
    const el = screen.getByRole('heading');
    expect(el.className).toContain('weight-1');
    expect(el.className).toContain('caps');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Title ref={ref} className="hero">
        x
      </Title>,
    );
    expect(ref.current).toBe(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toHaveClass('hero');
  });
});
