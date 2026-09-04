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

  it('always keeps the first and last page reachable for large counts', () => {
    render(<CompactPagination page={15} count={30} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 30' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 15' })).toHaveAttribute('aria-current', 'page');
  });

  it('collapses the middle into non-interactive gaps for large counts', () => {
    render(<CompactPagination page={15} count={30} onChange={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.queryByRole('button', { name: 'Page 5' })).not.toBeInTheDocument();
  });

  it('calls onChange with the clicked page', () => {
    const onChange = vi.fn();
    render(<CompactPagination page={1} count={4} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('reaches page 1 and the last page in a single click from anywhere', () => {
    const onChange = vi.fn();
    render(<CompactPagination page={15} count={30} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 1' }));
    expect(onChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByRole('button', { name: 'Page 30' }));
    expect(onChange).toHaveBeenCalledWith(30);
  });
});
