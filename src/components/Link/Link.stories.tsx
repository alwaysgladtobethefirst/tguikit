import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Link } from './Link';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Link"
    lead="An inline anchor in the theme's link colour. Opening in a new tab adds a safe `rel` and a small outbound arrow. Underlines on hover, shows a focus ring."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled anchor. Colour is `--tgui--link_color`; no underline until hover; a ' +
          'focus-visible ring. Opening in a new tab auto-fills `rel="noopener noreferrer"` ' +
          '(unless you set your own) and appends an arrow glyph.',
      },
    },
  },
  argTypes: {
    href: { control: 'text' },
    target: { control: 'inline-radio', options: [undefined, '_blank'] },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { href: '#', children: 'Read the docs' },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Link {...args} />
    </Page>
  ),
};

export const InText: Story = {
  name: 'In a paragraph',
  render: () => (
    <Page>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--tgui--text_color)' }}>
        Built on the <Link href="#">Telegram Mini Apps</Link> platform. Source and issues live{' '}
        <Link href="https://github.com" target="_blank">
          on GitHub
        </Link>
        .
      </p>
    </Page>
  ),
};
