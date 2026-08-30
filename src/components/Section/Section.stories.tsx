import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Cell } from '../Cell';
import { Section } from './Section';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Section"
    lead="Groups rows into a titled block with the platform's surface treatment (shadow on base, rounded card on iOS) and a `Divider` between each child. `header` and `footer` take a string (auto-wrapped) or a `<Section.Header>` / `<Section.Footer>` for control."
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
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wraps a set of rows (usually `Cell`s) into a settings-style group: a `Divider` ' +
          'between each child, the platform surface (box-shadow on base, a 12px rounded card ' +
          'on iOS), and an optional `header` / `footer`. A string header/footer is wrapped in ' +
          '`Section.Header` / `Section.Footer` automatically; pass the element yourself for ' +
          '`large` / `centered`. Needs a `TguiProvider`.',
      },
    },
  },
  argTypes: {
    header: { control: 'text' },
    footer: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { header: 'Account', footer: 'Your phone number is only visible to your contacts.' },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Section {...args}>
        <Cell subtitle="+1 555 0100" after={<Chevron />}>
          Phone number
        </Cell>
        <Cell subtitle="@john" after={<Chevron />}>
          Username
        </Cell>
        <Cell subtitle="Add a few words" after={<Chevron />}>
          Bio
        </Cell>
      </Section>
    </Page>
  ),
};

export const SettingsScreen: Story = {
  name: 'A settings screen',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 24 }}>
        <Section header={<Section.Header large>Settings</Section.Header>}>
          <Cell subtitle="+1 555 0100" after={<Chevron />}>
            Phone number
          </Cell>
          <Cell subtitle="@john" after={<Chevron />}>
            Username
          </Cell>
        </Section>

        <Section header="Preferences" footer="Turn this off to stop syncing over cellular data.">
          <Cell subtitle="System" after={<Chevron />}>
            Appearance
          </Cell>
          <Cell subtitle="English" after={<Chevron />}>
            Language
          </Cell>
          <Cell after={<Chevron />}>Data and Storage</Cell>
        </Section>

        <Section footer={<Section.Footer centered>Telegram for Mini Apps · v0.1.0</Section.Footer>}>
          <Cell after={<Chevron />}>Ask a Question</Cell>
          <Cell after={<Chevron />}>Privacy Policy</Cell>
        </Section>
      </div>
    </Page>
  ),
};

export const HeaderAndFooter: Story = {
  name: 'Header & footer variants',
  render: () => (
    <Page>
      <div style={{ display: 'grid', gap: 24 }}>
        <Section header="Default header" footer="Default footer text.">
          <Cell>Row</Cell>
        </Section>
        <Section
          header={<Section.Header large>Large header</Section.Header>}
          footer={<Section.Footer centered>Centered footer</Section.Footer>}
        >
          <Cell>Row</Cell>
        </Section>
      </div>
    </Page>
  ),
};
