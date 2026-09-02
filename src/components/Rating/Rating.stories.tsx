import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Rating } from './Rating';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Rating"
    lead="A star rating. Interactive by default – a radio group with click, hover preview and arrow-key support. `readOnly` turns it into a display with a fractional fill; `icon` and `count` are configurable."
  >
    {children}
  </Article>
);

const Heart = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 21s-7.5-4.7-10-9.1C.4 9 1.6 5.5 5 5.5c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3.4 0 4.6 3.5 3 6.4C19.5 16.3 12 21 12 21z" />
  </svg>
);

const meta = {
  title: 'Inputs/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interactive: a `radiogroup` of star buttons with roving tabindex, hover preview and ' +
          'Left/Right (or Up/Down) arrows. `readOnly` renders `role="img"` with a labelled score ' +
          'and a clip-path fill for fractional values. `icon` swaps the glyph, `count` the number ' +
          'of stars. Fill colour is `--tgui--rating--color`.',
      },
    },
  },
  argTypes: {
    count: { control: { type: 'number', min: 3, max: 10 } },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { table: { disable: true } },
    icon: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { count: 5 },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return (
      <Page>
        <Rating {...args} value={value} onChange={setValue} />
      </Page>
    );
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {[5, 4.5, 3.2, 1].map((score) => (
          <div key={score} style={{ display: 'grid', gap: 8 }}>
            <span style={eyebrow}>{score} / 5</span>
            <Rating readOnly value={score} aria-label="Score" />
          </div>
        ))}
      </div>
    </Page>
  ),
};

export const CustomIcon: Story = {
  name: 'Custom icon',
  render: () => {
    const [value, setValue] = useState(2);
    return (
      <Page>
        <Rating
          value={value}
          onChange={setValue}
          count={5}
          icon={Heart}
          className="hearts"
          aria-label="Love"
        />
        <style>{`.hearts { --tgui--rating--color: #e0245e; }`}</style>
      </Page>
    );
  },
};
