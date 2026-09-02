import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Button } from '../Button';
import { Banner } from './Banner';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Banner"
    lead="A prominent inline message – an announcement, a promo, a heads-up. `type` `section` sits on a surface; `type` `image` lays the content over a full-bleed `background` with a scrim. Slots for a leading icon, a callout, title, subtitle, description, actions, and a close button."
  >
    {children}
  </Article>
);

const Sparkle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z" />
  </svg>
);

const meta = {
  title: 'Data Display/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `<section>` with a leading `before` slot, a text column (`callout` / `header` / ' +
          '`subheader` / `description`), an `actions` row, and an optional `onClose` button. ' +
          '`type="image"` renders `background` behind the content under a dark gradient and ' +
          'switches the text to white. Every colour is a theme token.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['section', 'image'] },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Section: Story = {
  render: () => (
    <Page>
      <Banner
        before={<Sparkle />}
        callout="New"
        header="Folders are here"
        subheader="Group your chats and switch between them with a tap."
        actions={
          <>
            <Button size="s">Set up folders</Button>
            <Button size="s" mode="plain">
              Later
            </Button>
          </>
        }
        onClose={() => {}}
      />
    </Page>
  ),
};

export const Image: Story = {
  render: () => (
    <Page>
      <Banner
        type="image"
        background={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #5b8def, #9b5bef 60%, #ef5ba1)',
            }}
          />
        }
        callout="Limited time"
        header="Send bigger files"
        subheader="Up to 4 GB per file, without limits."
        actions={
          <Button size="s" mode="white">
            Upgrade
          </Button>
        }
        onClose={() => {}}
      />
    </Page>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Page>
      <Banner header="Storage is almost full" description="Free up space to keep syncing media." />
    </Page>
  ),
};
