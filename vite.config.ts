import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary'],
      include: ['src/components/**/*.{ts,tsx}', 'src/shared/lib/**/*.ts'],
      exclude: [
        '**/*.stories.tsx',
        '**/*.variants.ts',
        '**/index.ts',
        'src/shared/stories/**',
        'src/test/**',
      ],
      // locked near current coverage — a component added without tests drops these and fails CI
      thresholds: { lines: 93, functions: 92, branches: 83, statements: 93 },
    },
  },
});
