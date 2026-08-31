import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Section } from '../Section';
import { Select } from './Select';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Select"
    lead="A native `select` styled to match Input. On base it is a self-contained outlined field with a floating `header`; on iOS it is a borderless row for a `Section`. Custom chevron, native OS picker on mobile."
  >
    {children}
  </Article>
);

const languages = (
  <>
    <option value="en">English</option>
    <option value="de">Deutsch</option>
    <option value="fr">Français</option>
    <option value="uk">Українська</option>
  </>
);

const meta = {
  title: 'Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled wrapper around a native `<select>` — `appearance: none`, a CSS chevron, and ' +
          'the same field container as `Input`. Base: outlined field with a floating `header`, ' +
          'used on its own. iOS: a borderless row that takes its framing from the surrounding ' +
          '`Section`. `status` is `default` | `error` | `focused`. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    status: { control: 'inline-radio', options: [undefined, 'default', 'error', 'focused'] },
    disabled: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { header: 'Language' },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Select {...args} defaultValue="en">
        {languages}
      </Select>
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
            <Select header="Language" status={status} defaultValue="en">
              {languages}
            </Select>
          </div>
        ))}
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>disabled</span>
          <Select header="Language" disabled defaultValue="fr">
            {languages}
          </Select>
        </div>
      </div>
    </Page>
  ),
};

export const InAList: Story = {
  name: 'In a list (iOS)',
  globals: { platform: 'ios' },
  render: () => (
    <Page>
      <Section header="Preferences">
        <Select defaultValue="en">{languages}</Select>
        <Select defaultValue="uk">{languages}</Select>
      </Section>
    </Page>
  ),
};
