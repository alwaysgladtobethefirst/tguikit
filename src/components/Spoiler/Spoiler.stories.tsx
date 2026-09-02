import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Spoiler } from './Spoiler';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Spoiler"
    lead="Telegram-style hidden text. A field of theme-coloured static drifts over the blurred content until you tap or key into it; revealing wipes the static outward from the tap. Reduced motion freezes the static and de-blurs at once."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Typography/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `role="button"` span. A `<canvas>` overlay repaints per-pixel random noise every ' +
          'frame (`fps`, `density`, `accentColor` tunable) and pauses off-screen. Enter / Space ' +
          'or a click toggles it (`revealOn="hover"` for hover); `aria-pressed` tracks state and ' +
          'the content is `aria-hidden` while concealed. Revealing runs an iris — a radial mask ' +
          'that grows from the tap point wiping the static away as the text de-blurs. Reduced ' +
          'motion paints one static frame and toggles instantly.',
      },
    },
  },
  argTypes: {
    revealOn: { control: 'inline-radio', options: ['click', 'hover'] },
    density: { control: { type: 'range', min: 0.04, max: 0.3, step: 0.01 } },
    fps: { control: { type: 'range', min: 8, max: 30, step: 1 } },
    accentColor: { control: 'color' },
    revealed: { table: { disable: true } },
    children: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { children: 'they were the villain all along', revealOn: 'click', density: 0.14, fps: 24 },
} satisfies Meta<typeof Spoiler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <p style={{ margin: 0, fontSize: 16, color: 'var(--tgui--text_color)' }}>
        <Spoiler {...args} />
      </p>
    </Page>
  ),
};

export const InText: Story = {
  name: 'In a sentence',
  render: () => (
    <Page>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--tgui--text_color)' }}>
        The final twist: <Spoiler>the whole city was a simulation</Spoiler>. Do not tell anyone
        before they finish it.
      </p>
    </Page>
  ),
};
