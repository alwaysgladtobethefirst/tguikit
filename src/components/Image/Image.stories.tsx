import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Article } from '../../shared/stories/Article';
import { eyebrow } from '../../shared/stories/tokens';
import { Image } from './Image';

const PHOTO = 'https://picsum.photos/id/1015/600/600';
const WIDE = 'https://picsum.photos/id/1043/800/450';

const Page = ({ children }: { children: ReactNode }) => (
  <Article
    title="Image"
    lead="A framed image with a shimmer placeholder while it loads and a fallback if it fails. Size it with `size` / `width` / `height` or an `aspectRatio`; `fit`, `radius` and `bordered` shape the frame."
  >
    {children}
  </Article>
);

const meta = {
  title: 'Data Display/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An `<img>` inside an `overflow: hidden` frame. Until `load` fires it shows a shimmer on ' +
          'the `--tgui--skeleton` token; on `error` it swaps to `fallback` (a broken-image glyph ' +
          'by default). `fit` maps to `object-fit`, `radius` to `border-radius` (`"full"` for a ' +
          'circle), `bordered` adds a hairline.',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'number' } },
    fit: { control: 'inline-radio', options: ['cover', 'contain', 'fill'] },
    radius: { control: { type: 'number' } },
    bordered: { control: 'boolean' },
    src: { control: 'text' },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: { src: PHOTO, size: 160, fit: 'cover', radius: 12, bordered: false },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Page>
      <Image {...args} alt="A mountain lake" />
    </Page>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
          <span style={eyebrow}>circle</span>
          <Image src={PHOTO} alt="" size={96} radius="full" />
        </div>
        <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
          <span style={eyebrow}>rounded + border</span>
          <Image src={PHOTO} alt="" size={96} radius={16} bordered />
        </div>
        <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
          <span style={eyebrow}>16 : 9</span>
          <Image src={WIDE} alt="" width={200} aspectRatio="16 / 9" radius={12} />
        </div>
      </div>
    </Page>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Page>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>default</span>
          <Image src="/does-not-exist.jpg" alt="" size={120} radius={12} />
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <span style={eyebrow}>custom</span>
          <Image
            src="/does-not-exist.jpg"
            alt=""
            size={120}
            radius={12}
            fallback={<span style={{ fontSize: 13 }}>no image</span>}
          />
        </div>
      </div>
    </Page>
  ),
};
