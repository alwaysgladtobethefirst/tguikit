import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders the text slots', () => {
    render(
      <Banner
        callout="New"
        header="Premium is here"
        subheader="Faster downloads and more"
        description="Try it free for a week."
      />,
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Premium is here')).toBeInTheDocument();
    expect(screen.getByText('Faster downloads and more')).toBeInTheDocument();
    expect(screen.getByText('Try it free for a week.')).toBeInTheDocument();
  });

  it('defaults to the section type', () => {
    render(<Banner data-testid="b" header="Hi" />);
    expect(screen.getByTestId('b').className).toContain('type-section');
  });

  it('renders the background only for the image type', () => {
    const bg = <img alt="" data-testid="bg" src="/x.jpg" />;
    const { container, rerender } = render(<Banner data-testid="b" header="Hi" background={bg} />);
    expect(container.querySelector('img')).toBeNull();
    rerender(<Banner data-testid="b" type="image" header="Hi" background={bg} />);
    expect(container.querySelector('img')).not.toBeNull();
    expect(screen.getByTestId('b').className).toContain('type-image');
  });

  it('fires onClose from the close button', () => {
    const onClose = vi.fn();
    render(<Banner header="Hi" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    render(<Banner ref={ref} className="mine" header="Hi" />);
    expect(ref.current?.tagName).toBe('SECTION');
    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass('mine');
  });
});
