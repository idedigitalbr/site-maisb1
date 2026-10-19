import type { MetadataRoute } from 'next';
import { getArticles } from '../lib/content';
import { getSiteSettings } from '../lib/content';
import { getPublicSiteOrigin } from '../lib/site-origin';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getPublicSiteOrigin(await getSiteSettings());
  const articles = await getArticles();

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre-nos`, changeFrequency: 'monthly', priority: .8 },
    { url: `${baseUrl}/noticias`, changeFrequency: 'daily', priority: .9 },
    ...articles.filter((article) => !article.noIndex).map((article) => ({ url: `${baseUrl}/noticias/${article.slug}`, lastModified: article.publishedAt, changeFrequency: 'monthly' as const, priority: .7 })),
  ];
}
