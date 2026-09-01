import type { Meta, StoryObj } from '@storybook/react-vite';
import { type CSSProperties, type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Sheet } from './Sheet';

const CONTACTS = [
  'Anna',
  'Boris',
  'Clara',
  'Dmitri',
  'Elena',
  'Felix',
  'Galina',
  'Hugo',
  'Irina',
  'Jonas',
  'Katya',
  'Lev',
];

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Sheet"
    lead="A panel that slides up from the bottom edge for a focused task or choice – confirming an action, picking from a list, a short form. Controlled through `open` / `onClose`. Drag the handle down or tap the scrim to dismiss, unless `dismissable` is false."
  >
    {children}
  </Article>
);

const stageStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  height: 620,
  padding: 24,
  overflow: 'hidden',
  borderRadius: 16,
  background: 'var(--tgui--secondary_bg_color)',
  boxShadow: 'inset 0 0 0 1px var(--tgui--outline)',
};

const Stage = ({ children }: { children: (container: HTMLElement | null) => ReactNode }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  return (
    <div ref={setNode} style={stageStyle}>
      {children(node)}
    </div>
  );
};

const meta = {
  title: 'Overlays/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A bottom sheet, controlled through `open` / `onClose`. Portals into the `TguiProvider` ' +
          'wrapper (or an explicit `container`, which also scopes it to that box), dims the page ' +
          'with a scrim, traps and restores focus, and locks body scroll. Closes on `Escape`, ' +
          'scrim tap, the header close button, or a downward drag past a threshold / flick; ' +
          '`dismissable={false}` removes all of those. Reduced motion swaps the slide for a fade. ' +
          'Height follows its content, capped at `--tgui--sheet--max-height` (default 50% of the ' +
          'scrim); past that the body scrolls. Needs a `TguiProvider`. The demos below run inside ' +
          'a bordered box so the scrim is visible; in an app the sheet covers the viewport.',
      },
    },
  },
  argTypes: {
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    container: { table: { disable: true } },
    children: { table: { disable: true } },
    dismissable: { control: 'boolean' },
  },
  args: { dismissable: true, open: false, onClose: () => {} },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Page>
        <Stage>
          {(container) => (
            <>
              <Button onClick={() => setOpen(true)}>Open sheet</Button>
              <Sheet
                {...args}
                container={container}
                open={open}
                onClose={() => setOpen(false)}
                header="Send TON"
              >
                <p style={{ margin: '0 0 16px', color: 'var(--tgui--hint_color)' }}>
                  Confirm the transfer of 5 TON to @durov. This cannot be undone.
                </p>
                <div style={{ display: 'grid', gap: 8 }}>
                  <Button size="l" stretched onClick={() => setOpen(false)}>
                    Confirm
                  </Button>
                  <Button size="l" mode="plain" stretched onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </Sheet>
            </>
          )}
        </Stage>
      </Page>
    );
  },
};

export const WithList: Story = {
  name: 'Scrollable list',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Page>
        <Stage>
          {(container) => (
            <>
              <Button onClick={() => setOpen(true)}>Choose a chat</Button>
              <Sheet
                container={container}
                open={open}
                onClose={() => setOpen(false)}
                header="Forward to"
              >
                <Section>
                  {CONTACTS.map((name) => (
                    <Cell
                      key={name}
                      subtitle={`@${name.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                    >
                      {name}
                    </Cell>
                  ))}
                </Section>
              </Sheet>
            </>
          )}
        </Stage>
      </Page>
    );
  },
};

export const NonDismissable: Story = {
  name: 'Non-dismissable',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Page>
        <Stage>
          {(container) => (
            <>
              <Button onClick={() => setOpen(true)}>Start action</Button>
              <Sheet
                container={container}
                open={open}
                onClose={() => setOpen(false)}
                dismissable={false}
                header="Signing…"
              >
                <p style={{ margin: 0, color: 'var(--tgui--hint_color)' }}>
                  Waiting for the wallet to confirm. The sheet stays until the request resolves.
                </p>
                <div style={{ marginTop: 16 }}>
                  <Button size="l" stretched mode="plain" onClick={() => setOpen(false)}>
                    Force close (demo)
                  </Button>
                </div>
              </Sheet>
            </>
          )}
        </Stage>
      </Page>
    );
  },
};
