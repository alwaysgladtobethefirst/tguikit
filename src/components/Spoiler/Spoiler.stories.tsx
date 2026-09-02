import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Spoiler } from './Spoiler';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Spoiler"
    lead="Telegram-style hidden text. A drifting field of theme-coloured particles covers the words until you tap or key into it; revealing dissolves the particles away as the text fades in. Reduced motion shows one static frame and toggles at once."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `role="button"` span with a `<canvas>` overlay running a small particle system — ' +
          'each dot drifts, fades through a lifetime and respawns (`density`, `fps`, ' +
          '`accentColor` tunable), paused off-screen. Enter / Space or a click toggles it ' +
          '(`revealOn="hover"` for hover); `aria-pressed` tracks state and the text is ' +
          '`aria-hidden` while concealed. Revealing fades the particles out in index order (a ' +
          'dissolve ripple) as the text fades in. Reduced motion paints one frame and toggles ' +
          'instantly.',
      },
    },
  },
  argTypes: {
    revealOn: { control: 'inline-radio', options: ['click', 'hover'] },
    density: { control: { type: 'range', min: 0.04, max: 0.3, step: 0.01 } },
    fps: { control: { type: 'range', min: 8, max: 30, step: 1 } },
    accentColor: { control: 'color' },
    revealed: { table: { disable: true } },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'they were the villain all along', revealOn: 'click', density: 0.14, fps: 24 },
} satisfies Meta<typeof Spoiler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <p style={{ margin: 0, fontSize: 16, color: 'var(--tgui--text_color)' }}>
        <Spoiler {...args} />
      </p>
    </Page>
  ),
};

export const InText: Story = {
  name: 'In a sentence',
  render: () => (
    <Page>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--tgui--text_color)' }}>
        The final twist: <Spoiler>the whole city was a simulation</Spoiler>. Do not tell anyone
        before they finish it.
      </p>
    </Page>
  ),
};
