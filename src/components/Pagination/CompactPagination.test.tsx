import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CompactPagination } from './CompactPagination';

describe('CompactPagination', () => {
  it('renders one dot button per page when count is small', () => {
    render(<CompactPagination page={1} count={4} onChange={() => {}} />);
    for (const n of [1, 2, 3, 4]) {
      expect(screen.getByRole('button', { name: `Page ${n}` })).toBeInTheDocument();
    }
  });

  it('marks the active dot with aria-current', () => {
    render(<CompactPagination page={2} count={4} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveAttribute('aria-current');
  });

  it('caps the rendered dots to a window around the current page for large counts', () => {
    render(<CompactPagination page={10} count={30} onChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'Page 10' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onChange with the clicked page', () => {
    const onChange = vi.fn();
    render(<CompactPagination page={1} count={4} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
