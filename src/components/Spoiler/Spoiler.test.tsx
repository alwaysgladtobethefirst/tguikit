import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Spoiler } from './Spoiler';

describe('Spoiler', () => {
  it('hides its content behind a labelled button', () => {
    render(<Spoiler>the ending</Spoiler>);
    const button = screen.getByRole('button', { name: 'Reveal hidden text' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('the ending')).toHaveAttribute('aria-hidden', 'true');
  });

  it('reveals on click and toggles back', () => {
    render(<Spoiler>secret</Spoiler>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('secret')).toHaveAttribute('aria-hidden', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('reveals on Enter and Space', () => {
    render(<Spoiler>x</Spoiler>);
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(button, { key: ' ' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('supports a controlled revealed prop', () => {
    const onRevealedChange = vi.fn();
    render(
      <Spoiler revealed onRevealedChange={onRevealedChange}>
        shown
      </Spoiler>,
    );
    expect(screen.getByText('shown')).toHaveAttribute('aria-hidden', 'false');
    fireEvent.click(screen.getByRole('button'));
    expect(onRevealedChange).toHaveBeenCalledWith(false);
  });
});
