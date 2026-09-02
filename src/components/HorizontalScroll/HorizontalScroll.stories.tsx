import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Image } from '../Image';
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

const PLACES = [
  { id: 1015, name: 'Alpine lake', meta: '4.9 · 320 reviews' },
  { id: 1016, name: 'Coast road', meta: '4.7 · 180 reviews' },
  { id: 1024, name: 'Old harbour', meta: '4.8 · 512 reviews' },
  { id: 1039, name: 'Waterfall trail', meta: '4.6 · 96 reviews' },
  { id: 1043, name: 'Pine forest', meta: '4.9 · 274 reviews' },
  { id: 1052, name: 'Desert dunes', meta: '4.5 · 63 reviews' },
];

export const Playground: Story = {
  render: (args) => (
    <Page>
      <HorizontalScroll {...args}>
        {PLACES.map((place) => (
          <div key={place.id} style={{ flexShrink: 0, width: 148, marginRight: 12 }}>
            <Image
              src={`https://picsum.photos/id/${place.id}/300/200`}
              alt=""
              width={148}
              aspectRatio="3 / 2"
              radius={14}
            />
            <div
              style={{
                marginTop: 8,
                font: '600 14px/1.3 var(--tgui--font-family)',
                color: 'var(--tgui--text_color)',
              }}
            >
              {place.name}
            </div>
            <div
              style={{
                font: '13px/1.3 var(--tgui--font-family)',
                color: 'var(--tgui--hint_color)',
              }}
            >
              {place.meta}
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </Page>
  ),
};

export const Chips: Story = {
  render: () => (
    <Page>
      <HorizontalScroll>
        {['All', 'Nature', 'City', 'Food', 'Nightlife', 'Museums', 'Beaches', 'Hikes'].map(
          (label, i) => (
            <button
              key={label}
              type="button"
              style={{
                flexShrink: 0,
                marginRight: 8,
                padding: '8px 16px',
                border: 0,
                borderRadius: 999,
                background:
                  i === 0 ? 'var(--tgui--button_color)' : 'var(--tgui--tertiary_bg_color)',
                color: i === 0 ? 'var(--tgui--button_text_color)' : 'var(--tgui--text_color)',
                font: '600 14px/1 var(--tgui--font-family)',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ),
        )}
      </HorizontalScroll>
    </Page>
  ),
};

export const Snapping: Story = {
  render: () => (
    <Page>
      <HorizontalScroll snap>
        {PLACES.map((place) => (
          <div
            key={place.id}
            style={{ flexShrink: 0, width: 'calc(100% - 40px)', marginRight: 12 }}
          >
            <Image
              src={`https://picsum.photos/id/${place.id}/600/300`}
              alt=""
              width="100%"
              aspectRatio="2 / 1"
              radius={16}
            />
          </div>
        ))}
      </HorizontalScroll>
    </Page>
  ),
};
