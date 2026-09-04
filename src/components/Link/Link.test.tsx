import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders an anchor with its href and text', () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveAttribute('href', '/docs');
  });

  it('adds a safe rel and an icon for target=_blank', () => {
    const { container } = render(
      <Link href="https://telegram.org" target="_blank">
        Telegram
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('keeps an explicit rel and stays icon-free for internal links', () => {
    const { container } = render(
      <Link href="/x" target="_blank" rel="nofollow">
        X
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'nofollow');
    render(<Link href="/y">Y</Link>);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLAnchorElement | null };
    render(
      <Link ref={ref} href="/z" className="mine">
        Z
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toHaveClass('mine');
  });
});
