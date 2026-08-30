import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Title } from './Title';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Title"
    lead="Section and page headings. `level` picks the size and the semantic tag together – 1 is an `h2` at the title-1 size, 2 an `h3` (default), 3 an `h4`. Override the tag with `Component` without changing the size."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Heading text at the `--tgui--title1..3` sizes. `level` (1/2/3, default 2) sets both ' +
          'the size and the tag (h2/h3/h4). Extends Typography, so `weight` and `caps` work; ' +
          '`Component` overrides just the tag.',
      },
    },
  },
  argTypes: {
    level: { control: 'inline-radio', options: ['1', '2', '3'] },
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Mini App settings', level: '2' },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Title {...args} />
    </Page>
  ),
};

export const Levels: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {(
          [
            ['1', 'h2'],
            ['2', 'h3'],
            ['3', 'h4'],
          ] as const
        ).map(([level, tag]) => (
          <div key={level} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>
              level="{level}" · {tag}
            </span>
            <Title level={level}>Mini App settings</Title>
          </div>
        ))}
      </div>
    </Page>
  ),
};
