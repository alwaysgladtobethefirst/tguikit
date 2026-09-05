import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Popover } from './Popover';

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

const tick = () => act(() => new Promise((resolve) => setTimeout(resolve, 0)));

function renderPopover(props: Partial<React.ComponentProps<typeof Popover>> = {}) {
  return render(
    <TguiProvider>
      <Popover {...props}>
        <Popover.Trigger>
          <button type="button">Open</button>
        </Popover.Trigger>
        <Popover.Content>
          <button type="button">Inside</button>
        </Popover.Content>
      </Popover>
    </TguiProvider>,
  );
}

describe('Popover', () => {
  it('renders the trigger and keeps the content out of the document until opened', () => {
    renderPopover();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens on trigger click', async () => {
    renderPopover();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes on a second trigger click', async () => {
    renderPopover();
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(trigger);
    await tick();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape', async () => {
    renderPopover();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    await tick();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes on an outside click', async () => {
    renderPopover();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.pointerDown(document.body, { button: 0 });
    fireEvent.click(document.body);
    await tick();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('does not flicker back open when the trigger is clicked again while open (deferred outside dismiss)', async () => {
    renderPopover();
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.pointerDown(trigger, { button: 0 });
    fireEvent.click(trigger);
    await tick();

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('works as an uncontrolled component', async () => {
    renderPopover();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('works as a controlled component', async () => {
    const onOpenChange = vi.fn();

    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <TguiProvider>
          <Popover
            open={open}
            onOpenChange={(next) => {
              onOpenChange(next);
              setOpen(next);
            }}
          >
            <Popover.Trigger>
              <button type="button">Open</button>
            </Popover.Trigger>
            <Popover.Content>
              <button type="button">Inside</button>
            </Popover.Content>
          </Popover>
        </TguiProvider>
      );
    }

    render(<Controlled />);
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('moves focus into the content when it opens', async () => {
    renderPopover();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await tick();
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
