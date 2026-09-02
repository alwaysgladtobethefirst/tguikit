import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { SnackbarProvider } from './SnackbarProvider';
import { useSnackbar } from './useSnackbar';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Snackbar"
    lead="A transient message pinned to the bottom edge. Call `useSnackbar().show()` from anywhere under `<SnackbarProvider>`. It auto-dismisses (pause on hover), takes an optional action, and can be swiped away. Reduced motion drops the slide."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Feedback/Snackbar',
  component: SnackbarProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrap your app (below `TguiProvider`) in `<SnackbarProvider>`, then `useSnackbar()` gives ' +
          'you `show(options)` → id and `dismiss(id)`. `show` takes `message`, `description`, ' +
          '`before`, `action` `{ label, onClick }` and `duration` (0 = sticky). The stack is ' +
          'capped at `max` (default 3); each toast pauses its timer on hover / focus and can be ' +
          'flicked left or right to dismiss.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  args: { children: null },
} satisfies Meta<typeof SnackbarProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function Demo() {
  const snackbar = useSnackbar();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button size="s" onClick={() => snackbar.show({ message: 'Link copied', before: CheckIcon })}>
        Simple
      </Button>
      <Button
        size="s"
        mode="bezeled"
        onClick={() =>
          snackbar.show({
            message: 'Message deleted',
            description: 'It can still be restored for 30 days.',
            action: { label: 'Undo', onClick: () => {} },
            duration: 6000,
          })
        }
      >
        With action
      </Button>
      <Button
        size="s"
        mode="bezeled"
        onClick={() => snackbar.show({ message: 'Uploading… tap to keep me around', duration: 0 })}
      >
        Sticky
      </Button>
      <Button
        size="s"
        mode="gray"
        onClick={() => {
          snackbar.show({ message: 'First' });
          snackbar.show({ message: 'Second' });
          snackbar.show({ message: 'Third' });
          snackbar.show({ message: 'Fourth — pushes the first out' });
        }}
      >
        Stack
      </Button>
    </div>
  );
}

export const Playground: Story = {
  render: () => (
    <SnackbarProvider>
      <Page>
        <Demo />
      </Page>
    </SnackbarProvider>
  ),
};
