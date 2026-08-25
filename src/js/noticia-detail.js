/**
 * ==============================================================================
 * Leitor de Notícia Individual (noticia.html?slug=...)
 * Renderiza o artigo completo, botões de compartilhamento e matérias relacionadas
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const articleContentContainer = document.getElementById('article-content-container');
  const relatedContainer = document.getElementById('article-related-cards-container');
  const relatedSection = document.getElementById('article-related-section');
  const toast = document.getElementById('toast-copied');

  if (!articleContentContainer) return;

  // 1. Extrai o slug da URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    renderNotFound('Nenhuma matéria especificada.');
    return;
  }

  /**
   * Renderiza Skeletons de carregamento do artigo
   */
  function renderSkeletonArticle() {
    articleContentContainer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div class="skeleton-line w-40" style="margin-bottom: 16px;"></div>
        <div class="skeleton-line w-90" style="height: 36px; margin-bottom: 16px;"></div>
        <div class="skeleton-line w-70" style="height: 24px; margin-bottom: 24px;"></div>
        <div class="skeleton-line w-100" style="height: 380px; border-radius: 16px; margin-bottom: 32px;"></div>
        <div class="skeleton-line w-100" style="margin-bottom: 12px;"></div>
        <div class="skeleton-line w-100" style="margin-bottom: 12px;"></div>
        <div class="skeleton-line w-90" style="margin-bottom: 12px;"></div>
        <div class="skeleton-line w-70" style="margin-bottom: 12px;"></div>
      </div>
    `;
  }

  /**
   * Carrega e renderiza o artigo completo
   */
  async function loadArticle() {
    renderSkeletonArticle();

    try {
      if (!window.SanityNewsClient) {
        renderNotFound('Sistema de notícias não inicializado.');
        return;
      }

      const noticia = await window.SanityNewsClient.fetchNoticiaBySlug(slug);

      if (!noticia) {
        renderNotFound('A matéria solicitada não foi encontrada ou pode ter sido removida.');
        return;
      }

      // Atualiza Title da página e Meta Tags de SEO
      document.title = `${noticia.title} | Grupo Mais Barato`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && noticia.excerpt) {
        metaDesc.setAttribute('content', noticia.excerpt);
      }

      const currentUrl = window.location.href;

      // Renderiza o corpo do artigo
      articleContentContainer.innerHTML = `
        <!-- Breadcrumbs -->
        <nav class="article-breadcrumbs" aria-label="Navegação Estrutural">
          <a href="./index.html">Início</a>
          <span class="article-breadcrumbs-divider">/</span>
          <a href="./noticias.html">Notícias</a>
          <span class="article-breadcrumbs-divider">/</span>
          <span class="article-breadcrumbs-current">${escapeHtml(noticia.category)}</span>
        </nav>

        <!-- Header da Matéria -->
        <header class="article-header">
          <h1 class="article-main-title">${escapeHtml(noticia.title)}</h1>
          ${noticia.excerpt ? `<p class="article-lead-excerpt">${escapeHtml(noticia.excerpt)}</p>` : ''}
          
          <div class="article-meta-bar">
            <div class="article-meta-left">
              <span class="article-author-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                ${escapeHtml(noticia.author)}
              </span>
              <span>•</span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${noticia.formattedDate}
              </span>
              <span>•</span>
              <span>${noticia.readingTime}</span>
            </div>
          </div>
        </header>

        <!-- Imagem de Capa -->
        <figure class="article-cover-wrapper">
          <img 
            src="${noticia.imageUrl}" 
            alt="${escapeHtml(noticia.imageAlt)}" 
            class="article-cover-img"
            onerror="this.src='./assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png'"
          />
          ${noticia.imageAlt ? `<figcaption class="article-cover-caption">${escapeHtml(noticia.imageAlt)}</figcaption>` : ''}
        </figure>

        <!-- Conteúdo Formatado (PortableText) -->
        <div class="article-content-body">
          ${noticia.bodyHtml}
        </div>

        <!-- Seção de Compartilhamento -->
        <div class="article-share-section">
          <div class="article-share-title">Compartilhar matéria:</div>
          <div class="article-share-buttons">
            <a 
              href="https://api.whatsapp.com/send?text=${encodeURIComponent(noticia.title + ' - ' + currentUrl)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-share btn-share-whatsapp"
              aria-label="Compartilhar no WhatsApp"
            >
              <i data-lucide="message-circle" aria-hidden="true"></i>
              WhatsApp
            </a>
            <a 
              href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-share btn-share-linkedin"
              aria-label="Compartilhar no LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a 
              href="https://twitter.com/intent/tweet?text=${encodeURIComponent(noticia.title)}&url=${encodeURIComponent(currentUrl)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-share btn-share-twitter"
              aria-label="Compartilhar no X (Twitter)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X / Twitter
            </a>
            <button 
              type="button" 
              class="btn-share btn-share-copy" 
              id="btn-copy-link"
              aria-label="Copiar link da matéria"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar Link
            </button>
          </div>
        </div>
      `;

      if (window.refreshLucideIcons) {
        window.refreshLucideIcons(articleContentContainer);
      }

      // Event listener do botão copiar link
      const copyBtn = document.getElementById('btn-copy-link');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl).then(() => {
              showToast();
            });
          } else {
            // Fallback
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = currentUrl;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            showToast();
          }
        });
      }

      // 4. Carrega matérias relacionadas
      loadRelated(noticia.slug, noticia.category);
    } catch (err) {
      console.error('[Notícia Detalhe] Erro ao carregar matéria:', err);
      renderNotFound('Erro ao carregar os dados da matéria.');
    }
  }

  /**
   * Exibe aviso de link copiado
   */
  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /**
   * Carrega Matérias Relacionadas
   */
  async function loadRelated(currentSlug, category) {
    if (!relatedContainer || !relatedSection) return;

    try {
      const related = await window.SanityNewsClient.fetchRelatedNoticias(currentSlug, category, 3);
      if (!related || related.length === 0) {
        relatedSection.style.display = 'none';
        return;
      }

      relatedSection.style.display = 'block';
      relatedContainer.innerHTML = related
        .map((item) => {
          return `
          <article class="news-card">
            <a href="${item.url}" class="news-card-thumb-wrap" aria-label="${escapeHtml(item.title)}">
              <img 
                src="${item.imageUrl}" 
                alt="${escapeHtml(item.imageAlt)}" 
                class="news-card-thumb" 
                loading="lazy" 
                onerror="this.src='./assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png'"
              />
              <span class="news-card-badge">${escapeHtml(item.category)}</span>
            </a>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span>${item.formattedDate}</span>
              </div>
              <h3 class="news-card-title">
                <a href="${item.url}">${escapeHtml(item.title)}</a>
              </h3>
            </div>
          </article>
        `;
        })
        .join('');
    } catch (e) {
      if (relatedSection) relatedSection.style.display = 'none';
    }
  }

  /**
   * Renderiza tela de erro / 404
   */
  function renderNotFound(message) {
    articleContentContainer.innerHTML = `
      <div class="news-empty-state" style="margin: 40px 0;">
        <div class="news-empty-icon">🔍</div>
        <h2 class="news-empty-title">Matéria não encontrada</h2>
        <p class="news-empty-desc">${escapeHtml(message)}</p>
        <a href="./noticias.html" class="btn-reset-filter" style="text-decoration: none;">
          &larr; Voltar para todas as Notícias
        </a>
      </div>
    `;
    if (relatedSection) relatedSection.style.display = 'none';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  loadArticle();
});
