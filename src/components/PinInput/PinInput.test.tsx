import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PinInput } from './PinInput';

const cells = () => screen.getAllByRole('textbox') as HTMLInputElement[];

describe('PinInput', () => {
  it('renders one cell per length', () => {
    render(<PinInput length={6} />);
    expect(cells()).toHaveLength(6);
  });

  it('types a digit, auto-advances and reports the value', () => {
    const onChange = vi.fn();
    render(<PinInput length={4} type="numeric" onChange={onChange} />);
    const [c0, c1] = cells();
    fireEvent.change(c0, { target: { value: '1' } });
    expect(onChange).toHaveBeenLastCalledWith('1');
    expect(c1).toHaveFocus();
  });

  it('rejects characters that do not match the type', () => {
    const onChange = vi.fn();
    render(<PinInput type="numeric" onChange={onChange} />);
    fireEvent.change(cells()[0], { target: { value: 'a' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('backspace clears the current cell then steps back', () => {
    render(<PinInput length={3} defaultValue="12" />);
    const [c0, c1, c2] = cells();
    c2.focus();
    fireEvent.keyDown(c2, { key: 'Backspace' });
    // c2 was empty -> clears c1 and moves focus
    expect(c1).toHaveFocus();
    expect(c1.value).toBe('');
    fireEvent.keyDown(c1, { key: 'Backspace' });
    expect(c0.value).toBe('');
  });

  it('fills from a paste and fires onComplete', () => {
    const onComplete = vi.fn();
    render(<PinInput length={4} onComplete={onComplete} />);
    fireEvent.paste(cells()[0], { clipboardData: { getData: () => '4821' } });
    expect(cells().map((c) => c.value)).toEqual(['4', '8', '2', '1']);
    expect(onComplete).toHaveBeenCalledWith('4821');
  });

  it('masks with a password type', () => {
    const { container } = render(<PinInput mask />);
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(container.querySelectorAll('input[type="password"]')).toHaveLength(4);
  });
});
