import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('renders a radiogroup of stars by default', () => {
    render(<Rating aria-label="Rate" count={5} />);
    expect(screen.getByRole('radiogroup', { name: 'Rate' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('selects a value on click (uncontrolled)', () => {
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '4' }));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('radio', { name: '4' })).toHaveAttribute('aria-checked', 'true');
  });

  it('moves the value with arrow keys', () => {
    render(<Rating defaultValue={2} />);
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: '3' })).toHaveAttribute('aria-checked', 'true');
  });

  it('is a non-interactive image with a label in readOnly mode', () => {
    render(<Rating readOnly value={3.5} count={5} aria-label="Score" />);
    expect(screen.queryByRole('radiogroup')).toBeNull();
    expect(screen.getByRole('img', { name: 'Score: 3.5 out of 5' })).toBeInTheDocument();
  });

  it('does not change when disabled', () => {
    const onChange = vi.fn();
    render(<Rating disabled defaultValue={1} onChange={onChange} />);
    expect(screen.queryByRole('radio')).toBeNull();
    fireEvent.keyDown(screen.getByRole('img'), { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
