import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { HorizontalScroll } from './HorizontalScroll';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="HorizontalScroll"
    lead="A horizontal scroller with gradient edge fades that appear only when there is more to scroll. Drag with a mouse on desktop; touch uses native scrolling. Optional scroll snapping."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Layout/HorizontalScroll',
  component: HorizontalScroll,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flex row inside an `overflow-x: auto` scroller with the native scrollbar hidden. ' +
          'It tracks scroll position and toggles `data-start` / `data-end` on the wrapper, which ' +
          'drives a `mask-image` fade on whichever edge has more content. Mouse drag-to-scroll is ' +
          'added on top of native touch scrolling; `snap` turns on `scroll-snap`.',
      },
    },
  },
  argTypes: {
    snap: { control: 'boolean' },
    fade: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { snap: false, fade: true },
} satisfies Meta<typeof HorizontalScroll>;

export default meta;

type Story = StoryObj<typeof meta>;

const COLORS = [
  '#e17076',
  '#7bc862',
  '#65aadd',
  '#a695e7',
  '#ee7aae',
  '#f5a623',
  '#5eb5f7',
  '#67d3a9',
];

const cards = COLORS.map((color, i) => (
  <div
    key={color}
    style={{
      flexShrink: 0,
      width: 140,
      height: 96,
      marginRight: 12,
      borderRadius: 14,
      background: color,
      color: '#fff',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 12,
      font: '600 14px/1 var(--tgui--font-family)',
    }}
  >
    Card {i + 1}
  </div>
));

export const Playground: Story = {
  render: (args) => (
    <Page>
      <HorizontalScroll {...args}>{cards}</HorizontalScroll>
    </Page>
  ),
};

export const Snapping: Story = {
  render: () => (
    <Page>
      <HorizontalScroll snap>
        {COLORS.map((color, i) => (
          <div
            key={color}
            style={{
              flexShrink: 0,
              width: 'calc(100% - 48px)',
              marginRight: 12,
              height: 140,
              borderRadius: 16,
              background: color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              font: '600 18px/1 var(--tgui--font-family)',
            }}
          >
            Slide {i + 1}
          </div>
        ))}
      </HorizontalScroll>
    </Page>
  ),
};
