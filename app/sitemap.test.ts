import { describe, expect, it, vi } from 'vitest';
const posts = vi.hoisted(() => vi.fn());
vi.mock('../lib/content', () => ({ getArticles: posts, getSiteSettings: async () => ({}) }));
vi.mock('../lib/site-origin', () => ({ getPublicSiteOrigin: async () => 'https://www.grupomaisbarato.com.br' }));
import sitemap from './sitemap';

describe('CMS sitemap', () => {
  it('uses public URLs, excludes noindex posts and reflects subsequent publication changes', async () => {
    posts.mockResolvedValueOnce([
      { slug: 'published', publishedAt: '2026-10-19T12:00:00Z', noIndex: false },
      { slug: 'hidden-from-search', publishedAt: '2026-10-19T12:00:00Z', noIndex: true },
    ]).mockResolvedValueOnce([]);
    const first = await sitemap();
    expect(first.every((item) => item.url.startsWith('https://www.grupomaisbarato.com.br'))).toBe(true);
    expect(first.map((item) => item.url)).toContain('https://www.grupomaisbarato.com.br/noticias/published');
    expect(first.some((item) => /hidden-from-search|\/links$/.test(item.url))).toBe(false);
    expect((await sitemap()).some((item) => item.url.endsWith('/published'))).toBe(false);
  });
});
