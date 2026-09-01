import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Tooltip } from './Tooltip';

const renderTooltip = (ui: React.ReactNode) => render(<TguiProvider>{ui}</TguiProvider>);

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Tooltip', () => {
  it('is hidden until the trigger is hovered', () => {
    renderTooltip(
      <Tooltip content="Saved to favourites">
        <button type="button">Star</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.pointerEnter(screen.getByRole('button'), { pointerType: 'mouse' });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Saved to favourites');
  });

  it('hides again on pointer leave', () => {
    renderTooltip(
      <Tooltip content="Hi">
        <span>trigger</span>
      </Tooltip>,
    );
    const trigger = screen.getByText('trigger').parentElement as HTMLElement;
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.pointerLeave(trigger, { pointerType: 'mouse' });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('opens on focus and links via aria-describedby', () => {
    renderTooltip(
      <Tooltip content="Details">
        <button type="button">Info</button>
      </Tooltip>,
    );
    const button = screen.getByRole('button');
    fireEvent.focus(button);
    const tip = screen.getByRole('tooltip');
    expect(button.parentElement).toHaveAttribute('aria-describedby', tip.id);
    fireEvent.blur(button);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('respects the controlled open prop', async () => {
    const { rerender } = renderTooltip(
      <Tooltip open content="Controlled">
        <span>x</span>
      </Tooltip>,
    );
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    rerender(
      <TguiProvider>
        <Tooltip open={false} content="Controlled">
          <span>x</span>
        </Tooltip>
      </TguiProvider>,
    );
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});
