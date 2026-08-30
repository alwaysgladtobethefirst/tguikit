import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Text } from '../Text';
import { Divider } from './Divider';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Divider"
    lead="A hairline `hr` on the `--tgui--outline` colour at `--tgui--border--width` (1px, or 0.5px on hi-dpi). Used between rows in a Section, or anywhere content needs a quiet separator."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A thin horizontal rule at `--tgui--border--width` in `--tgui--outline`. Renders a ' +
          'semantic `<hr>` with no default margin. Section inserts it between children ' +
          'automatically.',
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Page>
      <Divider />
    </Page>
  ),
};

export const BetweenContent: Story = {
  name: 'Between content',
  render: () => (
    <Page>
      <div style={{ display: 'grid' }}>
        <span style={eyebrow}>list rows</span>
        {['Notifications', 'Data and Storage', 'Privacy'].map((row, i, all) => (
          <div key={row}>
            <Text Component="p" style={{ padding: '12px 0' }}>
              {row}
            </Text>
            {i < all.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </Page>
  ),
};
