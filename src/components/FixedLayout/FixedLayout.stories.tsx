import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { FixedLayout } from './FixedLayout';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="FixedLayout"
    lead="Pins its content to the top or bottom edge of the viewport and adds the matching safe-area inset. Use it for a bottom action bar or a sticky header; pair it with TabBar or a stretched Button."
  >
    {children}
  </Article>
);

const Stage = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'relative',
      height: 360,
      overflow: 'hidden',
      borderRadius: 16,
      background: 'var(--tgui--secondary_bg_color)',
      boxShadow: 'inset 0 0 0 1px var(--tgui--outline)',
    }}
  >
    <div style={{ padding: 20, color: 'var(--tgui--hint_color)' }}>Scrollable page content…</div>
    {children}
  </div>
);

const meta = {
  title: 'Layout/FixedLayout',
  component: FixedLayout,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `position: fixed` full-width `<div>` glued to the `top` or `bottom` edge, with ' +
          '`env(safe-area-inset-*)` padding on that side. It carries no visual style of its own – ' +
          'give it a background and padding, or drop a `TabBar` / `Button` inside. The demos below ' +
          'run in a bordered box; in an app it spans the viewport.',
      },
    },
  },
  argTypes: {
    vertical: { control: 'inline-radio', options: ['top', 'bottom'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { vertical: 'bottom' },
} satisfies Meta<typeof FixedLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Stage>
        <FixedLayout
          {...args}
          style={{
            position: 'absolute',
            padding: 16,
            background: 'var(--tgui--bg_color)',
            boxShadow: '0 -0.5px 0 var(--tgui--outline)',
          }}
        >
          <Button size="l" stretched>
            Continue
          </Button>
        </FixedLayout>
      </Stage>
    </Page>
  ),
};

export const Header: Story = {
  render: () => (
    <Page>
      <Stage>
        <FixedLayout
          vertical="top"
          style={{
            position: 'absolute',
            padding: '12px 16px',
            fontWeight: 600,
            background: 'var(--tgui--bg_color)',
            boxShadow: '0 0.5px 0 var(--tgui--outline)',
          }}
        >
          Settings
        </FixedLayout>
      </Stage>
    </Page>
  ),
};
