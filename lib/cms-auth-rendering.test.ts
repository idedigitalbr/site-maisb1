import { afterEach, describe, expect, it, vi } from 'vitest';

const requestCookies = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({ cookies: requestCookies }));
vi.mock('./db', () => ({ db: null }));

afterEach(() => vi.clearAllMocks());

describe('admin request rendering without build-time database configuration', () => {
  it('reads request cookies before returning when the database is unavailable', async () => {
    requestCookies.mockResolvedValue({ get: () => undefined });
    const { getCurrentAdmin } = await import('./cms-auth');

    expect(await getCurrentAdmin()).toBeNull();
    expect(requestCookies).toHaveBeenCalledOnce();
  });

  it('propagates Next dynamic rendering signals instead of caching a login redirect', async () => {
    const dynamicSignal = new Error('Dynamic server usage: cookies');
    requestCookies.mockRejectedValue(dynamicSignal);
    const { getCurrentAdmin } = await import('./cms-auth');

    await expect(getCurrentAdmin()).rejects.toBe(dynamicSignal);
  });
});
