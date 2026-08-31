import { dts } from 'rollup-plugin-dts';

export default {
  input: 'dist/dts/src/index.d.ts',
  output: { file: 'dist/index.d.ts', format: 'es' },
  external: [/^react/, 'clsx', /^class-variance-authority/],
  plugins: [dts({ respectExternal: true })],
};
