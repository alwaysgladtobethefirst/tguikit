import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Title } from './Title';

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
          Title
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          Section and page headings. `level` picks the size and the semantic tag together – 1 is an
          `h2` at the title-1 size, 2 an `h3` (default), 3 an `h4`. Override the tag with
          `Component` without changing the size.
        </p>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Typography/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Heading text at the `--tgui--title1..3` sizes. `level` (1/2/3, default 2) sets both ' +
          'the size and the tag (h2/h3/h4). Extends Typography, so `weight` and `caps` work; ' +
          '`Component` overrides just the tag.',
      },
    },
  },
  argTypes: {
    level: { control: 'inline-radio', options: ['1', '2', '3'] },
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Mini App settings', level: '2' },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Article>
      <Title {...args} />
    </Article>
  ),
};

export const Levels: Story = {
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 16 }}>
        {(['1', '2', '3'] as const).map((level) => (
          <div key={level} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>
              level="{level}" · {level === '1' ? 'h2' : level === '2' ? 'h3' : 'h4'}
            </span>
            <Title level={level}>Mini App settings</Title>
          </div>
        ))}
      </div>
    </Article>
  ),
};
