import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Breadcrumbs } from './Breadcrumbs';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Breadcrumbs"
    lead="A trail of `items`. The last one renders as plain current-page text; earlier ones are links (`href`) or buttons (`onClick`). Past `maxItems` (default 4) the middle collapses into a non-interactive ellipsis."
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
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`<nav aria-label="Breadcrumbs">` wrapping an `<ol>`. Every item but the last is a ' +
          'link or button, separated by an inline chevron; the last item carries ' +
          '`aria-current="page"` and is plain text. `maxItems` controls when the middle ' +
          'collapses into `…`.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { items: [{ label: 'Home' }] },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page>
      <Row label="short trail">
        <Breadcrumbs
          items={[
            { label: 'Chats', href: '#' },
            { label: 'Design team', href: '#' },
            { label: 'Files' },
          ]}
        />
      </Row>
    </Page>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Page>
      <Row label="maxItems=4, 7 items">
        <Breadcrumbs
          maxItems={4}
          items={[
            { label: 'Home', href: '#' },
            { label: 'Chats', href: '#' },
            { label: 'Design team', href: '#' },
            { label: '2024', href: '#' },
            { label: 'Q3', href: '#' },
            { label: 'Assets', href: '#' },
            { label: 'Final.png' },
          ]}
        />
      </Row>
    </Page>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Page>
      <Row label="onClick instead of href">
        <Breadcrumbs
          items={[
            { label: 'Root', onClick: () => {} },
            { label: 'Folder', onClick: () => {} },
            { label: 'File.txt' },
          ]}
        />
      </Row>
    </Page>
  ),
};
