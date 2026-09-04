import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Steps } from './Steps';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Steps"
    lead="A compact segmented progress indicator, like a Stories bar. `count` segments, `progress` (0-based, can be fractional — 1.5 fills the first segment and half of the second)."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    {children}
  </div>
);

const meta = {
  title: 'Feedback/Steps',
  component: Steps,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Non-interactive: `count` thin pill segments, each filled to `clamp01(progress - index)`. ' +
          'Carries the progressbar role with `aria-valuenow`. Fill width eases unless ' +
          '`prefers-reduced-motion` is set.',
      },
    },
  },
  argTypes: {
    count: { control: { type: 'number', min: 1, max: 20, step: 1 } },
    progress: { control: { type: 'range', min: 0, max: 20, step: 0.1 } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { count: 5, progress: 2.3 },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Steps {...args} />
    </Page>
  ),
};

export const Stages: Story = {
  render: () => (
    <Page>
      <Row label="start">
        <Steps count={4} progress={0} />
      </Row>
      <Row label="mid segment">
        <Steps count={4} progress={1.5} />
      </Row>
      <Row label="complete">
        <Steps count={4} progress={4} />
      </Row>
    </Page>
  ),
};
