import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Blockquote } from './Blockquote';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Blockquote"
    lead="A quoted passage with an accent bar down the leading edge, like a forwarded reply in Telegram. Pass an `author` for the attribution line."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `<blockquote>` on `--tgui--secondary_fill` with a `--tgui--link_color` bar on the ' +
          'inline-start edge. `author` renders a muted `<cite>` under the quote. Every colour is a ' +
          'theme token.',
      },
    },
  },
  argTypes: {
    author: { control: 'text' },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    children: 'The best interface is the one that gets out of your way.',
    author: '— a product review',
  },
} satisfies Meta<typeof Blockquote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Blockquote {...args} />
    </Page>
  ),
};

export const Plain: Story = {
  render: () => (
    <Page>
      <Blockquote>Ship the smallest thing that could possibly work, then iterate.</Blockquote>
    </Page>
  ),
};
