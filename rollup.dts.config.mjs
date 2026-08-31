import { dts } from 'rollup-plugin-dts';

// bundles the mirrored dist/dts tree into a single dist/index.d.ts
export default {
  input: 'dist/dts/src/index.d.ts',
  output: { file: 'dist/index.d.ts', format: 'es' },
  external: [/^react/, 'clsx', /^class-variance-authority/, 'tailwind-merge'],
  plugins: [dts({ respectExternal: true })],
};
