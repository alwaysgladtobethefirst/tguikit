import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { InlineButtons } from './InlineButtons';
import { InlineButtonsItem } from './InlineButtonsItem';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="InlineButtons"
    lead="A row of icon-over-label actions that share the available width evenly, like the call-sheet buttons in a chat. `mode` — `bezeled` (default), `plain`, or `gray` — applies to every item. Scrolls horizontally instead of wrapping when it runs out of room."
  >
    {children}
  </Article>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span style={eyebrow}>{label}</span>
    {children}
  </div>
);

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 6a2 2 0 0 1 1-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const VideoIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 7h11v10H4zM15 10.5l5-3v9l-5-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const MuteIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 9v3a3 3 0 0 0 5.2 2M12 5a3 3 0 0 1 3 3v1m-3 7v3m-3 0h6M4 4l16 16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Actions/InlineButtons',
  component: InlineButtons,
  subcomponents: { InlineButtonsItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`InlineButtons` renders `role="group"` and shares its `mode` with every ' +
          '`InlineButtonsItem` through context. Each item is `flex: 1 1 0` — an icon over a ' +
          '`caption2` label — and the row scrolls horizontally rather than wrapping when items ' +
          "don't fit.",
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['bezeled', 'plain', 'gray'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { mode: 'bezeled' },
} satisfies Meta<typeof InlineButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <InlineButtons {...args}>
        <InlineButtonsItem icon={PhoneIcon}>Call</InlineButtonsItem>
        <InlineButtonsItem icon={VideoIcon}>Video</InlineButtonsItem>
        <InlineButtonsItem icon={MuteIcon}>Mute</InlineButtonsItem>
      </InlineButtons>
    </Page>
  ),
};

export const Modes: Story = {
  render: () => (
    <Page>
      <Row label="bezeled">
        <InlineButtons mode="bezeled">
          <InlineButtonsItem icon={PhoneIcon}>Call</InlineButtonsItem>
          <InlineButtonsItem icon={VideoIcon}>Video</InlineButtonsItem>
          <InlineButtonsItem icon={MuteIcon}>Mute</InlineButtonsItem>
        </InlineButtons>
      </Row>
      <Row label="plain">
        <InlineButtons mode="plain">
          <InlineButtonsItem icon={PhoneIcon}>Call</InlineButtonsItem>
          <InlineButtonsItem icon={VideoIcon}>Video</InlineButtonsItem>
          <InlineButtonsItem icon={MuteIcon}>Mute</InlineButtonsItem>
        </InlineButtons>
      </Row>
      <Row label="gray">
        <InlineButtons mode="gray">
          <InlineButtonsItem icon={PhoneIcon}>Call</InlineButtonsItem>
          <InlineButtonsItem icon={VideoIcon}>Video</InlineButtonsItem>
          <InlineButtonsItem icon={MuteIcon}>Mute</InlineButtonsItem>
        </InlineButtons>
      </Row>
    </Page>
  ),
};

export const Overflowing: Story = {
  render: () => (
    <Page>
      <Row label="many items — scrolls instead of wrapping">
        <div style={{ maxWidth: 260 }}>
          <InlineButtons>
            <InlineButtonsItem icon={PhoneIcon}>Call</InlineButtonsItem>
            <InlineButtonsItem icon={VideoIcon}>Video</InlineButtonsItem>
            <InlineButtonsItem icon={MuteIcon}>Mute</InlineButtonsItem>
            <InlineButtonsItem icon={PhoneIcon} disabled>
              Forward
            </InlineButtonsItem>
            <InlineButtonsItem icon={VideoIcon}>Add</InlineButtonsItem>
          </InlineButtons>
        </div>
      </Row>
    </Page>
  ),
};
