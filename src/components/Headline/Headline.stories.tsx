import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Text } from '../Text';
import { Headline } from './Headline';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Headline"
    lead="Emphasised text at 19px, semibold by default – the bold first line of a list row, a subsection heading. That weight is what sets it apart from Text. Renders an `h5`."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Headline',
  component: Headline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Emphasised text at `--tgui--headline` (19px), **semibold** by default (`weight="2"`) – ' +
          'the emphasis is its whole point (matches iOS Headline). Use it for the primary line ' +
          'of a list row or a subsection heading. Defaults to `h5`; `Component` changes the tag.',
      },
    },
  },
  argTypes: {
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Notifications' },
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Headline {...args} />
    </Page>
  ),
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>headline over body text</span>
        <Headline>Message privacy</Headline>
        <Text Component="p" style={{ color: 'var(--tgui--subtitle_text_color)' }}>
          People who have your number saved can see your last seen and online status. You can change
          this any time in settings.
        </Text>
      </div>
    </Page>
  ),
};
