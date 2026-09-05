import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import type { FloatingPlacement } from '../../shared/lib/floatingPosition';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Button } from '../Button';
import { Popover } from './Popover';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Popover"
    lead="An anchored panel for menus, pickers, and other transient chrome that needs focus trapping and outside-dismiss. Composed from `Popover`, `Popover.Trigger`, and `Popover.Content` as siblings – the trigger clones your control, the content portals out and positions itself against it with an 8-way `placement`."
  >
    {children}
  </Article>
);

const menuStyle: CSSProperties = {
  display: 'grid',
  padding: 6,
  minWidth: 180,
};

const menuItemStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px 10px',
  border: 'none',
  background: 'none',
  borderRadius: 8,
  textAlign: 'left',
  font: 'inherit',
  color: 'var(--tgui--text_color)',
  cursor: 'pointer',
};

const Menu = () => (
  <div style={menuStyle}>
    <button type="button" style={menuItemStyle}>
      Reply
    </button>
    <button type="button" style={menuItemStyle}>
      Forward
    </button>
    <button type="button" style={menuItemStyle}>
      Copy
    </button>
    <button type="button" style={menuItemStyle}>
      Delete
    </button>
  </div>
);

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Focus-trapping and outside-dismiss are handled by Radix primitives (`react-focus-scope`, ' +
          '`react-dismissable-layer`, `react-presence`); positioning is hand-rolled, adapted from ' +
          "this library's own Tooltip. `placement` is a side (`top` / `bottom` / `left` / `right`) " +
          'optionally suffixed with `-start` / `-end`; it flips to the opposite side when it would ' +
          'clip the viewport, and clamps on the cross axis. Portals into the `TguiProvider` wrapper. ' +
          'Closes on Escape, an outside click, or a focus that leaves the content.',
      },
    },
  },
  args: { children: null },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
        <Popover>
          <Popover.Trigger>
            <Button>Message actions</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Menu />
          </Popover.Content>
        </Popover>
      </div>
    </Page>
  ),
};

const SIDES: FloatingPlacement[] = ['top', 'bottom', 'left', 'right'];

export const Sides: Story = {
  render: () => (
    <Page>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, max-content)',
          gap: 56,
          justifyContent: 'center',
          padding: '64px 0',
        }}
      >
        {SIDES.map((side) => (
          <div key={side} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
            <span style={eyebrow}>{side}</span>
            <Popover>
              <Popover.Trigger>
                <Button mode="gray">{side}</Button>
              </Popover.Trigger>
              <Popover.Content placement={side}>
                <div style={{ padding: '10px 14px', maxWidth: 200 }}>Anchored {side}</div>
              </Popover.Content>
            </Popover>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const ALIGNS: FloatingPlacement[] = ['bottom-start', 'bottom', 'bottom-end'];

export const Align: Story = {
  render: () => (
    <Page>
      <div
        style={{
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
          padding: '48px 0',
        }}
      >
        {ALIGNS.map((placement) => (
          <div key={placement} style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
            <span style={eyebrow}>{placement}</span>
            <Popover>
              <Popover.Trigger>
                <Button mode="outline">{placement}</Button>
              </Popover.Trigger>
              <Popover.Content placement={placement}>
                <Menu />
              </Popover.Content>
            </Popover>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const stageStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 'calc(100vh - 260px)',
  minHeight: 320,
  padding: '0 24px 24px',
  borderRadius: 16,
  background: 'var(--tgui--secondary_bg_color)',
  boxShadow: 'inset 0 0 0 1px var(--tgui--outline)',
};

export const FlipsOnOverflow: Story = {
  name: 'Flips near a viewport edge',
  render: () => (
    <Page>
      <div style={stageStyle}>
        <Popover>
          <Popover.Trigger>
            <Button>Near the bottom edge</Button>
          </Popover.Trigger>
          <Popover.Content placement="bottom">
            <Menu />
          </Popover.Content>
        </Popover>
      </div>
    </Page>
  ),
};
