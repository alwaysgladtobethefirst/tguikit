import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Progress } from './Progress';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Progress"
    lead="A linear determinate bar. `value` is 0–100 and is clamped. Carries the progressbar role with `aria-valuenow`. For an unknown duration use Spinner instead."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A track `<div>` with a fill bar sized to `value` (0–100, clamped). Track and fill are ' +
          'theme tokens; the fill width eases unless `prefers-reduced-motion` is set. ' +
          'Indeterminate work belongs to Spinner.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { value: 40 },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Progress {...args} />
    </Page>
  ),
};

export const Steps: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {[0, 25, 50, 75, 100].map((value) => (
          <div key={value} style={{ display: 'grid', gap: 8 }}>
            <span style={eyebrow}>value={value}</span>
            <Progress value={value} />
          </div>
        ))}
      </div>
    </Page>
  ),
};
