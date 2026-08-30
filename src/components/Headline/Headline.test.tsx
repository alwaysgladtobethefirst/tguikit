import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Headline } from './Headline';

describe('Headline', () => {
  it('renders an h5 carrying the headline class', () => {
    render(<Headline>Section</Headline>);
    const el = screen.getByRole('heading', { level: 5, name: 'Section' });
    expect(el.className).toContain('headline');
  });

  it('renders as another element when Component is set', () => {
    render(<Headline Component="span">x</Headline>);
    expect(screen.getByText('x').tagName).toBe('SPAN');
  });

  it('inherits Typography weight and caps', () => {
    render(
      <Headline weight="1" caps>
        x
      </Headline>,
    );
    const el = screen.getByRole('heading');
    expect(el.className).toContain('weight-1');
    expect(el.className).toContain('caps');
  });

  it('forwards ref and merges className', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Headline ref={ref} className="lead">
        x
      </Headline>,
    );
    expect(ref.current).toBe(screen.getByRole('heading'));
    expect(screen.getByRole('heading')).toHaveClass('lead');
  });
});
