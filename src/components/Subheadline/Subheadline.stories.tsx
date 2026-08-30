import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Headline } from '../Headline';
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
          Supporting text, always paired with a dimmer colour. Two jobs: `level` 1 (16px) is the
          secondary line under a row title; `level` 2 (15px) `caps` is the group header above a
          settings section. Renders an `h6`.
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
          'Supporting text, meant to be used with a dim colour (hint / subtitle). ' +
          '`level` 1 = `--tgui--subheadline1` (16px) for the secondary line under a row title; ' +
          '`level` 2 = `--tgui--subheadline2` (15px) with `caps` for a settings-section header. ' +
          'Renders an `h6`; `Component` changes the tag.',
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

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 12 }}>
        <span style={eyebrow}>the two jobs subheadline does</span>

        {/* level 2, caps, dim: the group header above a settings section */}
        <Subheadline level="2" caps style={{ color: 'var(--tgui--section_header_text_color)' }}>
          Privacy
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
          {[
            ['Last seen & online', 'Nobody'],
            ['Phone number', 'My contacts'],
          ].map(([title, value]) => (
            <div
              key={title}
              style={{
                display: 'grid',
                gap: 2,
                padding: '10px 16px',
                background: 'var(--tgui--section_bg_color)',
              }}
            >
              <Headline>{title}</Headline>
              {/* level 1, dim: the secondary line under the row title */}
              <Subheadline style={{ color: 'var(--tgui--subtitle_text_color)' }}>
                {value}
              </Subheadline>
            </div>
          ))}
        </div>
      </div>
    </Article>
  ),
};
