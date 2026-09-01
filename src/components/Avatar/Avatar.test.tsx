import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is given', () => {
    render(<Avatar data-testid="a" src="/me.png" alt="Me" />);
    const img = screen.getByRole('img', { name: 'Me' });
    expect(img).toHaveAttribute('src', '/me.png');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('falls back to the acronym when the image fails', () => {
    render(<Avatar data-testid="a" src="/broken.png" alt="Jane Doe" acronym="JD" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByTestId('a')).toHaveTextContent('JD');
  });

  it('falls back to the acronym when there is no src', () => {
    render(<Avatar acronym="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders the person icon with neither src nor acronym', () => {
    const { container } = render(<Avatar data-testid="a" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the size class', () => {
    render(<Avatar data-testid="a" size={96} />);
    expect(screen.getByTestId('a').className).toContain('s96');
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Avatar ref={ref} className="mine" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveClass('mine');
  });
});
