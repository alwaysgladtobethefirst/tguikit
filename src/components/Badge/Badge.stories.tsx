import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Badge } from './Badge';
import type { BadgeMode } from './Badge.variants';

const MODES: BadgeMode[] = ['primary', 'critical', 'secondary', 'gray', 'white'];
const SURFACE_MODES = MODES.filter((m) => m !== 'white');

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Badge"
    lead="A count pill or a status dot. `type` is `number` (default) or `dot`; `mode` sets the colour; `large` bumps the size. Sits in a `Cell` `after` slot, on a TabBar item, or beside a title."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{children}</div>
  </div>
);

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A small `<span>` — `type` `number` renders its children, `dot` ignores them. `mode` ' +
          'primary / critical / secondary / gray / white; `large` for the bigger size. Every ' +
          'colour is a theme token.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['number', 'dot'] },
    mode: { control: 'inline-radio', options: MODES },
    large: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { type: 'number', mode: 'primary', large: false, children: '7' },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <div style={{ display: 'flex' }}>
        <Badge {...args} />
      </div>
    </Page>
  ),
};

export const Modes: Story = {
  render: () => (
    <Page>
      <Row label="number">
        {SURFACE_MODES.map((mode) => (
          <Badge key={mode} mode={mode}>
            12
          </Badge>
        ))}
      </Row>
      <Row label="dot">
        {SURFACE_MODES.map((mode) => (
          <Badge key={mode} type="dot" mode={mode} />
        ))}
      </Row>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>white · for use over media</span>
        <div
          style={{
            display: 'flex',
            gap: 12,
            width: 'fit-content',
            padding: '12px 16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #4b7bec, #a55eea)',
          }}
        >
          <Badge mode="white">12</Badge>
          <Badge mode="white" type="dot" />
        </div>
      </div>
      <Row label="large">
        <Badge large>3</Badge>
        <Badge large type="dot" />
        <Badge large mode="critical">
          99+
        </Badge>
      </Row>
    </Page>
  ),
};

export const InRows: Story = {
  name: 'In rows',
  render: () => (
    <Page>
      <Section header="Chats">
        <Cell after={<Badge>4</Badge>}>Saved Messages</Cell>
        <Cell after={<Badge mode="gray">12</Badge>}>Archive</Cell>
        <Cell after={<Badge type="dot" mode="critical" />}>Support</Cell>
      </Section>
    </Page>
  ),
};
