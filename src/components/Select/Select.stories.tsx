import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Section } from '../Section';
import { Select } from './Select';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Select"
    lead="A native `select` in the field container, with a custom chevron and the platform ring. `header` is the floating label on base; `status` pins the error / focused state."
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
          'the same field container as `Input` (floating `header` on base, ring on focus/error). ' +
          'Keeps the OS picker on mobile. Needs a `TguiProvider`.',
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
      <Section>
        <Select {...args} defaultValue="en">
          {languages}
        </Select>
      </Section>
    </Page>
  ),
};

export const States: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        <Section>
          <Select header="Default" defaultValue="en">
            {languages}
          </Select>
        </Section>
        <Section>
          <Select header="Error" status="error" defaultValue="de">
            {languages}
          </Select>
        </Section>
        <Section>
          <Select header="Disabled" disabled defaultValue="fr">
            {languages}
          </Select>
        </Section>
      </div>
    </Page>
  ),
};
