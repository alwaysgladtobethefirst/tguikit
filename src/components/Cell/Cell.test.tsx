import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from '../TguiProvider';
import { Cell } from './Cell';

function renderCell(ui: ReactNode, platform: TguiPlatform = 'base') {
  const result = render(<TguiProvider platform={platform}>{ui}</TguiProvider>);
  return { ...result, cell: result.container.firstElementChild?.firstElementChild as HTMLElement };
}

beforeEach(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

describe('Cell', () => {
  it('renders a div with the title by default', () => {
    const { cell } = renderCell(<Cell>Phone number</Cell>);
    expect(cell.tagName).toBe('DIV');
    expect(screen.getByText('Phone number')).toBeInTheDocument();
  });

  it('renders every text slot', () => {
    renderCell(
      <Cell
        subhead="Contact"
        hint="edited"
        subtitle="+1 555 0100"
        description="Visible to contacts"
      >
        Phone number
      </Cell>,
    );
    for (const t of ['Contact', 'Phone number', 'edited', '+1 555 0100', 'Visible to contacts']) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });

  it('renders before / after / titleBadge slots', () => {
    renderCell(
      <Cell
        before={<span data-testid="avatar" />}
        after={<span data-testid="chevron" />}
        titleBadge={<span data-testid="badge" />}
      >
        Name
      </Cell>,
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('chevron')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('omits the title row when there is nothing titley to show', () => {
    renderCell(<Cell before={<span>x</span>} subtitle="just a subtitle" />);
    expect(screen.queryByText('just a subtitle')).toBeInTheDocument();
    expect(document.querySelector('[class*="head"]')).toBeNull();
  });

  it('adapts the title component to the platform', () => {
    const { rerender } = renderCell(<Cell>Title</Cell>, 'base');
    expect(document.querySelector('[class*="head"]')?.className).toContain('level-1');

    rerender(
      <TguiProvider platform="ios">
        <Cell>Title</Cell>
      </TguiProvider>,
    );
    expect(document.querySelector('[class*="head"]')?.className).toContain('text');
  });

  it('applies hovered and multiline modifiers', () => {
    const { cell } = renderCell(
      <Cell hovered multiline>
        x
      </Cell>,
    );
    expect(cell.className).toContain('hovered');
    expect(cell.className).toContain('multiline');
  });

  it('renders as another element and forwards ref, className, onClick', () => {
    const ref = { current: null as HTMLElement | null };
    const onClick = vi.fn();
    renderCell(
      <Cell ref={ref} Component="a" href="/x" className="row" onClick={onClick}>
        Link cell
      </Cell>,
    );
    const el = screen.getByRole('link', { name: 'Link cell' });
    expect(el.tagName).toBe('A');
    expect(ref.current).toBe(el);
    expect(el).toHaveClass('row');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
