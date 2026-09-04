import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Radio } from './Radio';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Radio"
    lead="A single choice within a group. CSS-drawn over a real radio input, so a shared `name` handles the grouping and keyboard arrows. Pair it with a `Cell` for a labelled row."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A CSS-drawn dot over a visually-hidden native `<input type="radio">` — stays ' +
          'keyboard-focusable and form-associated, and radios with the same `name` form a group. ' +
          'Use it as a `Cell` `after` inside a `Cell Component="label"` row.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Radio {...args} name="pg" aria-label="Example" />
    </Page>
  ),
};

export const InRows: Story = {
  name: 'In rows',
  render: () => (
    <Page>
      <Section header="Auto-download media" footer="Applies on cellular data.">
        <Cell Component="label" after={<Radio name="dl" value="all" aria-label="All chats" />}>
          All chats
        </Cell>
        <Cell
          Component="label"
          after={<Radio name="dl" value="private" defaultChecked aria-label="Private chats" />}
        >
          Private chats
        </Cell>
        <Cell Component="label" after={<Radio name="dl" value="none" aria-label="Never" />}>
          Never
        </Cell>
      </Section>
    </Page>
  ),
};
