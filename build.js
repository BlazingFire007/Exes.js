import { build } from 'esbuild';
// esm
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['esnext'],
  external: ['./node_modules/*'],
  outfile: './index.js',
  format: 'esm',
});
// cjs
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: ['esnext'],
  external: ['./node_modules/*'],
  outfile: './cjs/index.js',
  format: 'cjs',
});
// browser
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: './browser/browser.min.js',
  format: 'esm',
  target: ['es2017'],
  minify: true,
  sourcemap: true,
});
