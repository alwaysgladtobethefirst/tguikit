import type { Preview } from '@storybook/react-vite';
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/geist-mono';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
