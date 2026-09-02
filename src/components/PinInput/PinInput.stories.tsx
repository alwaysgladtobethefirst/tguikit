import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { PinInput } from './PinInput';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="PinInput"
    lead="Segmented entry for a one-time code or passcode. Type to auto-advance, backspace to step back, paste to fill the whole thing. `type` is `numeric` or `alphanumeric`; `mask` hides the characters."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Inputs/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One `<input maxlength=1>` per cell with `inputmode` and `autocomplete="one-time-code"` ' +
          'on the first. Handles auto-advance, backspace-to-previous, arrow nav and paste-to-fill; ' +
          'reports the joined value via `onChange` and fires `onComplete` when every cell is set. ' +
          'Controlled or uncontrolled.',
      },
    },
  },
  argTypes: {
    length: { control: { type: 'number', min: 3, max: 8 } },
    type: { control: 'inline-radio', options: ['numeric', 'alphanumeric'] },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    value: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { length: 4, type: 'numeric', mask: false },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [done, setDone] = useState<string | null>(null);
    return (
      <Page>
        <div style={{ display: 'grid', gap: 12 }}>
          <PinInput {...args} value={value} onChange={setValue} onComplete={setDone} />
          <span style={eyebrow}>{done ? `submitted ${done}` : `value "${value}"`}</span>
        </div>
      </Page>
    );
  },
};

export const Passcode: Story = {
  render: () => (
    <Page>
      <PinInput length={6} type="numeric" mask defaultValue="12" aria-label="Passcode" />
    </Page>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 8 }}>
        <PinInput length={4} defaultValue="0000" invalid aria-label="Code" />
        <span style={{ ...eyebrow, color: 'var(--tgui--destructive_text_color)' }}>
          that code has expired
        </span>
      </div>
    </Page>
  ),
};
