import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Switch } from './Switch';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Switch"
    lead="An on/off toggle over a native checkbox with role switch. It adopts the platform look – a Material track on base, the iOS pill. Drop it in a `Cell` `after` for a settings row."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle on top of a visually-hidden native checkbox (`role="switch"`), so it stays ' +
          'keyboard-focusable and form-associated. Platform-adaptive: a Material-style track on ' +
          'base, the iOS pill on iOS. Motion respects `prefers-reduced-motion`. Needs a ' +
          '`TguiProvider`.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Switch {...args} aria-label="Example" />
    </Page>
  ),
};

export const InRows: Story = {
  name: 'In rows',
  render: () => (
    <Page>
      <Section header="Privacy" footer="When off, your last seen time is hidden from everyone.">
        <Cell after={<Switch defaultChecked aria-label="Read receipts" />}>Read receipts</Cell>
        <Cell after={<Switch aria-label="Last seen" />}>Last seen &amp; online</Cell>
        <Cell after={<Switch disabled defaultChecked aria-label="Sync contacts" />}>
          Sync contacts
        </Cell>
      </Section>
    </Page>
  ),
};
