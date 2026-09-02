import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Blockquote } from './Blockquote';

describe('Blockquote', () => {
  it('renders the quoted text', () => {
    render(<Blockquote>Ship early, ship often.</Blockquote>);
    expect(screen.getByText('Ship early, ship often.').tagName).toBe('BLOCKQUOTE');
  });

  it('renders the author line when given', () => {
    render(<Blockquote author="— Pavel">Delete the sign-up form.</Blockquote>);
    expect(screen.getByText('— Pavel').tagName).toBe('CITE');
  });

  it('omits the author element when not given', () => {
    const { container } = render(<Blockquote>Just the quote.</Blockquote>);
    expect(container.querySelector('cite')).toBeNull();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLQuoteElement | null };
    render(
      <Blockquote ref={ref} className="mine">
        Q
      </Blockquote>,
    );
    expect(ref.current?.tagName).toBe('BLOCKQUOTE');
    expect(ref.current).toHaveClass('mine');
  });
});
