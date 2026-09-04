import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { CompactPagination } from './CompactPagination';
import { Pagination } from './Pagination';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Pagination"
    lead="A numbered page picker (`Pagination`) and a compact dot picker (`CompactPagination`), both controlled by `page` / `count` / `onChange`. Distant pages collapse into an ellipsis."
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
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`<nav aria-label="Pagination">` with prev/next `IconButton`s and numbered page ' +
          'buttons. Always shows the first and last page plus `page ± siblingCount`; the rest ' +
          'collapses into a non-interactive `…`. The current page carries `aria-current="page"`.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { page: 1, count: 1, onChange: () => {} },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Numbered: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    return (
      <Page>
        <Row label="count=12, siblingCount=1">
          <Pagination page={page} count={12} onChange={setPage} />
        </Row>
      </Page>
    );
  },
};

export const WideSiblings: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <Page>
        <Row label="count=20, siblingCount=2">
          <Pagination page={page} count={20} onChange={setPage} siblingCount={2} />
        </Row>
      </Page>
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Page>
        <Row label="count=5">
          <CompactPagination page={page} count={5} onChange={setPage} />
        </Row>
      </Page>
    );
  },
};

export const CompactWindowed: Story = {
  render: () => {
    const [page, setPage] = useState(12);
    return (
      <Page>
        <Row label="count=30 — windowed to 7 dots">
          <CompactPagination page={page} count={30} onChange={setPage} />
        </Row>
      </Page>
    );
  },
};
