import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Stepper } from './Stepper';

function renderStepper(ui: ReactNode) {
  return render(<TguiProvider platform="base">{ui}</TguiProvider>);
}

describe('Stepper', () => {
  it('renders the current value', () => {
    renderStepper(<Stepper value={3} onChange={() => {}} />);
    expect(screen.getByRole('spinbutton', { name: 'Value' })).toHaveValue(3);
  });

  it('increments and decrements by step', () => {
    const onChange = vi.fn();
    renderStepper(<Stepper value={3} step={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(5);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables minus at min and plus at max', () => {
    renderStepper(<Stepper value={0} min={0} max={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase' })).not.toBeDisabled();
  });

  it('clamps a typed value on blur', () => {
    const onChange = vi.fn();
    renderStepper(<Stepper value={3} min={0} max={5} onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Value' });
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('commits on Enter', () => {
    const onChange = vi.fn();
    renderStepper(<Stepper value={3} min={0} max={5} onChange={onChange} />);
    const input = screen.getByRole('spinbutton', { name: 'Value' });
    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables both buttons and the input when disabled', () => {
    renderStepper(<Stepper value={3} onChange={() => {}} disabled />);
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
    expect(screen.getByRole('spinbutton', { name: 'Value' })).toBeDisabled();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLDivElement | null };
    renderStepper(<Stepper ref={ref} className="mine" value={0} onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });
});
