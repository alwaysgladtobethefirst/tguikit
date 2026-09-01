import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Sheet } from './Sheet';

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

function renderSheet(props: Partial<ComponentProps<typeof Sheet>> = {}) {
  const onClose = vi.fn();
  const result = render(
    <TguiProvider>
      <Sheet open onClose={onClose} header="Sheet" {...props}>
        <p>Body copy</p>
      </Sheet>
    </TguiProvider>,
  );
  return { onClose, ...result };
}

describe('Sheet', () => {
  it('renders nothing when closed', () => {
    render(
      <TguiProvider>
        <Sheet open={false} onClose={vi.fn()} header="Sheet">
          <p>Body copy</p>
        </Sheet>
      </TguiProvider>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders a sheet dialog with header and body when open', () => {
    renderSheet();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('Sheet');
    expect(dialog).toHaveTextContent('Body copy');
  });

  it('closes on Escape', () => {
    const { onClose } = renderSheet();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on the close button', () => {
    const { onClose } = renderSheet();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = renderSheet();
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('hides the close button and ignores Escape when not dismissable', () => {
    const { onClose } = renderSheet({ dismissable: false });
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
});
