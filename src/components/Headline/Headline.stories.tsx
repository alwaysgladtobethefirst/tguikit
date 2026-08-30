import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Headline } from './Headline';

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
          Headline
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          Emphasised text at 19px, semibold by default – the bold first line of a list row, a
          subsection heading. That weight is what sets it apart from Text. Renders an `h5`.
        </p>
      </header>
      {children}
    </div>
  );
}

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
    <Article>
      <Headline {...args} />
    </Article>
  ),
};

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <Article>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>headline over body text</span>
        <Headline>Message privacy</Headline>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--tgui--text--font_size)',
            lineHeight: 'var(--tgui--text--line_height)',
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          People who have your number saved can see your last seen and online status. You can change
          this any time in settings.
        </p>
      </div>
    </Article>
  ),
};
