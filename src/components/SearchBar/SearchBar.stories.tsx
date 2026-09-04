import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { SearchBar } from './SearchBar';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="SearchBar"
    lead="A controlled, iOS-style pill search field. A clear × appears once there's a value; give it `onCancel` for a Cancel button that fades in on focus."
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

const meta = {
  title: 'Inputs/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A native `<input type="search">` in a filled pill (`--tgui--tertiary_bg_color`), a ' +
          'magnifier at the start, and a clear button that shows once `value` is non-empty. ' +
          'Pass `onCancel` for a text button that fades in beside the field on focus and calls ' +
          'back, then blurs. `label` sets `aria-label` (defaults to "Search").',
      },
    },
  },
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { value: '', onChange: () => {} },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Page>
        <div style={{ maxWidth: 360 }}>
          <SearchBar value={value} onChange={setValue} />
        </div>
      </Page>
    );
  },
};

export const WithCancel: Story = {
  render: () => {
    const [value, setValue] = useState('Design team');
    return (
      <Page>
        <Row label="focus the field to reveal Cancel">
          <div style={{ maxWidth: 360 }}>
            <SearchBar value={value} onChange={setValue} onCancel={() => setValue('')} />
          </div>
        </Row>
      </Page>
    );
  },
};
