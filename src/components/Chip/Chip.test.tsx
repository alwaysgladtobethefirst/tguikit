import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders its label and the default elevated mode', () => {
    render(<Chip data-testid="c">Filters</Chip>);
    const el = screen.getByTestId('c');
    expect(el).toHaveTextContent('Filters');
    expect(el.className).toContain('mode-elevated');
  });

  it('applies the outline mode', () => {
    render(
      <Chip data-testid="c" mode="outline">
        Tag
      </Chip>,
    );
    expect(screen.getByTestId('c').className).toContain('mode-outline');
  });

  it('fires onClick and marks itself clickable', () => {
    const onClick = vi.fn();
    render(
      <Chip data-testid="c" onClick={onClick}>
        Pick me
      </Chip>,
    );
    const el = screen.getByTestId('c');
    expect(el.className).toContain('clickable');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onRemove from the remove button without bubbling to onClick', () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    render(
      <Chip onClick={onClick} onRemove={onRemove}>
        Removable
      </Chip>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders a custom Component and forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Chip ref={ref} Component="button" className="mine">
        As button
      </Chip>,
    );
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current).toHaveClass('mine');
  });
});
