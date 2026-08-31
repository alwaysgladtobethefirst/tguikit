import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Typography } from './Typography';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Typography"
    lead="The low-level base every named typography component (Text, Title, Headline, …) extends. It only owns the font family, weight and caps – size and line height come from whichever component wraps it. Reach for a named component first; use Typography directly for a one-off."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Primitives/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The low-level base every named typography component (Text, Title, Headline, …) ' +
          'extends. It only owns the font family, weight and caps – the size and line height ' +
          'come from whichever component wraps it. Reach for a named component first; use ' +
          'Typography directly when you need a one-off.',
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
  args: { children: 'The quick brown fox' },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Typography {...args} style={{ fontSize: 20 }} />
    </Page>
  ),
};

export const Weights: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        {(['1', '2', '3'] as const).map((weight) => (
          <div key={weight} style={{ display: 'grid', gap: 4 }}>
            <span style={eyebrow}>weight="{weight}"</span>
            <Typography weight={weight} style={{ fontSize: 20 }}>
              The quick brown fox jumps over the lazy dog
            </Typography>
          </div>
        ))}
        <div style={{ display: 'grid', gap: 4 }}>
          <span style={eyebrow}>caps</span>
          <Typography caps style={{ fontSize: 20 }}>
            The quick brown fox jumps over the lazy dog
          </Typography>
        </div>
      </div>
    </Page>
  ),
};
