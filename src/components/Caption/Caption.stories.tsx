import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Text } from '../Text';
import { Caption } from './Caption';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Caption"
    lead="The smallest text in the system, for timestamps, form hints, and metadata. `level` 1 (13px, default) or 2 (11px). Renders a `span`; extends Typography for `weight` and `caps`."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The smallest text step. `level` 1 = `--tgui--caption1` (13px, default), 2 = ' +
          '`--tgui--caption2` (11px). Renders a `span`; `Component` changes the tag. Extends ' +
          'Typography (`weight`, `caps`).',
      },
    },
  },
  argTypes: {
    level: { control: 'inline-radio', options: ['1', '2'] },
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Last seen recently', level: '1' },
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Caption {...args} />
    </Page>
  ),
};

export const Levels: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        {(
          [
            ['1', '13px'],
            ['2', '11px'],
          ] as const
        ).map(([level, px]) => (
          <div key={level} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>
              level="{level}" · {px}
            </span>
            <Caption level={level}>Sent · 3:42 PM</Caption>
          </div>
        ))}
      </div>
    </Page>
  ),
};

export const AsFormHint: Story = {
  name: 'As a form hint',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 6 }}>
        <Text>Display name</Text>
        <div
          style={{ height: 44, borderRadius: 10, background: 'var(--tgui--secondary_bg_color)' }}
        />
        <Caption Component="p" style={{ color: 'var(--tgui--hint_color)' }}>
          This is how your name shows up to people you message.
        </Caption>
      </div>
    </Page>
  ),
};
