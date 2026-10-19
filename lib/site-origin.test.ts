import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const requestHeaders = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({ headers: requestHeaders }));
import { getPublicSiteOrigin } from './site-origin';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
  requestHeaders.mockResolvedValue(new Headers({ host: 'www.grupomaisbarato.com.br', 'x-forwarded-proto': 'https' }));
});
afterEach(() => vi.unstubAllEnvs());

describe('public site origin', () => {
  it('uses the real request domain when the configured build URL points to localhost', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000');
    expect(await getPublicSiteOrigin({})).toBe('https://www.grupomaisbarato.com.br');
  });

  it('prefers a valid canonical origin and strips paths', async () => {
    expect(await getPublicSiteOrigin({ canonicalUrl: 'https://example.com/base' })).toBe('https://example.com');
  });

  it('uses a valid forwarded host instead of the internal container hostname', async () => {
    requestHeaders.mockResolvedValue(new Headers({ host: 'web:3000', 'x-forwarded-host': 'www.grupomaisbarato.com.br', 'x-forwarded-proto': 'https' }));
    expect(await getPublicSiteOrigin({})).toBe('https://www.grupomaisbarato.com.br');
  });
});
