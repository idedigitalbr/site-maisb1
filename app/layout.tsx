import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { LinksModal } from '../components/links-modal';
import { RouteTheme } from '../components/route-theme';
import { getSiteSettings } from '../lib/content';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: settings.canonicalUrl ? { canonical: settings.canonicalUrl } : undefined,
    title: {
      default: settings.defaultTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultDescription,
    keywords: settings.defaultKeywords,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: settings.siteName,
      title: settings.defaultTitle,
      description: settings.defaultDescription,
      images: settings.ogImage ? [{ url: settings.ogImage, alt: settings.siteName }] : undefined,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="pt-BR">
      <body>
        <RouteTheme />
        <SiteHeader />
        <div id="next-page-content">{children}</div>
        <SiteFooter />
        <LinksModal />
        {settings.googleAnalyticsId ? <GoogleAnalytics gaId={settings.googleAnalyticsId} /> : null}
      </body>
    </html>
  );
}
