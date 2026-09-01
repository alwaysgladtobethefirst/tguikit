import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Avatar } from '../Avatar';
import { AvatarStack } from './AvatarStack';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="AvatarStack"
    lead="An overlapping row of Avatars – group members, reaction participants, a shared album. `overlap` sets how far each avatar tucks under the previous one; cap the row yourself and add a `+N` avatar for the rest."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Data Display/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flex row that pulls each child left by `overlap` px (default 8) and gives it a ' +
          '2px ring in `--tgui--bg_color` so the overlap reads cleanly. It only lays the avatars ' +
          'out – you decide the max count and render a trailing `+N` Avatar.',
      },
    },
  },
  argTypes: {
    overlap: { control: { type: 'range', min: 0, max: 24, step: 1 } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { overlap: 8 },
} satisfies Meta<typeof AvatarStack>;

export default meta;

type Story = StoryObj<typeof meta>;

const PEOPLE = ['AB', 'CD', 'EF', 'GH', 'IJ'];

export const Playground: Story = {
  render: (args) => (
    <Page>
      <AvatarStack {...args}>
        {PEOPLE.map((initials) => (
          <Avatar key={initials} size={40} acronym={initials} />
        ))}
      </AvatarStack>
    </Page>
  ),
};

export const Overflow: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>4 shown, +8 more</span>
        <AvatarStack>
          {PEOPLE.slice(0, 4).map((initials) => (
            <Avatar key={initials} size={28} acronym={initials} />
          ))}
          <Avatar
            size={28}
            acronym="+8"
            style={{ background: 'var(--tgui--secondary_fill)', color: 'var(--tgui--link_color)' }}
          />
        </AvatarStack>
      </div>
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {([24, 40, 48] as const).map((size) => (
          <div key={size} style={{ display: 'grid', gap: 8 }}>
            <span style={eyebrow}>size {size}</span>
            <AvatarStack overlap={Math.round(size / 3)}>
              {PEOPLE.map((initials) => (
                <Avatar key={initials} size={size} acronym={initials} />
              ))}
            </AvatarStack>
          </div>
        ))}
      </div>
    </Page>
  ),
};
