import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Button } from './Button';
import type { ButtonMode } from './Button.variants';

const MODES: ButtonMode[] = ['filled', 'bezeled', 'plain', 'gray', 'outline', 'white'];

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Button"
    lead="The primary action control. `mode` sets the visual style, `size` the height and label. Built on Tappable, so it ripples on base and dims on iOS. `before` / `after` take an icon; `loading` swaps the label for a spinner and blocks input."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The primary action control, built on Tappable. `mode` (filled / bezeled / plain / ' +
          'gray / outline / white) sets the look; `size` (s / m / l) the height and label size. ' +
          '`stretched` fills the container, `loading` shows a spinner and blocks input, ' +
          '`before` / `after` slot an icon. `Component` renders it as a link. Needs a ' +
          '`TguiProvider` for the platform.',
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: MODES },
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    stretched: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    before: { control: false },
    after: { control: false },
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'Continue', mode: 'filled', size: 'm' },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Button {...args} />
    </Page>
  ),
};

export const Modes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 16 }}>
        {MODES.map((mode) => (
          <Row key={mode} label={mode}>
            <Button mode={mode}>Continue</Button>
          </Row>
        ))}
      </div>
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      {(['s', 'm', 'l'] as const).map((size) => (
        <Row key={size} label={`size="${size}"`}>
          <Button size={size}>Continue</Button>
          <Button size={size} mode="bezeled" before={<PlusIcon />}>
            Add
          </Button>
        </Row>
      ))}
    </Page>
  ),
};

export const WithIcons: Story = {
  name: 'With icons',
  render: () => (
    <Page>
      <Row label="before">
        <Button before={<PlusIcon />}>New chat</Button>
      </Row>
      <Row label="after">
        <Button mode="bezeled" after={<PlusIcon />}>
          Invite
        </Button>
      </Row>
      <Row label="icon only">
        <Button size="s" mode="gray" aria-label="Add">
          <PlusIcon />
        </Button>
      </Row>
    </Page>
  ),
};

export const States: Story = {
  render: () => (
    <Page>
      <Row label="loading">
        <Button loading>Continue</Button>
        <Button loading mode="bezeled">
          Saving
        </Button>
      </Row>
      <Row label="disabled">
        <Button disabled>Continue</Button>
        <Button disabled mode="outline">
          Continue
        </Button>
      </Row>
      <div style={{ display: 'grid', gap: 8 }}>
        <span style={eyebrow}>stretched</span>
        <Button stretched>Continue</Button>
      </div>
    </Page>
  ),
};
