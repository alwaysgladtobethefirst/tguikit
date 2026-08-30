import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { TabBar } from './TabBar';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="TabBar"
    lead="The bottom navigation bar. `TabBar.Item` holds a 28×28 icon and a label; `selected` marks the active tab. Position it yourself at the bottom of the screen (it is not fixed)."
  >
    {children}
  </Article>
);

function Dot({ filled }: { filled?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <circle
        cx="14"
        cy="14"
        r="9"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

const TABS = ['Chats', 'Calls', 'Settings'];

const meta = {
  title: 'Navigation/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `nav` of `TabBar.Item` buttons (icon + `Caption` label), each `Tappable` with the ' +
          'opacity press. The bar carries the top hairline and translucent surface; on base the ' +
          'selected item gets a pill behind its icon. It is not position-fixed — wrap it ' +
          'yourself. Renamed from the old `Tabbar` / `Tabbar.Item`. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof TabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <Page>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 380,
            height: 460,
            borderRadius: 28,
            overflow: 'hidden',
            background: 'var(--tgui--secondary_bg_color)',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--tgui--outline)',
          }}
        >
          <div style={{ flexGrow: 1, display: 'grid', placeItems: 'center' }}>
            <span style={{ ...eyebrow, color: 'var(--tgui--hint_color)' }}>{TABS[active]}</span>
          </div>
          <TabBar>
            {TABS.map((t, i) => (
              <TabBar.Item key={t} text={t} selected={active === i} onClick={() => setActive(i)}>
                <Dot filled={active === i} />
              </TabBar.Item>
            ))}
          </TabBar>
        </div>
      </Page>
    );
  },
};
