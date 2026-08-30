import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { Placeholder } from './Placeholder';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Placeholder"
    lead="An empty state or intro screen: a centred visual, a `header`, a `description`, and an optional `action`. Any of them can be omitted."
  >
    {children}
  </Article>
);

const Illustration = () => (
  <div
    style={{
      width: 120,
      height: 120,
      borderRadius: 28,
      background: 'var(--tgui--secondary_fill)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 48,
    }}
  >
    📭
  </div>
);

const meta = {
  title: 'Data Display/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A vertically-centred column: `children` (the visual), a `header` (`Title` level 3), a ' +
          '`description` (`Text`, dim), and an `action`. Wrap it in a full-height container to ' +
          'centre it on the screen. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    description: { control: 'text' },
    action: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    header: 'No chats yet',
    description: 'Start a new conversation and it will show up here.',
  },
} satisfies Meta<typeof Placeholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Placeholder {...args} action={<Button size="s">New message</Button>}>
        <Illustration />
      </Placeholder>
    </Page>
  ),
};

export const VisualOnly: Story = {
  name: 'Visual only',
  render: () => (
    <Page>
      <Placeholder>
        <Illustration />
      </Placeholder>
    </Page>
  ),
};
