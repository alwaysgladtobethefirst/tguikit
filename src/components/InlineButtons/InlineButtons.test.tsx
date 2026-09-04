import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { InlineButtons } from './InlineButtons';
import { InlineButtonsItem } from './InlineButtonsItem';

const Icon = () => <svg viewBox="0 0 24 24" aria-hidden />;

function renderInline(ui: ReactNode) {
  return render(<TguiProvider platform="base">{ui}</TguiProvider>);
}

describe('InlineButtons', () => {
  it('renders a group of labelled items', () => {
    renderInline(
      <InlineButtons>
        <InlineButtonsItem icon={<Icon />}>Call</InlineButtonsItem>
        <InlineButtonsItem icon={<Icon />}>Mute</InlineButtonsItem>
      </InlineButtons>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Call' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
  });

  it('defaults to bezeled mode and applies the given mode class', () => {
    renderInline(
      <InlineButtons mode="gray" data-testid="group">
        <InlineButtonsItem icon={<Icon />}>Call</InlineButtonsItem>
      </InlineButtons>,
    );
    expect(screen.getByRole('button', { name: 'Call' }).className).toContain('mode-gray');
  });

  it('fires onClick and respects disabled', () => {
    const onClick = vi.fn();
    renderInline(
      <InlineButtons>
        <InlineButtonsItem icon={<Icon />} onClick={onClick}>
          Call
        </InlineButtonsItem>
        <InlineButtonsItem icon={<Icon />} disabled>
          Mute
        </InlineButtonsItem>
      </InlineButtons>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Call' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Mute' })).toBeDisabled();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLDivElement | null };
    renderInline(
      <InlineButtons ref={ref} className="mine">
        <InlineButtonsItem icon={<Icon />}>Call</InlineButtonsItem>
      </InlineButtons>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });
});
