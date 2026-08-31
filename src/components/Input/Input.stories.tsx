import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Input } from './Input';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Input"
    lead="A single-line text field. On base it is an outlined field with a floating `header` label; on iOS it is a filled field. `before` / `after` slot icons or a clear button; `status` pins the error / focused ring, otherwise it follows focus."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input with a platform-aware container. Base: an outlined field with a floating ' +
          '`header` label. iOS: a filled field — stack a few with a gap for a form. `status` is ' +
          '`default` | `error` | `focused` (pins the ring); left unset it tracks focus. Needs a ' +
          '`TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'search'] },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    status: { control: 'inline-radio', options: [undefined, 'default', 'error', 'focused'] },
    disabled: { control: 'boolean' },
    before: { control: false },
    after: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { header: 'Name', placeholder: 'Enter your name' },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Input {...args} />
    </Page>
  ),
};

export const States: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 20 }}>
        {(['default', 'focused', 'error'] as const).map((status) => (
          <div key={status} style={{ display: 'grid', gap: 8 }}>
            <span style={eyebrow}>status="{status}"</span>
            <Input header="Email" placeholder="you@example.com" status={status} />
          </div>
        ))}
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>disabled</span>
          <Input header="Email" defaultValue="locked@example.com" disabled />
        </div>
      </div>
    </Page>
  ),
};

export const Form: Story = {
  name: 'Form (iOS)',
  globals: { platform: 'ios' },
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        <Input placeholder="First name" defaultValue="Ada" />
        <Input placeholder="Last name" defaultValue="Lovelace" />
        <Input placeholder="Email" type="email" defaultValue="ada@example.com" />
      </div>
    </Page>
  ),
};
