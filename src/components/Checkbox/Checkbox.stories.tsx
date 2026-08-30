import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Checkbox } from './Checkbox';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Checkbox"
    lead="A styled checkbox over a real, focusable native checkbox input. `indeterminate` shows a dash for a partial selection. Pair it with a `Cell` for a labelled row."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A CSS-drawn checkbox on top of a visually-hidden native `<input type="checkbox">`, so ' +
          'it stays keyboard-focusable and form-associated. `indeterminate` is reflected onto ' +
          'the input. Use it as a `Cell` `after` for a settings toggle row.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Checkbox {...args} aria-label="Example" />
    </Page>
  ),
};

export const InRows: Story = {
  name: 'In rows',
  render: () => (
    <Page>
      <Section header="Notify me about">
        <Cell after={<Checkbox defaultChecked aria-label="Direct messages" />}>
          Direct messages
        </Cell>
        <Cell after={<Checkbox defaultChecked aria-label="Group mentions" />}>Group mentions</Cell>
        <Cell after={<Checkbox aria-label="Channel posts" />}>Channel posts</Cell>
        <Cell after={<Checkbox indeterminate aria-label="All activity" />}>All activity</Cell>
      </Section>
    </Page>
  ),
};
