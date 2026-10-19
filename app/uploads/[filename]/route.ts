import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const types: Record<string, string> = {
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif',
};
type Context = { params: Promise<{ filename: string }> };

async function serve(context: Context, head: boolean) {
  const { filename } = await context.params;
  if (filename.length > 180 || !/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.(webp|png|jpe?g|gif|avif)$/i.test(filename)) {
    return new Response('Not found', { status: 404 });
  }
  try {
    const root = await realpath(path.join(process.cwd(), 'public', 'uploads'));
    const file = await realpath(path.join(root, filename));
    if (path.dirname(file) !== root) return new Response('Not found', { status: 404 });
    const info = await stat(file);
    if (!info.isFile()) return new Response('Not found', { status: 404 });
    return new Response(head ? null : new Uint8Array(await readFile(file)), {
      headers: {
        'Content-Type': types[path.extname(filename).toLowerCase()],
        'Content-Length': String(info.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return new Response(code === 'ENOENT' || code === 'ENOTDIR' ? 'Not found' : 'Unable to load image', {
      status: code === 'ENOENT' || code === 'ENOTDIR' ? 404 : 500,
    });
  }
}

export async function GET(_request: Request, context: Context) { return serve(context, false); }
export async function HEAD(_request: Request, context: Context) { return serve(context, true); }
