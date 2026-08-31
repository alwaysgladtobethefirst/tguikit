import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { List } from './List';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="List"
    lead="The outermost container for a screen of content. It spaces its children (usually `Section`s) 12px apart and, on iOS, adds the page's side padding. Render it as `main` or `ul` with `Component`."
  >
    {children}
  </Article>
);

function Chevron() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
      <path
        d="M1 1l6 6-6 6"
        stroke="var(--tgui--hint_color)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const meta = {
  title: 'Layout/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A thin layout container: 12px gap between children, plus `10px 18px` padding on iOS ' +
          '(the platform page inset). Defaults to a `div`; use `Component` for `main` / `ul`. ' +
          'Wrap your `Section`s in it. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    Component: { control: false },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Page>
      <List Component="main">
        <Section header={<Section.Header large>Settings</Section.Header>}>
          <Cell subtitle="+1 555 0100" after={<Chevron />}>
            Phone number
          </Cell>
          <Cell subtitle="@john" after={<Chevron />}>
            Username
          </Cell>
        </Section>

        <Section
          header="Preferences"
          footer="Sync happens over Wi-Fi only unless you allow cellular."
        >
          <Cell subtitle="System" after={<Chevron />}>
            Appearance
          </Cell>
          <Cell subtitle="English" after={<Chevron />}>
            Language
          </Cell>
        </Section>

        <Section footer={<Section.Footer centered>tgui · v0.1.0</Section.Footer>}>
          <Cell after={<Chevron />}>Ask a Question</Cell>
        </Section>
      </List>
    </Page>
  ),
};
