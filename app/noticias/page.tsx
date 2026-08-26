import type { Metadata } from 'next';
import { NewsList } from '../../components/news-list';
import { getArticles } from '../../lib/content';

export const metadata: Metadata = { title: 'Notícias', description: 'Notícias e novidades do Grupo Mais Barato.' };

export default async function NewsPage() {
  const articles = await getArticles();

  return <main className="news-page-wrapper" id="wf-main-content"><section className="news-page-hero"><div className="news-page-hero-container"><span className="news-hero-badge">COMUNICAÇÃO & IMPRENSA</span><h1 className="news-hero-title">Notícias & Novidades do<br /><span className="headline-highlight-italic">Grupo Mais Barato</span></h1><p className="news-hero-subtitle">Fique por dentro das novidades, expansões de lojas, lançamentos de marcas, ações sociais e acontecimentos que transformam o varejo paraense.</p></div></section><NewsList articles={articles} /></main>;
}
