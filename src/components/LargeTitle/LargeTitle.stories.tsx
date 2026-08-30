import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../Text';
import { LargeTitle } from './LargeTitle';

const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";
const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";

const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};

function Article({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 620,
        margin: '0 auto',
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
        display: 'grid',
        gap: 40,
      }}
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 640, letterSpacing: '-0.025em' }}>
          LargeTitle
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          The top of the scale (34px), bold by default. One per screen – the page's own title, the
          welcome heading on an onboarding step. Renders an `h1`.
        </p>
      </header>
      {children}
    </div>
  );
}

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
    <Article>
      <LargeTitle {...args} />
    </Article>
  ),
};

export const AsScreenTitle: Story = {
  name: 'As a screen title',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>onboarding step</span>
        <LargeTitle>Your chats, everywhere</LargeTitle>
        <Text Component="p" style={{ color: 'var(--tgui--subtitle_text_color)' }}>
          Telegram keeps your messages in the cloud, so you can pick up any conversation from any
          device you sign in on.
        </Text>
      </div>
    </Article>
  ),
};
