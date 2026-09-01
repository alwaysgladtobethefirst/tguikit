import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Slider } from './Slider';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Slider"
    lead="A value slider built on a native range input – so keyboard, focus and form behaviour come for free. The fill tracks the thumb; `before` / `after` take labels or icons."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled `input[type=range]` with a coloured fill layer. Controlled (`value` + ' +
          '`onChange`) or uncontrolled (`defaultValue`). `min` / `max` / `step` pass straight to ' +
          'the input; `before` / `after` render a hint label on each side. The fill eases unless ' +
          '`prefers-reduced-motion` is set.',
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
  args: { min: 0, max: 100, step: 1 },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <Page>
        <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
          <Slider {...args} value={value} onChange={setValue} aria-label="Value" />
          <span style={eyebrow}>value {value}</span>
        </div>
      </Page>
    );
  },
};

export const WithLabels: Story = {
  name: 'With labels',
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <Page>
        <div style={{ maxWidth: 360 }}>
          <Slider
            min={1}
            max={5}
            step={1}
            value={value}
            onChange={setValue}
            before="A"
            after="A"
            aria-label="Text size"
          />
        </div>
      </Page>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Page>
      <div style={{ maxWidth: 360 }}>
        <Slider defaultValue={60} disabled aria-label="Locked" />
      </div>
    </Page>
  ),
};
