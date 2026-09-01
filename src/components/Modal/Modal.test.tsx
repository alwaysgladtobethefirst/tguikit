import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Modal } from './Modal';

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

function renderModal(props: Partial<ComponentProps<typeof Modal>> = {}) {
  const onClose = vi.fn();
  const result = render(
    <TguiProvider>
      <Modal open onClose={onClose} header="Sheet" {...props}>
        <p>Body copy</p>
      </Modal>
    </TguiProvider>,
  );
  return { onClose, ...result };
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <TguiProvider>
        <Modal open={false} onClose={vi.fn()} header="Sheet">
          <p>Body copy</p>
        </Modal>
      </TguiProvider>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders a modal dialog with header and body when open', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('Sheet');
    expect(dialog).toHaveTextContent('Body copy');
  });

  it('closes on Escape', () => {
    const { onClose } = renderModal();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on the close button', () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = renderModal();
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('hides the close button and ignores Escape when not dismissable', () => {
    const { onClose } = renderModal({ dismissable: false });
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
});
