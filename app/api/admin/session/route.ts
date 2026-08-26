import { cookies } from 'next/headers';
import { CMS_COOKIE, createCmsToken, isAdminAuthenticated, isCmsConfigured, verifyAdminPassword } from '../../../../lib/cms-auth';

export const runtime = 'nodejs';

export async function GET() {
  return Response.json({ configured: isCmsConfigured(), authenticated: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  if (!isCmsConfigured()) return Response.json({ error: 'CMS não configurado no ambiente.' }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  if (!verifyAdminPassword(String(body.password || ''))) return Response.json({ error: 'Senha inválida.' }, { status: 401 });
  const cookieStore = await cookies();
  cookieStore.set(CMS_COOKIE, createCmsToken(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' });
  return Response.json({ authenticated: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(CMS_COOKIE);
  return Response.json({ authenticated: false });
}
