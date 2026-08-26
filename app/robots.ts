import type { MetadataRoute } from 'next';
import { getSiteSettings } from '../lib/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const settings = await getSiteSettings();
  return {
    rules: settings.robotsIndex === false
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
