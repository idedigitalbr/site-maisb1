import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CMS_COOKIE = 'cms_session';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!request.cookies.has(CMS_COOKIE)) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
