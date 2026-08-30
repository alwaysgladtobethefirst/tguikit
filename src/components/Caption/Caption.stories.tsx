import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Caption } from './Caption';

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
          Caption
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          The smallest text in the system, for timestamps, form hints, and metadata. `level` 1
          (13px, default) or 2 (11px). Renders a `span`; extends Typography for `weight` and `caps`.
        </p>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The smallest text step. `level` 1 = `--tgui--caption1` (13px, default), 2 = ' +
          '`--tgui--caption2` (11px). Renders a `span`; `Component` changes the tag. Extends ' +
          'Typography (`weight`, `caps`).',
      },
    },
  },
  argTypes: {
    level: { control: 'inline-radio', options: ['1', '2'] },
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Last seen recently', level: '1' },
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Article>
      <Caption {...args} />
    </Article>
  ),
};

export const Levels: Story = {
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>level="1" · 13px</span>
          <Caption level="1">Sent · 3:42 PM</Caption>
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>level="2" · 11px</span>
          <Caption level="2">Sent · 3:42 PM</Caption>
        </div>
      </div>
    </Article>
  ),
};

export const AsFormHint: Story = {
  name: 'As a form hint',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 6 }}>
        <span
          style={{
            fontSize: 'var(--tgui--text--font_size)',
            lineHeight: 'var(--tgui--text--line_height)',
          }}
        >
          Display name
        </span>
        <div
          style={{
            height: 44,
            borderRadius: 10,
            background: 'var(--tgui--secondary_bg_color)',
          }}
        />
        <Caption Component="p" style={{ color: 'var(--tgui--hint_color)' }}>
          This is how your name shows up to people you message.
        </Caption>
      </div>
    </Article>
  ),
};
