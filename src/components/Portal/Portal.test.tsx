import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Portal } from './Portal';

describe('Portal', () => {
  it('renders children into the provider wrapper', () => {
    const { container } = render(
      <TguiProvider>
        <Portal>
          <span data-testid="p">hi</span>
        </Portal>
      </TguiProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toContainElement(screen.getByTestId('p'));
  });

  it('renders into an explicit container when given', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    render(
      <TguiProvider>
        <Portal container={target}>
          <span data-testid="p">hi</span>
        </Portal>
      </TguiProvider>,
    );
    expect(target).toContainElement(screen.getByTestId('p'));
    target.remove();
  });

  it('removes the portaled content on unmount', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const { unmount } = render(
      <TguiProvider>
        <Portal container={target}>
          <span data-testid="p">hi</span>
        </Portal>
      </TguiProvider>,
    );
    expect(screen.getByTestId('p')).toBeInTheDocument();
    unmount();
    expect(screen.queryByTestId('p')).toBeNull();
    target.remove();
  });
});
