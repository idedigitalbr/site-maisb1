import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const contentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await context.params;
  const assetsRoot = path.resolve(process.cwd(), 'assets');
  const assetPath = path.resolve(assetsRoot, ...segments);

  if (assetPath !== assetsRoot && !assetPath.startsWith(`${assetsRoot}${path.sep}`)) {
    return new Response('Invalid asset path', { status: 400 });
  }

  try {
    const file = await readFile(assetPath);
    const extension = path.extname(assetPath).toLowerCase();
    return new Response(file, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': contentTypes[extension] || 'application/octet-stream',
      },
    });
  } catch {
    return new Response('Asset not found', { status: 404 });
  }
}
