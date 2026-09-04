import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Timeline"
    lead="A vertical connector line down a list of dated events. Mark the current one with `active` — everything after it reads as pending."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compound component: `Timeline` renders an `<ol>` with a connector rail; ' +
          '`TimelineItem` is a dot + title + optional `description` and `time`. ' +
          'Set `active` on one item — the connector leading to it turns accent-coloured and ' +
          'every item after it is muted.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Order: Story = {
  render: () => (
    <Page>
      <Timeline>
        <TimelineItem title="Order placed" time="Mon, 10:02" description="#4471 — 2 items" />
        <TimelineItem title="Packed" time="Mon, 14:20" active />
        <TimelineItem title="Shipped" time="Tue" />
        <TimelineItem title="Delivered" time="Wed" />
      </Timeline>
    </Page>
  ),
};

export const Delivered: Story = {
  render: () => (
    <Page>
      <Timeline>
        <TimelineItem title="Order placed" time="Mon" />
        <TimelineItem title="Packed" time="Mon" />
        <TimelineItem title="Shipped" time="Tue" />
        <TimelineItem title="Delivered" time="Wed" active description="Left at the front desk" />
      </Timeline>
    </Page>
  ),
};
