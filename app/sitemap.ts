import type { MetadataRoute } from 'next';
import { getArticles } from '../lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articles = await getArticles();

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre-nos`, changeFrequency: 'monthly', priority: .8 },
    { url: `${baseUrl}/noticias`, changeFrequency: 'daily', priority: .9 },
    { url: `${baseUrl}/links`, changeFrequency: 'monthly', priority: .5 },
    ...articles.map((article) => ({ url: `${baseUrl}/noticias/${article.slug}`, lastModified: article.publishedAt, changeFrequency: 'monthly' as const, priority: .7 })),
  ];
}
