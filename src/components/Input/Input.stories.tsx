import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Section } from '../Section';
import { Input } from './Input';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Input"
    lead="A single-line text field. `header` is a floating label (base platform); `before` / `after` slot icons or actions; `status` pins the error / focused ring, otherwise it follows focus. Wrap groups in a Section."
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
          'Text input with a platform-aware container: a boxed field with a floating `header` ' +
          'label on base, a rounded row on iOS. `status` is `default` | `error` | `focused` ' +
          '(pins the ring); left unset it tracks focus. `before` / `after` hold icons or a ' +
          'clear button. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    placeholder: { control: 'text' },
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
      <Section>
        <Input {...args} />
      </Section>
    </Page>
  ),
};

export const States: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {(['default', 'focused', 'error'] as const).map((status) => (
          <div key={status} style={{ display: 'grid', gap: 8 }}>
            <span style={eyebrow}>status="{status}"</span>
            <Section>
              <Input header="Email" placeholder="you@example.com" status={status} />
            </Section>
          </div>
        ))}
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>disabled</span>
          <Section>
            <Input header="Email" defaultValue="locked@example.com" disabled />
          </Section>
        </div>
      </div>
    </Page>
  ),
};
