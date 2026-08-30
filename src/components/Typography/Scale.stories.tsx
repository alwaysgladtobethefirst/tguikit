import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Caption } from '../Caption';
import { Headline } from '../Headline';
import { LargeTitle } from '../LargeTitle';
import { Subheadline } from '../Subheadline';
import { Text } from '../Text';
import { Title } from '../Title';

const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";
const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";

const STEPS: Array<{ sample: ReactNode; name: string; px: string; use: string }> = [
  {
    sample: <LargeTitle>Settings</LargeTitle>,
    name: 'Large Title',
    px: '34',
    use: 'screen title, one per view',
  },
  {
    sample: <Title level="1">Appearance</Title>,
    name: 'Title · 1',
    px: '28',
    use: 'major section heading',
  },
  {
    sample: <Title level="2">Appearance</Title>,
    name: 'Title · 2',
    px: '24',
    use: 'section heading (default)',
  },
  {
    sample: <Title level="3">Appearance</Title>,
    name: 'Title · 3',
    px: '20',
    use: 'minor heading',
  },
  {
    sample: <Headline>Chat background</Headline>,
    name: 'Headline',
    px: '19',
    use: 'emphasised row title (semibold)',
  },
  {
    sample: <Text>Messages you send are end-to-end encrypted.</Text>,
    name: 'Text',
    px: '17',
    use: 'body copy, the default',
  },
  {
    sample: (
      <Subheadline style={{ color: 'var(--tgui--subtitle_text_color)' }}>
        Last seen recently
      </Subheadline>
    ),
    name: 'Subheadline · 1',
    px: '16',
    use: 'secondary line under a title, dim',
  },
  {
    sample: (
      <Subheadline level="2" caps style={{ color: 'var(--tgui--section_header_text_color)' }}>
        Privacy
      </Subheadline>
    ),
    name: 'Subheadline · 2',
    px: '15',
    use: 'settings-section header, caps',
  },
  {
    sample: <Caption style={{ color: 'var(--tgui--hint_color)' }}>Sent · 3:42 PM</Caption>,
    name: 'Caption · 1',
    px: '13',
    use: 'timestamps, form hints, metadata',
  },
  {
    sample: (
      <Caption level="2" style={{ color: 'var(--tgui--hint_color)' }}>
        v2.4.1 (build 1120)
      </Caption>
    ),
    name: 'Caption · 2',
    px: '11',
    use: 'the smallest label',
  },
];

const meta = {
  title: 'Typography/Scale',
  parameters: {
    docs: {
      description: {
        component:
          "The whole ladder in one view. It's Apple's iOS text-style scale, which the Telegram " +
          'client follows – so each step is a size **and** an intended weight/colour pairing, ' +
          'not just a size. Pick the step by the job in the right-hand column.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 620,
        margin: '0 auto',
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
        display: 'grid',
        gap: 28,
      }}
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 640, letterSpacing: '-0.025em' }}>
          Type scale
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          Apple's iOS text styles, which Telegram follows. Each step pairs a size with a weight and
          colour – Headline is emphasised body, Subheadline is dimmed supporting text. Flip the
          Platform toolbar to iOS to see the line heights tighten.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 22 }}>
        {STEPS.map((step) => (
          <div
            key={step.name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) max-content',
              gap: 16,
              alignItems: 'baseline',
              borderTop: '1px solid var(--tgui--section_separator_color)',
              paddingTop: 16,
            }}
          >
            <div style={{ minWidth: 0 }}>{step.sample}</div>
            <div style={{ display: 'grid', gap: 2, justifyItems: 'end', textAlign: 'right' }}>
              <span style={{ fontFamily: MONO, fontSize: 12 }}>{step.name}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--tgui--hint_color)' }}>
                {step.px}px
              </span>
              <span style={{ fontSize: 12, color: 'var(--tgui--subtitle_text_color)' }}>
                {step.use}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
