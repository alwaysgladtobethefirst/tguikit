import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Card } from './Card';

function renderCard(ui: ReactNode) {
  return render(<TguiProvider platform="base">{ui}</TguiProvider>);
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Card', () => {
  it('renders an article with the card class', () => {
    const { container } = renderCard(<Card>content</Card>);
    const el = container.querySelector('article');
    expect(el).toBeInTheDocument();
    expect(el?.className).toContain('card');
  });

  it('applies the ambient style to the card and its cells', () => {
    const { container } = renderCard(
      <Card type="ambient">
        <Card.Cell subtitle="A place">Title</Card.Cell>
      </Card>,
    );
    expect(container.querySelector('article')?.className).toContain('cardAmbient');
    expect(container.querySelector('[class*="cellAmbient"]')).toBeInTheDocument();
  });

  it('renders Card.Cell content through the underlying Cell', () => {
    renderCard(
      <Card>
        <Card.Cell subtitle="Warm and sunny">Weather</Card.Cell>
      </Card>,
    );
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Warm and sunny')).toBeInTheDocument();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    renderCard(
      <Card ref={ref} className="promo">
        x
      </Card>,
    );
    expect(ref.current?.tagName).toBe('ARTICLE');
    expect(ref.current).toHaveClass('promo');
  });
});
