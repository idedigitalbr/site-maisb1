/**
 * ==============================================================================
 * Controlador da Página de Listagem de Notícias (noticias.html)
 * Filtros por Categoria, Busca em Tempo Real e Paginação
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('news-grid-container');
  const searchInput = document.getElementById('news-search-input');
  const categoryPills = document.querySelectorAll('.news-category-pill');
  const countLabel = document.getElementById('news-count-label');
  const paginationContainer = document.getElementById('news-pagination-container');

  if (!gridContainer) return;

  // Estado atual dos filtros
  const state = {
    category: 'Todas',
    search: '',
    page: 1,
    limit: 9,
    debounceTimer: null
  };

  /**
   * Renderiza Skeletons de carregamento
   */
  function renderSkeletons(count = 6) {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
      skeletons += `
        <div class="skeleton-card">
          <div class="skeleton-thumb"></div>
          <div class="skeleton-content">
            <div class="skeleton-line w-40"></div>
            <div class="skeleton-line w-90"></div>
            <div class="skeleton-line w-70"></div>
          </div>
        </div>
      `;
    }
    gridContainer.innerHTML = skeletons;
  }

  /**
   * Carrega e renderiza a lista de notícias
   */
  async function loadNoticias() {
    renderSkeletons(6);

    try {
      if (!window.SanityNewsClient) {
        gridContainer.innerHTML = `<div class="news-empty-state"><p class="news-empty-desc">Erro: Cliente Sanity não carregado.</p></div>`;
        return;
      }

      const response = await window.SanityNewsClient.fetchNoticiasList({
        category: state.category,
        search: state.search,
        page: state.page,
        limit: state.limit
      });

      const { items, total, totalPages } = response;

      // Atualiza contador
      if (countLabel) {
        const itemWord = total === 1 ? 'matéria encontrada' : 'matérias encontradas';
        countLabel.innerHTML = `Exibindo <strong>${total}</strong> ${itemWord}`;
      }

      // Se vazio
      if (!items || items.length === 0) {
        gridContainer.innerHTML = `
          <div class="news-empty-state" style="grid-column: 1 / -1;">
            <div class="news-empty-icon">📰</div>
            <h3 class="news-empty-title">Nenhuma matéria encontrada</h3>
            <p class="news-empty-desc">
              Não encontramos resultados para a sua busca${state.category !== 'Todas' ? ` na categoria "${state.category}"` : ''}.
            </p>
            <button class="btn-reset-filter" id="btn-reset-search">
              Limpar Filtros e Busca
            </button>
          </div>
        `;

        const resetBtn = document.getElementById('btn-reset-search');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetFilters);
        }

        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
      }

      // Renderiza os cards
      gridContainer.innerHTML = items
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
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  ${item.formattedDate}
                </span>
                <span>•</span>
                <span>${item.readingTime}</span>
              </div>
              <h3 class="news-card-title">
                <a href="${item.url}">${escapeHtml(item.title)}</a>
              </h3>
              <p class="news-card-excerpt">${escapeHtml(item.excerpt)}</p>
              <a href="${item.url}" class="news-card-link-action">
                Ler matéria completa
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </article>
        `;
        })
        .join('');

      renderPagination(totalPages);
    } catch (err) {
      console.error('[Notícias Listagem] Erro:', err);
      gridContainer.innerHTML = `
        <div class="news-empty-state" style="grid-column: 1 / -1;">
          <h3 class="news-empty-title">Erro ao carregar matérias</h3>
          <p class="news-empty-desc">Por favor, tente novamente mais tarde.</p>
        </div>
      `;
    }
  }

  /**
   * Renderiza os botões de paginação
   */
  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let buttons = '';

    // Botão Anterior
    buttons += `
      <button class="news-page-btn" data-page="${state.page - 1}" ${state.page <= 1 ? 'disabled' : ''} aria-label="Página anterior">
        &laquo;
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      buttons += `
        <button class="news-page-btn ${i === state.page ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    // Botão Próximo
    buttons += `
      <button class="news-page-btn" data-page="${state.page + 1}" ${state.page >= totalPages ? 'disabled' : ''} aria-label="Próxima página">
        &raquo;
      </button>
    `;

    paginationContainer.innerHTML = buttons;

    paginationContainer.querySelectorAll('.news-page-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (targetPage && targetPage !== state.page && targetPage >= 1 && targetPage <= totalPages) {
          state.page = targetPage;
          loadNoticias();
          window.scrollTo({ top: gridContainer.offsetTop - 120, behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Reseta todos os filtros
   */
  function resetFilters() {
    state.category = 'Todas';
    state.search = '';
    state.page = 1;

    if (searchInput) searchInput.value = '';

    categoryPills.forEach((p) => {
      if (p.getAttribute('data-category') === 'Todas') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    loadNoticias();
  }

  // Event Listeners: Categorias
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-category') || 'Todas';
      if (state.category === selected) return;

      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      state.category = selected;
      state.page = 1;
      loadNoticias();
    });
  });

  // Event Listeners: Busca com debounce
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(state.debounceTimer);
      state.debounceTimer = setTimeout(() => {
        state.search = e.target.value;
        state.page = 1;
        loadNoticias();
      }, 350);
    });
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

  // Carga inicial
  loadNoticias();
});
