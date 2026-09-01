import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { IconButton } from './IconButton';
import type { IconButtonMode } from './IconButton.variants';

const MODES: IconButtonMode[] = ['plain', 'bezeled', 'gray', 'outline'];

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="IconButton"
    lead="An icon-only button, built on Tappable like Button. `mode` sets the fill, `size` the square (30 / 36 / 44), `circle` rounds it fully. Always pass an `aria-label`."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{children}</div>
  </div>
);

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icon-only button on Tappable. `mode` plain / bezeled / gray / outline, `size` s / m / l ' +
          '(30 / 36 / 44px square), `circle` for a round hit target. `Component` renders it as a ' +
          'link. Needs a `TguiProvider`. Requires an `aria-label`.',
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: MODES },
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    circle: { control: 'boolean' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { mode: 'plain', size: 'm', circle: false, 'aria-label': 'Add' },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <IconButton {...args}>
        <PlusIcon />
      </IconButton>
    </Page>
  ),
};

export const Modes: Story = {
  render: () => (
    <Page>
      {MODES.map((mode) => (
        <Row key={mode} label={mode}>
          <IconButton mode={mode} aria-label="Add">
            <PlusIcon />
          </IconButton>
          <IconButton mode={mode} circle aria-label="Add">
            <PlusIcon />
          </IconButton>
        </Row>
      ))}
    </Page>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Page>
      <Row label="s / m / l">
        {(['s', 'm', 'l'] as const).map((size) => (
          <IconButton key={size} mode="gray" size={size} circle aria-label="Add">
            <PlusIcon />
          </IconButton>
        ))}
      </Row>
    </Page>
  ),
};
