const { mkdirSync, copyFileSync } = require('node:fs');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');
mkdirSync(resolve(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'favicon.svg']) {
  copyFileSync(resolve(root, file), resolve(root, 'dist', file));
}
console.log('Static site built in dist/');
