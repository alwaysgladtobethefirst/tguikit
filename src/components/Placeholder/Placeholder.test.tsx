import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TguiProvider } from '../TguiProvider';
import { Placeholder } from './Placeholder';

const renderP = (ui: ReactNode) => render(<TguiProvider platform="base">{ui}</TguiProvider>);

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Placeholder', () => {
  it('renders header, description, visual and action', () => {
    renderP(
      <Placeholder
        header="Nothing here yet"
        description="Add your first item to get started"
        action={<button type="button">Add item</button>}
      >
        <img alt="empty box" src="x" />
      </Placeholder>,
    );
    expect(screen.getByText('Nothing here yet').tagName).toBe('DT');
    expect(screen.getByText('Add your first item to get started').tagName).toBe('DD');
    expect(screen.getByRole('img', { name: 'empty box' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('skips the text block when there is no header or description', () => {
    const { container } = renderP(
      <Placeholder>
        <span>just a visual</span>
      </Placeholder>,
    );
    expect(container.querySelector('dl')).toBeNull();
  });

  it('forwards ref and className', () => {
    const ref = { current: null as HTMLElement | null };
    renderP(<Placeholder ref={ref} className="empty" header="x" />);
    expect(ref.current?.tagName).toBe('SECTION');
    expect(ref.current).toHaveClass('empty');
  });
});
