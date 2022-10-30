import { build } from 'esbuild';
// esm
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['esnext'],
  external: ['./node_modules/*'],
  outfile: './dist/index.js',
  format: 'esm',
});
// browser
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: './dist/browser/browser.min.js',
  format: 'esm',
  target: ['es2017'],
  minify: true,
  sourcemap: true,
});
