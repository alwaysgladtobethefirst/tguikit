import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox that toggles', () => {
    render(<Checkbox aria-label="Agree" />);
    const el = screen.getByRole('checkbox', { name: 'Agree' }) as HTMLInputElement;
    expect(el.checked).toBe(false);
    fireEvent.click(el);
    expect(el.checked).toBe(true);
  });

  it('reflects the indeterminate prop onto the input', () => {
    const { rerender } = render(<Checkbox aria-label="x" indeterminate />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);

    rerender(<Checkbox aria-label="x" indeterminate={false} />);
    expect((screen.getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(false);
  });

  it('supports a controlled checked value and onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox aria-label="x" checked readOnly onChange={onChange} />);
    const el = screen.getByRole('checkbox') as HTMLInputElement;
    expect(el.checked).toBe(true);
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalled();
  });

  it('disables', () => {
    render(<Checkbox aria-label="x" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox').parentElement).toHaveAttribute('data-disabled');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox ref={ref} aria-label="x" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
