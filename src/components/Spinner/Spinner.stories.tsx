import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Spinner } from './Spinner';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Spinner"
    lead="An indeterminate activity indicator. `size` is `s` / `m` / `l`; the colour is `currentColor`, so it inherits the surrounding text colour. It slows down under `prefers-reduced-motion` rather than stopping."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A CSS ring with `role="status"` and a default `Loading` label. `size` s / m / l. ' +
          'Colour follows `currentColor` — wrap it or set `color` to tint it. Under ' +
          '`prefers-reduced-motion: reduce` the spin slows to 1.6s.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Spinner {...args} />
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {(['s', 'm', 'l'] as const).map((size) => (
          <div key={size} style={{ display: 'grid', gap: 10, justifyItems: 'center' }}>
            <Spinner size={size} />
            <span style={eyebrow}>{size}</span>
          </div>
        ))}
      </div>
    </Page>
  ),
};

export const Tint: Story = {
  name: 'Takes the text colour',
  render: () => (
    <Page>
      <div style={{ display: 'flex', gap: 28 }}>
        <span style={{ color: 'var(--tgui--link_color)' }}>
          <Spinner />
        </span>
        <span style={{ color: 'var(--tgui--hint_color)' }}>
          <Spinner />
        </span>
        <span style={{ color: 'var(--tgui--destructive_text_color)' }}>
          <Spinner />
        </span>
      </div>
    </Page>
  ),
};
