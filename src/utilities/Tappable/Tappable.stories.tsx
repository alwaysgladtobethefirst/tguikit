import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { Tappable } from './Tappable';

const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";
const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";

const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};

const tile: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  minHeight: 64,
  padding: '0 20px',
  border: 'none',
  borderRadius: 12,
  background: 'var(--tgui--secondary_bg_color)',
  color: 'var(--tgui--text_color)',
  fontFamily: MONO,
  fontSize: 13,
};

function Article({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 620,
        margin: '0 auto',
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
        display: 'grid',
        gap: 40,
      }}
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 640, letterSpacing: '-0.025em' }}>
          Tappable
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          The press-feedback primitive under Button, Cell and IconButton. On the base platform it
          plays a material ripple from the pointer; on iOS it dims instead. Render it as any element
          with the Component prop. Switch platforms from the toolbar and press the tiles.
        </p>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Utilities/Tappable',
  component: Tappable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps any element and gives it Telegram-style press feedback: a pointer-anchored ' +
          'material ripple on the base platform, an opacity dim on iOS. Force one look with ' +
          '`interactiveAnimation`. `readOnly` keeps the element in place but silent; `disabled` ' +
          'also dims it. Needs a `TguiProvider` above it for the platform.',
      },
    },
  },
  argTypes: {
    interactiveAnimation: { control: 'inline-radio', options: ['background', 'opacity'] },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    Component: { control: false },
    ref: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { interactiveAnimation: 'background', readOnly: false, disabled: false },
} satisfies Meta<typeof Tappable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Article>
      <section style={{ display: 'grid', gap: 14 }}>
        <p style={eyebrow}>press me</p>
        <Tappable {...args} Component="button" style={tile}>
          Tappable
        </Tappable>
      </section>
    </Article>
  ),
};

export const Showcase: Story = {
  render: () => (
    <Article>
      <section style={{ display: 'grid', gap: 14 }}>
        <p style={eyebrow}>animation</p>
        <div style={{ display: 'grid', gap: 10 }}>
          <Tappable Component="button" style={tile}>
            interactiveAnimation="background"
          </Tappable>
          <Tappable Component="button" interactiveAnimation="opacity" style={tile}>
            interactiveAnimation="opacity"
          </Tappable>
        </div>
      </section>

      <section style={{ display: 'grid', gap: 14 }}>
        <p style={eyebrow}>states</p>
        <div style={{ display: 'grid', gap: 10 }}>
          <Tappable Component="button" readOnly style={tile}>
            readOnly — no feedback
          </Tappable>
          <Tappable Component="button" disabled style={tile}>
            disabled — dimmed, inert
          </Tappable>
        </div>
      </section>
    </Article>
  ),
};
