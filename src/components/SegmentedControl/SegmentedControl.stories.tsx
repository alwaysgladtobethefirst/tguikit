import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlItem } from './SegmentedControlItem';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="SegmentedControl"
    lead="An iOS-style switcher for a small set of mutually exclusive options – a view toggle or a filter. The active pill slides between segments; arrow keys move the selection. Reduced motion drops the slide."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/SegmentedControl',
  component: SegmentedControl,
  subcomponents: { SegmentedControlItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `radiogroup` of `SegmentedControlItem` radios over a sliding pill. Each item takes ' +
          '`selected` and an `onClick`; the container measures the selected item and animates the ' +
          'pill to it, repositioning on resize. Roving tabindex + Left/Right arrows for keyboard. ' +
          'The pill uses `--tgui--segmented_control_active_bg`.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

function Switcher({ options, initial }: { options: string[]; initial?: string }) {
  const [value, setValue] = useState(initial ?? options[0]);
  return (
    <SegmentedControl aria-label="Options">
      {options.map((option) => (
        <SegmentedControlItem
          key={option}
          selected={value === option}
          onClick={() => setValue(option)}
        >
          {option}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
}

export const Playground: Story = {
  render: () => (
    <Page>
      <Switcher options={['Chats', 'Calls', 'Contacts']} />
    </Page>
  ),
};

export const Counts: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 24, maxWidth: 360 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>two</span>
          <Switcher options={['On', 'Off']} />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>four</span>
          <Switcher options={['Day', 'Week', 'Month', 'Year']} />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>uneven widths</span>
          <Switcher options={['All', 'Mentions', 'Reactions & replies']} />
        </div>
      </div>
    </Page>
  ),
};
