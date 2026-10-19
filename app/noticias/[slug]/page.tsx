import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getSiteSettings } from '../../../lib/content';
import { getPublicSiteOrigin } from '../../../lib/site-origin';
import { ArticleView } from '../../../components/article-view';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Notícia não encontrada' };
  const settings = await getSiteSettings();
  const siteOrigin = await getPublicSiteOrigin(settings);
  const canonicalUrl = new URL(`/noticias/${encodeURIComponent(article.slug)}`, siteOrigin).toString();
  const socialImage = article.imagePath || settings.ogImage;
  const socialImageUrl = socialImage ? new URL(socialImage, siteOrigin).toString() : undefined;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    robots: article.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      images: socialImageUrl ? [{ url: socialImageUrl, alt: article.imageAlt || article.title }] : undefined,
    },
    twitter: {
      card: socialImageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: socialImageUrl ? [socialImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const settings = await getSiteSettings();
  const siteOrigin = await getPublicSiteOrigin(settings);
  const shareUrl = new URL(`/noticias/${encodeURIComponent(article.slug)}`, siteOrigin).toString();
  const related = (await getArticles()).filter((item) => item.slug !== article.slug).slice(0, 3);
  return <ArticleView article={article} related={related} shareUrl={shareUrl} />;
}
