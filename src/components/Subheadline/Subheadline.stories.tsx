import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Subheadline } from './Subheadline';

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
          Subheadline
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          Secondary headings – section-group labels, list headers. `level` 1 (16px, default) or 2
          (15px). Renders an `h6`; extends Typography for `weight` and `caps`.
        </p>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Typography/Subheadline',
  component: Subheadline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Secondary heading text. `level` 1 = `--tgui--subheadline1` (16px, default), 2 = ' +
          '`--tgui--subheadline2` (15px). Renders an `h6`; `Component` changes the tag. Extends ' +
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
  args: { children: 'Account', level: '1' },
} satisfies Meta<typeof Subheadline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Article>
      <Subheadline {...args} />
    </Article>
  ),
};

export const Levels: Story = {
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 12 }}>
        {(['1', '2'] as const).map((level) => (
          <div key={level} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>
              level="{level}" · {level === '1' ? '16px' : '15px'}
            </span>
            <Subheadline level={level}>Account</Subheadline>
          </div>
        ))}
      </div>
    </Article>
  ),
};

export const AsGroupLabel: Story = {
  name: 'As a section-group label',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 10 }}>
        <Subheadline caps style={{ color: 'var(--tgui--section_header_text_color)' }}>
          Account
        </Subheadline>
        <div
          style={{
            display: 'grid',
            gap: 1,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'var(--tgui--section_separator_color)',
          }}
        >
          {['Phone number', 'Username', 'Bio'].map((row) => (
            <div
              key={row}
              style={{
                padding: '12px 16px',
                background: 'var(--tgui--section_bg_color)',
                fontSize: 'var(--tgui--text--font_size)',
              }}
            >
              {row}
            </div>
          ))}
        </div>
      </div>
    </Article>
  ),
};
