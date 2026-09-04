import { fireEvent, render, screen } from '@testing-library/react';
import { type ReactNode, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Pagination } from './Pagination';

function renderPagination(ui: ReactNode) {
  return render(<TguiProvider platform="base">{ui}</TguiProvider>);
}

describe('Pagination', () => {
  it('renders a nav with the accessible label', () => {
    renderPagination(<Pagination page={1} count={5} onChange={() => {}} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('renders every page number when the count is small', () => {
    renderPagination(<Pagination page={2} count={5} onChange={() => {}} />);
    for (const n of [1, 2, 3, 4, 5]) {
      expect(screen.getByRole('button', { name: String(n) })).toBeInTheDocument();
    }
    expect(screen.queryByText('…')).not.toBeInTheDocument();
  });

  it('marks the current page with aria-current', () => {
    renderPagination(<Pagination page={3} count={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: '2' })).not.toHaveAttribute('aria-current');
  });

  it('collapses distant pages into an ellipsis', () => {
    renderPagination(<Pagination page={1} count={20} onChange={() => {}} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '10' })).not.toBeInTheDocument();
  });

  it('disables prev at the first page and next at the last page', () => {
    const { rerender } = renderPagination(<Pagination page={1} count={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();
    rerender(
      <TguiProvider platform="base">
        <Pagination page={5} count={5} onChange={() => {}} />
      </TguiProvider>,
    );
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls onChange with the target page', () => {
    const onChange = vi.fn();
    renderPagination(<Pagination page={2} count={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    expect(onChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('never assigns the same key to two siblings while paging through (regression)', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Controlled() {
      const [page, setPage] = useState(4);
      return <Pagination page={page} count={12} onChange={setPage} />;
    }
    renderPagination(<Controlled />);

    for (const target of [5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2]) {
      const matches = screen.getAllByRole('button', { name: String(target) });
      expect(matches).toHaveLength(1);
      fireEvent.click(matches[0]);
    }

    const keyWarning = errorSpy.mock.calls.some((call) => String(call[0]).includes('same key'));
    expect(keyWarning).toBe(false);
    errorSpy.mockRestore();
  });
});
