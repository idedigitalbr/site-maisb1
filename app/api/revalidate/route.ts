import { revalidatePath } from 'next/cache';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const expectedHeaderValue = process.env.REVALIDATE_SECRET;
  const receivedHeaderValue = request.headers.get('x-revalidate-secret');

  if (!expectedHeaderValue || receivedHeaderValue !== expectedHeaderValue) {
    return Response.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/', 'layout');
  revalidatePath('/noticias', 'page');

  return Response.json({ revalidated: true, now: Date.now() });
}
