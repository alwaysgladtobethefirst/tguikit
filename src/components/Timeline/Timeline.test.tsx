import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';

describe('Timeline', () => {
  it('renders an ordered list of items', () => {
    render(
      <Timeline data-testid="tl">
        <TimelineItem title="Ordered" time="10:00" />
        <TimelineItem title="Packed" time="11:00" description="Ready to ship" />
        <TimelineItem title="Delivered" time="12:00" />
      </Timeline>,
    );
    expect(screen.getByTestId('tl').tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Ready to ship')).toBeInTheDocument();
  });

  it('marks the active item via data-active', () => {
    render(
      <Timeline>
        <TimelineItem title="Ordered" />
        <TimelineItem title="Packed" active />
        <TimelineItem title="Delivered" />
      </Timeline>,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveAttribute('data-active');
    expect(items[1]).toHaveAttribute('data-active', 'true');
    expect(items[2]).not.toHaveAttribute('data-active');
  });

  it('forwards ref and className on both root and item', () => {
    const rootRef = { current: null as HTMLOListElement | null };
    const itemRef = { current: null as HTMLLIElement | null };
    render(
      <Timeline ref={rootRef} className="mine">
        <TimelineItem ref={itemRef} title="Step" className="also-mine" />
      </Timeline>,
    );
    expect(rootRef.current).toHaveClass('mine');
    expect(itemRef.current).toHaveClass('also-mine');
  });
});
