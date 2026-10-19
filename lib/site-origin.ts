import { headers } from 'next/headers';
import type { SiteSettings } from './types';

function configuredOrigin(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || ['localhost', '127.0.0.1', '[::1]', '::1'].includes(url.hostname)) return undefined;
    return url.origin;
  } catch { return undefined; }
}

export async function getPublicSiteOrigin(settings: Pick<SiteSettings, 'canonicalUrl'>) {
  const configured = configuredOrigin(settings.canonicalUrl) || configuredOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) return configured;
  const requestHeaders = await headers();
  const host = (requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || '').split(',')[0].trim();
  const forwardedProtocol = (requestHeaders.get('x-forwarded-proto') || '').split(',')[0].trim().toLowerCase();
  const protocol = forwardedProtocol === 'http' || forwardedProtocol === 'https' ? forwardedProtocol
    : /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host) ? 'http' : 'https';
  if (!host) throw new Error('Não foi possível identificar o domínio público do site.');
  return new URL(`${protocol}://${host}`).origin;
}
