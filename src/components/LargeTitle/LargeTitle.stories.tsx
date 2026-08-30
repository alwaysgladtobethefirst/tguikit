import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Text } from '../Text';
import { LargeTitle } from './LargeTitle';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="LargeTitle"
    lead="The top of the scale (34px), bold by default. One per screen – the page's own title, the welcome heading on an onboarding step. Renders an `h1`."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/LargeTitle',
  component: LargeTitle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Prominent display text at `--tgui--large_title` (34px), **bold** by default ' +
          '(`weight="1"`), matching iOS Large Title. It\'s the largest step – use it once per ' +
          'screen for the page title. Renders an `h1`; `Component` changes the tag.',
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
  args: { children: 'Settings' },
} satisfies Meta<typeof LargeTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <LargeTitle {...args} />
    </Page>
  ),
};

export const AsScreenTitle: Story = {
  name: 'As a screen title',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>onboarding step</span>
        <LargeTitle>Your chats, everywhere</LargeTitle>
        <Text Component="p" style={{ color: 'var(--tgui--subtitle_text_color)' }}>
          Telegram keeps your messages in the cloud, so you can pick up any conversation from any
          device you sign in on.
        </Text>
      </div>
    </Page>
  ),
};
