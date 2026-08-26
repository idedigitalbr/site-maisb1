import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '../../../lib/content';
import { ArticleView } from '../../../components/article-view';

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Notícia não encontrada' };
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    robots: article.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      images: article.imagePath ? [{ url: article.imagePath, alt: article.imageAlt || article.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await getArticles()).filter((item) => item.slug !== article.slug).slice(0, 3);
  return <ArticleView article={article} related={related} />;
}
