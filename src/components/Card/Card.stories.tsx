import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Card } from './Card';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Card"
    lead="A rounded, shadowed container for a self-contained piece of content – a media preview, a promo, a stat. `ambient` floats a gradient `Card.Cell` over the media; `plain` (default) puts the cell below on a solid surface."
  >
    {children}
  </Article>
);

const Media = ({ h = 180 }: { h?: number }) => (
  <div
    style={{
      width: 260,
      height: h,
      background: 'linear-gradient(135deg, #4b7bec 0%, #a55eea 100%)',
    }}
  />
);

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A rounded 20px container with a soft shadow. `Card.Cell` is a `Cell` tuned for card ' +
          'use: on a `plain` card it sits on `--tgui--card_bg_color`; on an `ambient` card it is ' +
          'absolutely positioned at the bottom over a dark gradient with light text. Needs a ' +
          '`TguiProvider`.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['plain', 'ambient'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { type: 'plain' },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Card {...args}>
        <Media />
        <Card.Cell subtitle="Open now · 0.4 km away">Blue Bottle Coffee</Card.Cell>
      </Card>
    </Page>
  ),
};

export const Types: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>plain</span>
          <Card>
            <Media />
            <Card.Cell subtitle="Warm and sunny, 24°">Today</Card.Cell>
          </Card>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>ambient</span>
          <Card type="ambient">
            <Media h={220} />
            <Card.Cell subtitle="A quiet spot by the river">Riverside Park</Card.Cell>
          </Card>
        </div>
      </div>
    </Page>
  ),
};
