import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
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
      thresholds: { lines: 70, functions: 76, branches: 63, statements: 68 },
    },
  },
});
