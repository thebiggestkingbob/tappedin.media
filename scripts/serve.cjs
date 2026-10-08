const http = require('node:http');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');
const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/favicon.svg': ['favicon.svg', 'image/svg+xml']
};
http.createServer(async (req, res) => {
  const entry = files[new URL(req.url, 'http://localhost').pathname];
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(resolve(root, entry[0]));
    res.writeHead(200, { 'Content-Type': entry[1] }); res.end(body);
  } catch {
    res.writeHead(500); res.end('Unable to load site');
  }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
  console.log('TAPPED IN development server started');
});
