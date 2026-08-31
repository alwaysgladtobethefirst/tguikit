import '@fontsource-variable/inter-tight';
import '@fontsource-variable/geist-mono';
import type { Decorator, Preview } from '@storybook/react-vite';
import { useLayoutEffect, useRef } from 'react';
import { TguiProvider } from '../src/components/TguiProvider';
import type { Appearance, TguiPlatform } from '../src/shared/types/tgui';
import './preview.css';

type Choice<T> = T | 'auto';

const withTgui: Decorator = (Story, { globals }) => {
  const appearance = globals.appearance as Choice<Appearance>;
  const platform = globals.platform as Choice<TguiPlatform>;
  const ref = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bg follows these globals through the DOM
  useLayoutEffect(() => {
    if (!ref.current) return;
    const previous = document.body.style.background;
    document.body.style.background = getComputedStyle(ref.current).backgroundColor;
    return () => {
      document.body.style.background = previous;
    };
  }, [appearance, platform]);

  const pageBg = platform === 'ios' ? 'var(--tgui--secondary_bg_color)' : 'var(--tgui--bg_color)';

  return (
    <TguiProvider
      ref={ref}
      appearance={appearance === 'auto' ? undefined : appearance}
      platform={platform === 'auto' ? undefined : platform}
      style={{ minHeight: '100%', background: pageBg, padding: '56px 24px' }}
    >
      <Story />
    </TguiProvider>
  );
};

const preview: Preview = {
  decorators: [withTgui],
  initialGlobals: { appearance: 'auto', platform: 'auto' },
  globalTypes: {
    appearance: {
      description: 'Colour scheme',
      toolbar: {
        title: 'Appearance',
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
    platform: {
      description: 'Platform',
      toolbar: {
        title: 'Platform',
        icon: 'mobile',
        dynamicTitle: true,
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'base', title: 'Base' },
          { value: 'ios', title: 'iOS' },
        ],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Foundations',
          'Typography',
          ['Scale', '*'],
          'Layout',
          'Data Display',
          'Inputs',
          'Actions',
          'Navigation',
        ],
      },
    },
  },
};

export default preview;
