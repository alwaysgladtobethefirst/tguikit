import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Skeleton } from './Skeleton';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Skeleton"
    lead="A loading placeholder with a shimmer sweep. Use it as a sized block, or wrap real content and toggle `visible` — the layout is kept, the content hidden. The sweep stops under `prefers-reduced-motion`."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `<div>` on the `--tgui--skeleton` token with a sweeping gradient `::after`. `visible` ' +
          '(default true) toggles it; wrap children to keep their footprint while they load. ' +
          '`prefers-reduced-motion` freezes the sweep, `prefers-reduced-transparency` makes it solid.',
      },
    },
  },
  argTypes: {
    visible: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { visible: true },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Skeleton {...args} style={{ width: 240, height: 20 }} />
    </Page>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 12 }}>
        <span style={eyebrow}>text lines</span>
        <Skeleton style={{ height: 14, borderRadius: 4 }} />
        <Skeleton style={{ height: 14, width: '70%', borderRadius: 4 }} />
        <span style={{ ...eyebrow, marginTop: 12 }}>avatar + block</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Skeleton style={{ width: 44, height: 44, borderRadius: '50%' }} />
          <Skeleton style={{ flex: 1, height: 44 }} />
        </div>
      </div>
    </Page>
  ),
};

export const WrappingContent: Story = {
  name: 'Wrapping content',
  render: () => (
    <Page>
      <Section header="Loading">
        <Cell subtitle="+1 555 0100" after={<span>›</span>}>
          <Skeleton style={{ width: 140 }}>Phone number</Skeleton>
        </Cell>
        <Cell subtitle="@john" after={<span>›</span>}>
          <Skeleton visible={false} style={{ width: 100 }}>
            Username
          </Skeleton>
        </Cell>
      </Section>
    </Page>
  ),
};
