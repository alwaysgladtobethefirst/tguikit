import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Typography } from './Typography';

const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";
const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";

const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The low-level base every named typography component (Text, Title, Headline, …) ' +
          'extends. It only owns the font family, weight and caps – the size and line height ' +
          'come from whichever component wraps it. Reach for a named component first; use ' +
          'Typography directly when you need a one-off.',
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
  args: { children: 'The quick brown fox' },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Weights: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 620,
        margin: '0 auto',
        display: 'grid',
        gap: 12,
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
      }}
    >
      {(['1', '2', '3'] as const).map((weight) => (
        <div key={weight} style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>weight="{weight}"</span>
          <Typography weight={weight} style={{ fontSize: 20 }}>
            The quick brown fox jumps over the lazy dog
          </Typography>
        </div>
      ))}
      <div style={{ display: 'grid', gap: 4 }}>
        <span style={eyebrow}>caps</span>
        <Typography caps style={{ fontSize: 20 }}>
          The quick brown fox jumps over the lazy dog
        </Typography>
      </div>
    </div>
  ),
};
