'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { NewsArticle } from '../lib/types';
import { NewsCard } from './news-card';

const categories = ['Todas', 'Institucional', '+B Supermercados', '+B Farma', 'Villa Plaza', 'The Wine Experience', 'Eventos', 'Expansão'];

export function NewsList({ articles }: { articles: NewsArticle[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesCategory = category === 'Todas' || article.category === category;
    const term = query.trim().toLocaleLowerCase('pt-BR');
    return matchesCategory && (!term || `${article.title} ${article.excerpt}`.toLocaleLowerCase('pt-BR').includes(term));
  }), [articles, category, query]);

  return (
    <>
      <section className="news-toolbar-section">
        <div className="news-page-hero-container news-toolbar">
          <div className="news-search-and-stats">
            <div className="news-search-box">
              <Search className="news-search-icon" size={18} aria-hidden="true" />
              <input className="news-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título ou assunto..." autoComplete="off" aria-label="Buscar por título ou assunto" />
            </div>
            <div className="news-count-label">Exibindo <strong>{filtered.length}</strong> matérias encontradas</div>
          </div>
          <div className="news-categories-bar" role="tablist" aria-label="Categorias de Notícias">
            {categories.map((item) => <button type="button" key={item} className={`news-category-pill${category === item ? ' active' : ''}`} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</button>)}
          </div>
        </div>
      </section>
      <section className="news-grid-section">
        <div className="news-page-hero-container">
          {filtered.length ? <div className="news-cards-grid" id="news-grid-container">{filtered.map((article) => <NewsCard key={article.id} article={article} />)}</div> : <div className="news-empty-state"><h2 className="news-empty-title">Nenhuma matéria encontrada</h2><p className="news-empty-desc">Tente outro termo ou selecione outra categoria.</p></div>}
        </div>
      </section>
    </>
  );
}
