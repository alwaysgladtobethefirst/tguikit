import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Stepper } from './Stepper';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Stepper"
    lead="A quantity control: minus, an editable value, plus. Type into the value directly — it clamps to `[min, max]` on blur or Enter."
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
  title: 'Inputs/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`[–]` and `[+]` are circular `IconButton`s (`mode="gray" size="s" circle`), disabled ' +
          'at `min` / `max`. The value in between is a native `input[type=number]` styled as ' +
          'plain text — edit it directly, it clamps on blur or Enter.',
      },
    },
  },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    value: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { min: 0, max: 10, step: 1, value: 3, onChange: () => {} },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return (
      <Page>
        <Stepper {...args} value={value} onChange={setValue} />
      </Page>
    );
  },
};

export const Bounds: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Page>
        <Row label="min=0, max=3">
          <Stepper value={value} min={0} max={3} onChange={setValue} />
        </Row>
      </Page>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Page>
      <Row label="disabled">
        <Stepper value={2} onChange={() => {}} disabled />
      </Row>
    </Page>
  ),
};
