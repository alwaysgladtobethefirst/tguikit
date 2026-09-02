import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Spoiler } from './Spoiler';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Spoiler"
    lead="Telegram-style hidden text. Blurred under an animated grain field until tapped or activated by keyboard; tap again to hide it. Reduced motion drops the flicker and de-blurs instantly."
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
          'A `role="button"` span that blurs its content under a theme-coloured SVG-noise grain ' +
          'that flickers via `steps()`. Enter / Space or a click toggles it; `aria-pressed` ' +
          'tracks the state and the content is `aria-hidden` while concealed. Controlled via ' +
          '`revealed` + `onRevealedChange`. The flicker sits behind `prefers-reduced-motion`.',
      },
    },
  },
  argTypes: {
    revealed: { table: { disable: true } },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'they were the villain all along' },
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
