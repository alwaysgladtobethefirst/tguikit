import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Chip } from './Chip';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Chip"
    lead="A compact token – a filter, a selection pill, or a removable input tag. `mode` is `elevated` (default) or `outline`. Give it an `onClick` to make it selectable, an `onRemove` for a trailing clear button, and `before` / `after` for an icon or avatar."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
  </div>
);

const meta = {
  title: 'Actions/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A pill-shaped token. `mode` `elevated` (surface + shadow) or `outline` (hairline). ' +
          '`onClick` makes it a selectable control (adds a hover state); `onRemove` renders a ' +
          'trailing × that stops propagation. `before` / `after` take an icon or avatar. Every ' +
          'colour is a theme token.',
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['elevated', 'outline'] },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { mode: 'elevated', children: 'All chats' },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <div style={{ display: 'flex' }}>
        <Chip {...args} />
      </div>
    </Page>
  ),
};

export const Modes: Story = {
  render: () => (
    <Page>
      <Row label="elevated">
        <Chip>All</Chip>
        <Chip>Unread</Chip>
        <Chip>Groups</Chip>
      </Row>
      <Row label="outline">
        <Chip mode="outline">All</Chip>
        <Chip mode="outline">Unread</Chip>
        <Chip mode="outline">Groups</Chip>
      </Row>
    </Page>
  ),
};

const FILTERS = ['All', 'Unread', 'Personal', 'Groups', 'Channels', 'Bots'];

export const Filters: Story = {
  render: () => {
    const [active, setActive] = useState('All');
    return (
      <Page>
        <Row label="single select">
          {FILTERS.map((name) => (
            <Chip
              key={name}
              mode={active === name ? 'elevated' : 'outline'}
              onClick={() => setActive(name)}
            >
              {name}
            </Chip>
          ))}
        </Row>
      </Page>
    );
  },
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['Design', 'Frontend', 'Telegram', 'Open source']);
    return (
      <Page>
        <Row label="input tags">
          {tags.map((tag) => (
            <Chip
              key={tag}
              mode="outline"
              onRemove={() => setTags((current) => current.filter((t) => t !== tag))}
            >
              {tag}
            </Chip>
          ))}
          {tags.length === 0 ? (
            <button type="button" style={eyebrow} onClick={() => setTags(['Design', 'Frontend'])}>
              reset
            </button>
          ) : null}
        </Row>
      </Page>
    );
  },
};
