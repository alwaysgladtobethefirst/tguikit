import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { CircularProgress } from './CircularProgress';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="CircularProgress"
    lead="A determinate ring. `value` is 0–100, `size` is s / m / l. Carries the progressbar role. For an unknown duration use Spinner instead."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An SVG ring: a track circle plus an indicator arc whose length follows `value` (0–100, ' +
          'clamped). `size` s / m / l. Colour is `--tgui--link_color`; the arc eases unless ' +
          '`prefers-reduced-motion` is set. Indeterminate work belongs to Spinner.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { value: 60, size: 'm' },
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <div style={{ display: 'flex' }}>
        <CircularProgress {...args} />
      </div>
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>s / m / l</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {(['s', 'm', 'l'] as const).map((size) => (
            <CircularProgress key={size} size={size} value={65} />
          ))}
        </div>
      </div>
    </Page>
  ),
};

export const Steps: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>0 / 25 / 50 / 75 / 100</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[0, 25, 50, 75, 100].map((value) => (
            <CircularProgress key={value} value={value} />
          ))}
        </div>
      </div>
    </Page>
  ),
};
