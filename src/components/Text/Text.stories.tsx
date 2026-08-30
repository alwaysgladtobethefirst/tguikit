import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Text } from './Text';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Text"
    lead="General-purpose body text at the `text` step of the scale (17px). Built on Typography, so it takes `weight`, `caps` and a `Component` override. No margin of its own – spacing is the layout's job."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Body text at the `--tgui--text` size. Extends Typography: `weight` (1 bold, ' +
          '2 semibold, 3 regular), `caps` for uppercase, `Component` to change the tag ' +
          '(defaults to `span`). Renders with no margin.',
      },
    },
  },
  argTypes: {
    weight: { control: 'inline-radio', options: [undefined, '1', '2', '3'] },
    caps: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'The quick brown fox jumps over the lazy dog' },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Text {...args} />
    </Page>
  ),
};

export const Weights: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        {(
          [
            ['1', 'bold'],
            ['2', 'semibold'],
            ['3', 'regular (default)'],
          ] as const
        ).map(([weight, label]) => (
          <div key={weight} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>
              weight="{weight}" · {label}
            </span>
            <Text weight={weight}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        ))}
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>caps</span>
          <Text caps>The quick brown fox jumps over the lazy dog</Text>
        </div>
      </div>
    </Page>
  ),
};

export const AsParagraph: Story = {
  name: 'As a paragraph',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 4 }}>
        <span style={eyebrow}>Component="p"</span>
        <Text Component="p">
          Telegram Mini Apps run inside the Telegram client, so their typography has to sit
          comfortably next to native chrome. Text keeps the client's font family and the platform's
          line height, and leans on the design tokens for everything else.
        </Text>
      </div>
    </Page>
  ),
};
