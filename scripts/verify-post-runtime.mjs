import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { copyFile, mkdir, unlink } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');
const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, '127.0.0.1', resolve));
const port = portProbe.address().port;
await new Promise((resolve) => portProbe.close(resolve));
const filename = `${randomUUID()}.webp`;
const image = path.join(standalone, 'public', 'uploads', filename);
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [path.join(standalone, 'server.js')], {
  cwd: standalone,
  env: { ...process.env, PORT: String(port), HOSTNAME: '127.0.0.1', DATABASE_URL: '', NEXT_PUBLIC_SITE_URL: '' },
  stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
});
let logs = '';
for (const stream of [server.stdout, server.stderr]) stream.on('data', (data) => { logs = (logs + data).slice(-4000); });

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const response = await fetch(`${base}/uploads/${filename}`, { signal: AbortSignal.timeout(2000) });
      assert.equal(response.status, 404);
      ready = true;
      break;
    } catch { await delay(250); }
  }
  assert.ok(ready, `Standalone server did not become ready: ${logs}`);
  await mkdir(path.dirname(image), { recursive: true });
  await copyFile(path.join(root, 'assets', 'Icones Submarcas', 'icon-b-supermercadoo.webp'), image);
  const response = await fetch(`${base}/uploads/${filename}`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/webp');
  assert.ok((await response.arrayBuffer()).byteLength > 0);
  assert.equal((await fetch(`${base}/uploads/${filename}`, { method: 'HEAD' })).status, 200);
  const news = await (await fetch(`${base}/noticias`)).text();
  assert.ok(!news.includes('grupo-mais-barato-celebra-10-anos-expansao-varejo-paraense'));
  const sitemap = await (await fetch(`${base}/sitemap.xml`, {
    headers: { 'x-forwarded-host': 'www.grupomaisbarato.com.br', 'x-forwarded-proto': 'https' },
  })).text();
  assert.ok(!sitemap.includes('localhost'));
  assert.ok(sitemap.includes('https://www.grupomaisbarato.com.br/noticias'));
  console.log('Production runtime verified: late upload GET/HEAD 200, no demo posts, public sitemap origin.');
} finally {
  await unlink(image).catch((error) => { if (error.code !== 'ENOENT') throw error; });
  server.kill();
}
