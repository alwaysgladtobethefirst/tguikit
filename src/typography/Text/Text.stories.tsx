import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Text } from './Text';

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
          Text
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          General-purpose body text at the `text` step of the scale (17px). Built on Typography, so
          it takes `weight`, `caps` and a `Component` override. No margin of its own – spacing is
          the layout's job.
        </p>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Body text at the `--tgui--text` size. Extends Typography: `weight` (1 bold, ' +
          '2 semibold, 3 regular), `caps` for uppercase, `Component` to change the tag ' +
          '(defaults to `span`). Renders with no margin.',
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
  args: { children: 'The quick brown fox jumps over the lazy dog' },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Article>
      <Text {...args} />
    </Article>
  ),
};

export const Weights: Story = {
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>weight="1" · bold</span>
          <Text weight="1">The quick brown fox jumps over the lazy dog</Text>
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>weight="2" · semibold</span>
          <Text weight="2">The quick brown fox jumps over the lazy dog</Text>
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>weight="3" · regular (default)</span>
          <Text weight="3">The quick brown fox jumps over the lazy dog</Text>
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>caps</span>
          <Text caps>The quick brown fox jumps over the lazy dog</Text>
        </div>
      </div>
    </Article>
  ),
};

export const AsParagraph: Story = {
  name: 'As a paragraph',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 4 }}>
        <span style={eyebrow}>Component="p"</span>
        <Text Component="p">
          Telegram Mini Apps run inside the Telegram client, so their typography has to sit
          comfortably next to native chrome. Text keeps the client's font family and the platform's
          line height, and leans on the design tokens for everything else.
        </Text>
      </div>
    </Article>
  ),
};
