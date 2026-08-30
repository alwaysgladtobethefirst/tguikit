import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Cell } from './Cell';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Cell"
    lead="The list-row workhorse – settings entries, form fields, contact rows. Slots for `subhead`, `hint`, `subtitle`, `description`, plus `before` / `after` for icons, avatars, chevrons or switches. Built on Tappable. `multiline` wraps instead of truncating."
  >
    {children}
  </Article>
);

const Group = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gap: 1,
      borderRadius: 12,
      overflow: 'hidden',
      background: 'var(--tgui--section_separator_color)',
    }}
  >
    {children}
  </div>
);

function Chevron() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
      <path
        d="M1 1l6 6-6 6"
        stroke="var(--tgui--hint_color)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({ letter }: { letter: string }) {
  return (
    <span
      style={{
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--tgui--secondary_fill)',
        color: 'var(--tgui--link_color)',
        fontFamily: 'var(--tgui--font-family)',
        fontSize: 16,
        fontWeight: 600,
      }}
    >
      {letter}
    </span>
  );
}

const surface = { background: 'var(--tgui--section_bg_color)' };

const meta = {
  title: 'Data Display/Cell',
  component: Cell,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible list row built on Tappable. Text slots: `subhead` (label above), `children` ' +
          '(title), `hint` (dim, next to the title), `titleBadge`, `subtitle`, `description` ' +
          '(dimmest). `before` / `after` hold icons, avatars, chevrons, switches. The title and ' +
          'description steps adapt to the platform. `hovered` forces the hover style; `multiline` ' +
          'wraps long content. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    subhead: { control: 'text' },
    hint: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    hovered: { control: 'boolean' },
    multiline: { control: 'boolean' },
    before: { control: false },
    after: { control: false },
    titleBadge: { control: false },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Phone number', subtitle: '+1 555 0100' },
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Group>
        <Cell {...args} style={surface} after={<Chevron />} />
      </Group>
    </Page>
  ),
};

export const InAList: Story = {
  name: 'In a list',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 6 }}>
        <span style={{ ...eyebrow, paddingLeft: 16 }}>Account</span>
        <Group>
          <Cell style={surface} subtitle="+1 555 0100" after={<Chevron />}>
            Phone number
          </Cell>
          <Cell style={surface} subtitle="@john" after={<Chevron />}>
            Username
          </Cell>
          <Cell style={surface} subtitle="Add a few words about yourself" after={<Chevron />}>
            Bio
          </Cell>
        </Group>
      </div>
    </Page>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <Page>
      <Group>
        <Cell
          style={surface}
          before={<Avatar letter="P" />}
          subhead="Work"
          hint="edited"
          subtitle="+1 555 0100"
          description="Only people you've added can see this"
          after={<Chevron />}
        >
          Phone number
        </Cell>
      </Group>
    </Page>
  ),
};

export const Multiline: Story = {
  render: () => (
    <Page>
      <Group>
        <Cell
          style={surface}
          multiline
          subtitle="This description is long enough that it would be cut off with an ellipsis in the default single-line mode, but multiline lets it wrap onto as many lines as it needs."
        >
          Notifications
        </Cell>
      </Group>
    </Page>
  ),
};
