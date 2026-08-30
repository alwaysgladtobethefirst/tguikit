import type { Meta, StoryObj } from '@storybook/react-vite';
import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import type { TguiPlatform } from '../../shared/types/tgui';
import { TguiProvider } from './TguiProvider';
import { useTgui } from './useTgui';

const MONO = "'Geist Mono Variable', ui-monospace, 'SF Mono', 'Menlo', monospace";
const DISPLAY = "'Inter Tight Variable', 'Inter Tight', system-ui, sans-serif";

const PLATFORM_LABEL: Record<TguiPlatform, string> = { ios: 'iOS', base: 'Base' };

const SWATCHES: Array<{ token: string; note: string }> = [
  { token: '--tgui--bg_color', note: 'page background' },
  { token: '--tgui--secondary_bg_color', note: 'grouped background' },
  { token: '--tgui--section_bg_color', note: 'section surface' },
  { token: '--tgui--link_color', note: 'links' },
  { token: '--tgui--button_color', note: 'primary button' },
  { token: '--tgui--destructive_text_color', note: 'destructive text' },
];

const TYPE_STEPS: Array<{ label: string; size: string; line: string }> = [
  {
    label: 'Large title',
    size: '--tgui--large_title--font_size',
    line: '--tgui--large_title--line_height',
  },
  { label: 'Title', size: '--tgui--title2--font_size', line: '--tgui--title2--line_height' },
  { label: 'Text', size: '--tgui--text--font_size', line: '--tgui--text--line_height' },
  { label: 'Caption', size: '--tgui--caption1--font_size', line: '--tgui--caption1--line_height' },
];

const READ_TOKENS = [
  ...SWATCHES.map((s) => s.token),
  ...TYPE_STEPS.flatMap((s) => [s.size, s.line]),
];

const eyebrow: CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: '0.04em',
  color: 'var(--tgui--hint_color)',
};

const sectionStyle: CSSProperties = { display: 'grid', gap: 16 };
const monoValue: CSSProperties = {
  fontFamily: MONO,
  fontSize: 13,
  color: 'var(--tgui--text_color)',
};
const note: CSSProperties = { fontSize: 13, color: 'var(--tgui--subtitle_text_color)' };

function Overview() {
  const { platform, appearance, portalContainer } = useTgui();
  const article = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState<Record<string, string>>({});
  const portal = portalContainer ? `<${portalContainer.tagName.toLowerCase()}>` : 'null';

  // biome-ignore lint/correctness/useExhaustiveDependencies: only re-read when the theme flips
  useLayoutEffect(() => {
    if (!article.current) return;
    const style = getComputedStyle(article.current);
    setResolved(Object.fromEntries(READ_TOKENS.map((t) => [t, style.getPropertyValue(t).trim()])));
  }, [platform, appearance]);

  return (
    <div
      ref={article}
      style={{
        maxWidth: 620,
        margin: '0 auto',
        color: 'var(--tgui--text_color)',
        fontFamily: DISPLAY,
        display: 'grid',
        gap: 44,
      }}
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 640, letterSpacing: '-0.025em' }}>
          TguiProvider
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--tgui--subtitle_text_color)',
          }}
        >
          It resolves the platform and colour scheme, keeps them in sync with Telegram, and hands
          them to every component through context. Its wrapper element carries the design tokens and
          is where overlays portal. Everything below is styled by those tokens – flip the controls
          and watch it re-skin.
        </p>
      </header>

      <section style={sectionStyle}>
        <p style={eyebrow}>context · useTgui()</p>
        <dl
          style={{
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'max-content max-content 1fr',
            columnGap: 20,
            rowGap: 12,
            alignItems: 'baseline',
          }}
        >
          {[
            ['platform', PLATFORM_LABEL[platform], 'Base covers Android, Desktop and Web'],
            ['appearance', appearance, 'live unless pinned'],
            ['portalContainer', portal, 'modals, popovers, toasts'],
          ].map(([key, value, hint]) => (
            <div key={key} style={{ display: 'contents' }}>
              <dt style={{ fontFamily: MONO, fontSize: 12, color: 'var(--tgui--hint_color)' }}>
                {key}
              </dt>
              <dd style={{ ...monoValue, margin: 0, fontWeight: 600 }}>{value}</dd>
              <span style={note}>{hint}</span>
            </div>
          ))}
        </dl>
      </section>

      <section style={sectionStyle}>
        <p style={eyebrow}>tokens · injected on the wrapper</p>
        <div style={{ display: 'grid', rowGap: 12 }}>
          {SWATCHES.map(({ token, note: tokenNote }) => (
            <div
              key={token}
              style={{
                display: 'grid',
                gridTemplateColumns: '12px max-content 1fr max-content',
                alignItems: 'center',
                columnGap: 12,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: `var(${token})`,
                  // faint ring so tokens that match the surface are still visible
                  boxShadow:
                    '0 0 0 1px color-mix(in srgb, var(--tgui--text_color) 14%, transparent)',
                }}
              />
              <span style={{ fontFamily: MONO, fontSize: 12 }}>
                {token.replace('--tgui--', '')}
              </span>
              <span style={{ ...note, fontSize: 12 }}>{tokenNote}</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: 'var(--tgui--hint_color)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {resolved[token] ?? '…'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={eyebrow}>type scale · component font · tightens on iOS</p>
        <div style={{ display: 'grid', rowGap: 14 }}>
          {TYPE_STEPS.map(({ label, size, line }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--tgui--font-family)',
                  fontSize: `var(${size})`,
                  lineHeight: `var(${line})`,
                  letterSpacing: label === 'Large title' ? '-0.02em' : undefined,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: 'var(--tgui--hint_color)',
                  flexShrink: 0,
                }}
              >
                {resolved[size] ?? '…'} / {resolved[line] ?? '…'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/TguiProvider',
  component: TguiProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The root provider every telegram-ui component expects above it. It detects the ' +
          'platform (`ios`, or `base` for Android / Desktop / Web) and colour scheme, keeps ' +
          'them in sync with the Telegram client, and exposes them through context via ' +
          '`useTgui()`. Its wrapper element carries the `--tgui--*` design tokens and is the ' +
          'default mount point for overlays. Render it once near the top of your tree – with ' +
          'no props it resolves everything automatically, or pass `platform`, `appearance`, ' +
          'or `portalContainer` to override. Use the Appearance and Platform toolbar controls ' +
          'to drive the provider this Storybook wraps every story in.',
      },
    },
  },
  argTypes: {
    portalContainer: {
      control: false,
      description: 'Overlay mount point. Defaults to the wrapper element.',
    },
    ref: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: () => <Overview />,
} satisfies Meta<typeof TguiProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const IOS: Story = {
  name: 'iOS',
  globals: { platform: 'ios' },
};

export const Dark: Story = {
  globals: { appearance: 'dark' },
};
