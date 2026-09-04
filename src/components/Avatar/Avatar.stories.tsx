import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import type { AvatarSize } from './Avatar';
import { Avatar } from './Avatar';

const SIZES: AvatarSize[] = [20, 24, 28, 40, 48, 96];
const PHOTO = 'https://i.pravatar.cc/192?img=12';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Avatar"
    lead="A person or entity picture. Give it a `src`; if the image is missing or fails it falls back to the `acronym`, then to a generic icon. `size` matches the legacy scale (20 / 24 / 28 / 40 / 48 / 96)."
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
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A circular `<span>` wrapping an `<img loading="lazy">`. On error or with no `src` it ' +
          'shows the `acronym`, then a person icon. `size` is a fixed step (20 / 24 / 28 / 40 / ' +
          '48 / 96). Children render on top as a slot for a status dot.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    src: { control: 'text' },
    acronym: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { size: 40, src: PHOTO, acronym: 'JD', alt: 'John Doe' },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <div style={{ display: 'flex' }}>
        <Avatar {...args} />
      </div>
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      <Row label="image">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} src={PHOTO} alt="" />
        ))}
      </Row>
      <Row label="acronym">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} acronym="JD" />
        ))}
      </Row>
      <Row label="icon">
        {SIZES.map((size) => (
          <Avatar key={size} size={size} />
        ))}
      </Row>
    </Page>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Page>
      <Row label="broken src → acronym → icon">
        <Avatar size={48} src="/does-not-exist.png" acronym="AB" />
        <Avatar size={48} src="/does-not-exist.png" />
      </Row>
    </Page>
  ),
};

export const WithStatus: Story = {
  name: 'With status dot',
  render: () => (
    <Page>
      <Row label="online">
        <Avatar size={48} src={PHOTO} alt="">
          <span
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--tgui--button_color)',
              boxShadow: '0 0 0 2px var(--tgui--bg_color)',
            }}
          />
        </Avatar>
      </Row>
    </Page>
  ),
};
