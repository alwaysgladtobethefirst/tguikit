import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Textarea } from './Textarea';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Textarea"
    lead="The multi-line sibling of Input. Same platform-aware container, `header` label and `status` ring. `autoGrow` grows the box with the text up to `maxRows`, then scrolls."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text field sharing Input's container. Base: outlined with a floating " +
          '`header`. iOS: filled. `status` pins default / error / focused; unset it tracks ' +
          'focus. `autoGrow` + `maxRows` size it to the content. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 12 } },
    autoGrow: { control: 'boolean' },
    maxRows: { control: { type: 'number', min: 1, max: 20 } },
    status: { control: 'inline-radio', options: [undefined, 'default', 'error', 'focused'] },
    disabled: { control: 'boolean' },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { header: 'About', placeholder: 'Tell people a little about yourself' },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Textarea {...args} />
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
            <Textarea header="Bio" placeholder="A line or two" status={status} />
          </div>
        ))}
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>disabled</span>
          <Textarea header="Bio" defaultValue="This field is locked." disabled />
        </div>
      </div>
    </Page>
  ),
};

export const AutoGrow: Story = {
  name: 'Auto grow',
  render: () => (
    <Page>
      <Textarea
        header="Message"
        autoGrow
        maxRows={8}
        defaultValue={
          'Type a few lines here.\nThe box grows with the text\nup to eight rows, then it scrolls.'
        }
      />
    </Page>
  ),
};

export const Form: Story = {
  name: 'Form (iOS)',
  globals: { platform: 'ios' },
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        <Textarea placeholder="Bio" defaultValue="Building small, sturdy UI components." />
        <Textarea placeholder="Notes" autoGrow maxRows={6} />
      </div>
    </Page>
  ),
};
