import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders a search input with a default accessible label', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('uses a custom label', () => {
    render(<SearchBar value="" onChange={() => {}} label="Find a chat" />);
    expect(screen.getByRole('searchbox', { name: 'Find a chat' })).toBeInTheDocument();
  });

  it('fires onChange as the user types', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'tg' } });
    expect(onChange).toHaveBeenCalledWith('tg');
  });

  it('shows the clear button only when there is a value, and clears + refocuses on click', () => {
    const onChange = vi.fn();
    const { rerender } = render(<SearchBar value="" onChange={onChange} />);
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();

    rerender(<SearchBar value="hello" onChange={onChange} />);
    const clear = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByRole('searchbox')).toHaveFocus();
  });

  it('does not render a cancel button when onCancel is omitted', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
  });

  it('fires onCancel and blurs the input when Cancel is clicked', () => {
    const onCancel = vi.fn();
    render(<SearchBar value="" onChange={() => {}} onCancel={onCancel} />);
    const input = screen.getByRole('searchbox');
    input.focus();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(input).not.toHaveFocus();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SearchBar ref={ref} className="mine" value="" onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('mine');
  });
});
