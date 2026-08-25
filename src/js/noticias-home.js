/**
 * ==============================================================================
 * Notícias na Home (index.html) - Grupo Mais Barato
 * Renderiza as últimas matérias com Skeleton Loading
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('news-home-cards-container');
  if (!container) return;

  async function loadHomeNoticias() {
    // 1. Renderiza 3 skeletons de carregamento
    container.innerHTML = `
      <div class="skeleton-card">
        <div class="skeleton-thumb"></div>
        <div class="skeleton-content">
          <div class="skeleton-line w-40"></div>
          <div class="skeleton-line w-90"></div>
        </div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton-thumb"></div>
        <div class="skeleton-content">
          <div class="skeleton-line w-40"></div>
          <div class="skeleton-line w-90"></div>
        </div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton-thumb"></div>
        <div class="skeleton-content">
          <div class="skeleton-line w-40"></div>
          <div class="skeleton-line w-90"></div>
        </div>
      </div>
    `;

    try {
      if (!window.SanityNewsClient) {
        console.warn('[Notícias Home] SanityNewsClient não encontrado.');
        return;
      }

      const noticias = await window.SanityNewsClient.fetchLatestNoticias(3);

      if (!noticias || noticias.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #8e8780;">
            Nenhuma notícia publicada no momento.
          </div>
        `;
        return;
      }

      // 2. Renderiza os cards reais
      container.innerHTML = noticias
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
            </a>
            <div class="news-card-body">
              <div class="news-card-meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  ${item.formattedDate}
                </span>
              </div>
              <h3 class="news-card-title">
                <a href="${item.url}">${escapeHtml(item.title)}</a>
              </h3>
            </div>
          </article>
        `;
        })
        .join('');
    } catch (error) {
      console.error('[Notícias Home] Erro ao carregar notícias:', error);
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #8e8780;">
          Não foi possível carregar as notícias no momento.
        </div>
      `;
    }
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

  loadHomeNoticias();
});
