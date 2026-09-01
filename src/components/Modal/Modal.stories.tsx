import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { Modal } from './Modal';

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
    title="Modal"
    lead="A bottom sheet rendered through a Portal. Drag the handle down or tap the scrim to dismiss (unless `dismissable` is false). `Escape` closes it, focus is trapped and restored, body scroll is locked. Reduced motion swaps the slide for a fade."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A controlled bottom sheet: `open` + `onClose`. Portals into the `TguiProvider` wrapper, ' +
          'dims the page with a scrim, traps focus, locks body scroll, and closes on `Escape`, ' +
          'scrim tap, the header close button, or a downward drag past a threshold / flick. ' +
          '`dismissable={false}` removes every implicit close. Needs a `TguiProvider`.',
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
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Page>
        <Button onClick={() => setOpen(true)}>Open sheet</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} header="Send TON">
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
        </Modal>
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
        <Button onClick={() => setOpen(true)}>Choose a chat</Button>
        <Modal open={open} onClose={() => setOpen(false)} header="Forward to">
          <Section>
            {CONTACTS.map((name) => (
              <Cell key={name} subtitle={`@${name.toLowerCase()}`} onClick={() => setOpen(false)}>
                {name}
              </Cell>
            ))}
          </Section>
        </Modal>
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
        <Button onClick={() => setOpen(true)}>Start action</Button>
        <Modal open={open} onClose={() => setOpen(false)} dismissable={false} header="Signing…">
          <p style={{ margin: 0, color: 'var(--tgui--hint_color)' }}>
            Waiting for the wallet to confirm. The sheet stays until the request resolves.
          </p>
          <div style={{ marginTop: 16 }}>
            <Button size="l" stretched mode="plain" onClick={() => setOpen(false)}>
              Force close (demo)
            </Button>
          </div>
        </Modal>
      </Page>
    );
  },
};
