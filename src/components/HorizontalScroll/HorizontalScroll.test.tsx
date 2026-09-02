import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HorizontalScroll } from './HorizontalScroll';

beforeEach(() => {
  // @ts-expect-error - jsdom has no ResizeObserver
  globalThis.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
});

const items = ['one', 'two', 'three', 'four', 'five', 'six'].map((name, i) => (
  <div key={name} style={{ width: 120 }}>
    Item {i + 1}
  </div>
));

describe('HorizontalScroll', () => {
  it('renders its children in a scroller', () => {
    render(<HorizontalScroll data-testid="hs">{items}</HorizontalScroll>);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 6')).toBeInTheDocument();
  });

  it('marks the edge state for the fade mask', () => {
    render(<HorizontalScroll data-testid="hs">{items}</HorizontalScroll>);
    const wrapper = screen.getByTestId('hs');
    expect(wrapper).toHaveAttribute('data-start', 'false');
    expect(wrapper).toHaveAttribute('data-end', 'false');
  });

  it('omits the edge attributes when fade is off', () => {
    render(
      <HorizontalScroll data-testid="hs" fade={false}>
        {items}
      </HorizontalScroll>,
    );
    const wrapper = screen.getByTestId('hs');
    expect(wrapper).not.toHaveAttribute('data-start');
  });

  it('drag-scrolls with a mouse pointer', () => {
    const { container } = render(<HorizontalScroll>{items}</HorizontalScroll>);
    const scroller = container.querySelector('[class*="scroller"]') as HTMLElement;
    scroller.setPointerCapture = vi.fn();
    Object.defineProperty(scroller, 'scrollLeft', { value: 0, writable: true });
    fireEvent.pointerDown(scroller, { pointerType: 'mouse', button: 0, clientX: 200 });
    fireEvent.pointerMove(scroller, { pointerType: 'mouse', clientX: 140, pointerId: 1 });
    expect(scroller.scrollLeft).toBe(60);
    fireEvent.pointerUp(scroller, { pointerId: 1 });
  });

  it('adds the snap class when snap is set', () => {
    const { container } = render(<HorizontalScroll snap>{items}</HorizontalScroll>);
    expect(container.querySelector('[class*="scroller"]')?.className).toContain('snap');
  });
});
