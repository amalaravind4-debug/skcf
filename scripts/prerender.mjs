// Bakes the server-rendered app into dist/index.html after `vite build`.
// Run via `npm run build`; expects dist/ and dist-ssr/ to exist.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const template = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: ${marker} not found in dist/index.html`);
}
await writeFile(htmlPath, template.replace(marker, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote ${(appHtml.length / 1024).toFixed(1)} KB of HTML into dist/index.html`);
