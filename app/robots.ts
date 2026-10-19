import type { MetadataRoute } from 'next';
import { getSiteSettings } from '../lib/content';
import { getPublicSiteOrigin } from '../lib/site-origin';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const baseUrl = await getPublicSiteOrigin(settings);
  return {
    rules: settings.robotsIndex === false
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
