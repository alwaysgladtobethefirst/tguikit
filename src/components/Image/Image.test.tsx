import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Image } from './Image';

describe('Image', () => {
  it('renders an img with the src and alt', () => {
    render(<Image src="/photo.jpg" alt="A photo" size={80} />);
    expect(screen.getByRole('img', { name: 'A photo' })).toHaveAttribute('src', '/photo.jpg');
  });

  it('shows the shimmer placeholder until the image loads', () => {
    const { container } = render(<Image src="/photo.jpg" alt="" />);
    expect(container.querySelector('[class*="placeholder"]')).not.toBeNull();
    fireEvent.load(container.querySelector('img') as HTMLImageElement);
    expect(container.querySelector('[class*="placeholder"]')).toBeNull();
  });

  it('swaps to the fallback on error', () => {
    const { container } = render(
      <Image src="/broken.jpg" alt="" fallback={<span data-testid="fb">gone</span>} />,
    );
    fireEvent.error(container.querySelector('img') as HTMLImageElement);
    expect(screen.getByTestId('fb')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('applies size, radius and fit', () => {
    const { container } = render(
      <Image src="/p.jpg" alt="" size={64} radius="full" fit="contain" />,
    );
    const frame = container.firstElementChild as HTMLElement;
    expect(frame.style.width).toBe('64px');
    expect(frame.style.borderRadius).toBe('50%');
    expect(frame.style.getPropertyValue('--tgui--image--fit')).toBe('contain');
  });

  it('forwards ref to the img', () => {
    const ref = { current: null as HTMLImageElement | null };
    render(<Image ref={ref} src="/p.jpg" alt="" />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});
