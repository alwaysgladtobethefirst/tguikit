import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders a range input with the given bounds', () => {
    render(<Slider min={0} max={10} step={2} defaultValue={4} aria-label="Volume" />);
    const input = screen.getByRole('slider', { name: 'Volume' }) as HTMLInputElement;
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '10');
    expect(input.value).toBe('4');
  });

  it('reports changes and tracks the value when uncontrolled', () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={0} onChange={onChange} aria-label="V" />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
    expect((input as HTMLInputElement).value).toBe('75');
  });

  it('stays put when controlled and the parent ignores the change', () => {
    render(<Slider value={30} onChange={() => {}} aria-label="V" />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '90' } });
    expect(input.value).toBe('30');
  });

  it('sizes the fill from the value', () => {
    const { container } = render(<Slider min={0} max={200} value={50} onChange={() => {}} />);
    const fill = container.querySelector('span > span + span') as HTMLElement;
    expect(fill.style.width).toBe('25%');
  });

  it('renders before / after slots and disables', () => {
    render(<Slider disabled before="0" after="100" aria-label="V" />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
