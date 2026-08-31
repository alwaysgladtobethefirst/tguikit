import react from '@vitejs/plugin-react';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// library build only — dev + vitest stay in vite.config.ts.
// dts emits a mirrored tree into dist/dts; rollup.dts.config.mjs then bundles it
// into a single dist/index.d.ts (api-extractor can't parse TS 6 output yet).
export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      outDir: 'dist/dts',
      include: ['src'],
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        'src/test/**',
        'src/shared/stories/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.tsx',
      ],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: new URL('src/index.ts', import.meta.url).pathname,
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
      ],
      output: {
        assetFileNames: 'styles[extname]',
      },
    },
  },
});
