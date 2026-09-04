import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlItem } from './SegmentedControlItem';

function Group({ onChange }: { onChange?: (v: string) => void }) {
  const [value, setValue] = useState('day');
  const options = ['day', 'week', 'month'];
  return (
    <SegmentedControl aria-label="Range">
      {options.map((option) => (
        <SegmentedControlItem
          key={option}
          selected={value === option}
          onClick={() => {
            setValue(option);
            onChange?.(option);
          }}
        >
          {option}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
}

describe('SegmentedControl', () => {
  it('exposes radiogroup / radio semantics with one checked', () => {
    render(<Group />);
    expect(screen.getByRole('radiogroup', { name: 'Range' })).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('selects on click', () => {
    const onChange = vi.fn();
    render(<Group onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'week' }));
    expect(onChange).toHaveBeenCalledWith('week');
    expect(screen.getByRole('radio', { name: 'week' })).toHaveAttribute('aria-checked', 'true');
  });

  it('moves selection with arrow keys', () => {
    render(<Group />);
    const day = screen.getByRole('radio', { name: 'day' });
    day.focus();
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: 'week' })).toHaveAttribute('aria-checked', 'true');
  });

  it('only the selected item is tabbable', () => {
    render(<Group />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('tabindex', '0');
    expect(radios[1]).toHaveAttribute('tabindex', '-1');
  });
});
