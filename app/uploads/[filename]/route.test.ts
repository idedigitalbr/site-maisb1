import { describe, expect, it } from 'vitest';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { GET, HEAD } from './route';

describe('runtime upload delivery', () => {
  it('serves a file created after the route was loaded, including HEAD and cache headers', async () => {
    const filename = `${randomUUID()}.webp`;
    const directory = path.join(process.cwd(), 'public', 'uploads');
    const file = path.join(directory, filename);
    const bytes = Buffer.from('runtime-upload-fixture');
    const context = { params: Promise.resolve({ filename }) };
    await mkdir(directory, { recursive: true });
    await writeFile(file, bytes, { flag: 'wx' });
    try {
      const response = await GET(new Request(`http://localhost/uploads/${filename}`), context);
      expect(response.status).toBe(200);
      expect(Buffer.from(await response.arrayBuffer())).toEqual(bytes);
      expect(response.headers.get('content-type')).toBe('image/webp');
      expect(response.headers.get('cache-control')).toContain('immutable');
      expect(response.headers.get('x-content-type-options')).toBe('nosniff');
      const head = await HEAD(new Request(`http://localhost/uploads/${filename}`, { method: 'HEAD' }), context);
      expect(head.status).toBe(200);
      expect(head.headers.get('content-length')).toBe(String(bytes.length));
      expect(await head.text()).toBe('');
    } finally { await rm(file, { force: true }); }
  });

  it.each(['../.env', '.env', 'file.svg', 'file.webp.tmp', 'nested/image.webp'])('rejects unsafe or unsupported filename %s', async (filename) => {
    expect((await GET(new Request('http://localhost/uploads/test'), { params: Promise.resolve({ filename }) })).status).toBe(404);
  });

  it('returns 404 for a missing image', async () => {
    expect((await GET(new Request('http://localhost/uploads/missing.webp'), {
      params: Promise.resolve({ filename: `${randomUUID()}.webp` }),
    })).status).toBe(404);
  });
});
