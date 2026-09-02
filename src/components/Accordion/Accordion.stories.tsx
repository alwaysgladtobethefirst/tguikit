import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { Section } from '../Section';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Accordion"
    lead="Stacked disclosure sections. One open at a time by default, or `multiple`. The panel height animates open and closed; reduced motion snaps. Each header is a `<button>` wired to its panel with `aria-expanded` / `aria-controls`."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`Accordion` holds the open state (controlled via `value` + `onChange`, or uncontrolled ' +
          'via `defaultValue`); `AccordionItem` takes a `value` and a `header`. Height is animated ' +
          'with the `grid-template-rows: 0fr → 1fr` technique — no measuring — and a closed panel ' +
          'is `inert`.',
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    value: { table: { disable: true } },
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { multiple: false },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const FAQ = [
  {
    value: 'launch',
    header: 'How do I launch a Mini App?',
    body: 'Register a bot with @BotFather, set its Web App URL, and open it from a button or the attachment menu.',
  },
  {
    value: 'theme',
    header: 'Does it follow the Telegram theme?',
    body: 'Yes — TguiProvider reads the theme params and every colour resolves to a --tgui--* token, so light and dark just work.',
  },
  {
    value: 'payments',
    header: 'Can it take payments?',
    body: 'Through the Telegram payments API or TON — the kit only handles the interface.',
  },
];

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Section>
        <Accordion {...args} defaultValue="launch">
          {FAQ.map((item) => (
            <AccordionItem key={item.value} value={item.value} header={item.header}>
              {item.body}
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </Page>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Page>
      <Section>
        <Accordion multiple defaultValue={['launch', 'theme']}>
          {FAQ.map((item) => (
            <AccordionItem key={item.value} value={item.value} header={item.header}>
              {item.body}
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </Page>
  ),
};
