import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Tooltip"
    lead="A small label anchored to a trigger. Opens on hover or focus (long-press on touch), flips when it would clip the viewport, and points at the trigger with an arrow. Reduced motion drops the scale."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps a single trigger in an `inline-flex` span and portals the label out. Placement is ' +
          '`top` / `bottom` / `left` / `right`; it flips to the opposite side when there is not ' +
          'enough room and clamps into the viewport, with the arrow tracking the trigger centre. ' +
          '`transform-origin` sits at the trigger. Closes on Escape or scroll. Needs a ' +
          '`TguiProvider`.',
      },
    },
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    content: { control: 'text' },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { placement: 'top', content: 'Added to your favourites', children: null },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const Star = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9.1l6.9-.8z" />
  </svg>
);

export const Playground: Story = {
  render: (args) => (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
        <Tooltip {...args}>
          <IconButton mode="bezeled" aria-label="Favourite">
            {Star}
          </IconButton>
        </Tooltip>
      </div>
    </Page>
  ),
};

export const Placements: Story = {
  render: () => (
    <Page>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, max-content)',
          gap: 40,
          justifyContent: 'center',
          padding: '32px 0',
        }}
      >
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <div key={placement} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
            <span style={eyebrow}>{placement}</span>
            <Tooltip placement={placement} content={`Anchored ${placement}`}>
              <IconButton mode="gray" aria-label={placement}>
                {Star}
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
    </Page>
  ),
};

export const AlwaysOpen: Story = {
  name: 'Controlled open',
  render: () => (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
        <Tooltip open content="This one stays put">
          <IconButton mode="bezeled" aria-label="Pinned">
            {Star}
          </IconButton>
        </Tooltip>
      </div>
    </Page>
  ),
};
