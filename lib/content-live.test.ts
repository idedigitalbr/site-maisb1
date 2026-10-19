import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const state = vi.hoisted(() => ({ db: null as unknown, connection: vi.fn() }));
vi.mock('./db', () => ({ get db() { return state.db; } }));
vi.mock('next/server', () => ({ connection: state.connection }));
import { getArticles } from './content';

beforeEach(() => { state.db = null; state.connection.mockReset(); vi.stubEnv('NODE_ENV', 'production'); });
afterEach(() => vi.unstubAllEnvs());

describe('live public posts', () => {
  it('opts into request-time rendering before the missing-database guard and never serves demo content in production', async () => {
    expect(await getArticles()).toEqual([]);
    expect(state.connection).toHaveBeenCalledOnce();
  });

  it('queries the publication cutoff again on each request so schedules and unpublishing are reflected', async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    state.db = { post: { findMany } };
    await getArticles();
    await getArticles();
    expect(findMany).toHaveBeenCalledTimes(2);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { status: 'published', publishedAt: { lte: expect.any(Date) } },
    }));
  });

  it('does not resurrect fallback stories when the database fails', async () => {
    state.db = { post: { findMany: vi.fn().mockRejectedValue(new Error('unavailable')) } };
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try { expect(await getArticles()).toEqual([]); } finally { log.mockRestore(); }
  });
});
