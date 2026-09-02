import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

function Panels(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="a" header="First">
        Body A
      </AccordionItem>
      <AccordionItem value="b" header="Second">
        Body B
      </AccordionItem>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('toggles a panel and reflects aria-expanded', () => {
    render(<Panels />);
    const first = screen.getByRole('button', { name: 'First' });
    expect(first).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens only one at a time by default', () => {
    render(<Panels defaultValue="a" />);
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps several open with multiple', () => {
    render(<Panels multiple defaultValue={['a']} />);
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports a controlled value', () => {
    const onChange = vi.fn();
    render(<Panels value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(onChange).toHaveBeenCalledWith(['b']);
    // still controlled to 'a' until the parent updates
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('links the header to its panel and marks a closed panel hidden', () => {
    render(<Panels />);
    const button = screen.getByRole('button', { name: 'First' });
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId as string) as HTMLElement;
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    fireEvent.click(button);
    expect(panel).toHaveAttribute('aria-hidden', 'false');
  });

  it('throws when AccordionItem is used outside Accordion', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <AccordionItem value="x" header="Lonely">
          nope
        </AccordionItem>,
      ),
    ).toThrow(/within an <Accordion>/);
  });
});
