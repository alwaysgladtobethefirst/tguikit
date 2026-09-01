import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders a radio input and selects on click', () => {
    render(<Radio aria-label="One" value="1" name="n" />);
    const el = screen.getByRole('radio', { name: 'One' }) as HTMLInputElement;
    expect(el.checked).toBe(false);
    fireEvent.click(el);
    expect(el.checked).toBe(true);
  });

  it('groups by name — selecting one clears the other', () => {
    render(
      <>
        <Radio aria-label="A" name="g" value="a" defaultChecked />
        <Radio aria-label="B" name="g" value="b" />
      </>,
    );
    const [a, b] = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(a.checked).toBe(true);
    fireEvent.click(b);
    expect(a.checked).toBe(false);
    expect(b.checked).toBe(true);
  });

  it('disables and marks the wrapper', () => {
    render(<Radio aria-label="x" name="n" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
    expect(screen.getByRole('radio').parentElement).toHaveAttribute('data-disabled');
  });

  it('forwards ref and onChange', () => {
    const ref = { current: null as HTMLInputElement | null };
    const onChange = vi.fn();
    render(<Radio ref={ref} aria-label="x" name="n" onChange={onChange} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });
});
