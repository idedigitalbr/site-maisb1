/**
 * Lucide Icons — migração dos ícones genéricos do site.
 * Logos sociais, logos de marcas, watermarks e pins customizados não são
 * migrados porque são elementos de identidade/ilustração, não ícones de UI.
 */
(function () {
  'use strict';

  const LEGACY_RULES = [
    ['svg:not(.lucide).search-icon-svg', 'search'],
    ['svg:not(.lucide).news-search-icon', 'search'],
    ['p.unit-card-addr > svg:not(.lucide)', 'map-pin'],
    ['svg:not(.lucide).btn-icon-pin', 'map-pin'],
    ['svg:not(.lucide).arrow-diagonal', 'arrow-up-right'],
    ['.btn-hero-cta > svg:not(.lucide)', 'arrow-right'],
    ['.brands-nav-arrow.arrow-left > svg:not(.lucide)', 'chevron-left'],
    ['.brands-nav-arrow.arrow-right > svg:not(.lucide)', 'chevron-right'],
    ['.btn-news-all > svg:not(.lucide)', 'arrow-right'],
    ['.btn-trabalhe-card > svg:not(.lucide)', 'arrow-right'],
    ['.trajetoria-prev-btn > svg:not(.lucide)', 'chevron-left'],
    ['.trajetoria-next-btn > svg:not(.lucide)', 'chevron-right'],
    ['.floating-card-icon > svg:not(.lucide)', 'sprout'],
    ['#mute-icon:not(.lucide)', 'volume-x'],
    ['#unmute-icon:not(.lucide)', 'volume-2'],
    ['#fullscreen-enter-icon:not(.lucide)', 'maximize'],
    ['#fullscreen-exit-icon:not(.lucide)', 'minimize'],
    ['svg:not(.lucide).icon-play', 'play'],
    ['svg:not(.lucide).icon-pause', 'pause'],
    ['svg:not(.lucide).icon-volume-on', 'volume-2'],
    ['svg:not(.lucide).icon-volume-off', 'volume-x'],
    ['.dep-rewind-btn > svg:not(.lucide)', 'rotate-ccw'],
    ['.dep-forward-btn > svg:not(.lucide)', 'rotate-cw'],
    ['.article-author-info > svg:not(.lucide)', 'user'],
    ['.article-meta-left > span:nth-of-type(3) > svg:not(.lucide)', 'calendar'],
    ['.article-share-buttons .btn-share-copy > svg:not(.lucide)', 'copy'],
    ['.news-card-meta svg:not(.lucide)', 'calendar'],
    ['.news-card-link-action > svg:not(.lucide)', 'arrow-right'],
    ['.route-info-content > svg:not(.lucide)', 'car'],
    ['.detail-today-hours > svg:not(.lucide)', 'clock-3'],
    ['.routes-btn .btn-icon > svg:not(.lucide)', 'map'],
    ['.call-btn .btn-icon > svg:not(.lucide)', 'phone'],
    ['.share-btn .btn-icon > svg:not(.lucide)', 'share-2'],
    ['.info-row:nth-child(1) .info-row-icon > svg:not(.lucide)', 'map-pin'],
    ['.info-row:nth-child(2) .info-row-icon > svg:not(.lucide)', 'phone'],
    ['.info-row:nth-child(3) .info-row-icon > svg:not(.lucide)', 'mail'],
    ['.thumb-zoom-icon > svg:not(.lucide)', 'zoom-in'],
    ['.album-zoom-icon > svg:not(.lucide)', 'zoom-in'],
    ['.album-hover-hint > svg:not(.lucide)', 'chevron-up'],
    ['.album-lightbox-nav.prev > svg:not(.lucide)', 'chevron-left'],
    ['.album-lightbox-nav.next > svg:not(.lucide)', 'chevron-right'],
    ['button.card-close-btn > svg:not(.lucide)', 'x'],
    ['a.btn-link[href="./index.html"] > svg:not(.lucide)', 'globe'],
    ['a.btn-link[href="./noticias.html"] > svg:not(.lucide)', 'newspaper'],
    ['a.btn-link[href*="portaldetalentos"] > svg:not(.lucide)', 'briefcase'],
    ['a.btn-link[href^="https://wa.me"] > svg:not(.lucide)', 'message-circle']
  ];

  const TEXT_ICON_RULES = [
    ['button.lightbox-close', 'x'],
    ['button.lightbox-nav.prev', 'chevron-left'],
    ['button.lightbox-nav.next', 'chevron-right'],
    ['button.wf-modal-close', 'x'],
    ['button.dep-fs-close-btn', 'x'],
    ['button.changelog-modal-close', 'x'],
    ['button.card-close-btn', 'x'],
    ['button.album-lightbox-close', 'x'],
    ['button.news-page-btn[aria-label="Página anterior"]', 'chevron-left'],
    ['button.news-page-btn[aria-label="Próxima página"]', 'chevron-right']
  ];

  function copyPresentation(source, target) {
    ['id', 'style', 'width', 'height', 'title', 'role'].forEach(function (attribute) {
      if (source.hasAttribute(attribute)) target.setAttribute(attribute, source.getAttribute(attribute));
    });
    if (source.hasAttribute('class')) {
      const classes = source.getAttribute('class').split(/\s+/).filter(function (className) {
        return className && !className.startsWith('lucide');
      });
      if (classes.length) target.setAttribute('class', classes.join(' '));
    }
    target.setAttribute('aria-hidden', source.getAttribute('aria-hidden') || 'true');
    target.dataset.lucideManaged = 'true';
  }

  function placeholder(name, source) {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', name);
    if (source) copyPresentation(source, icon);
    return icon;
  }

  function replaceElement(element, name) {
    if (!element || element.classList.contains('lucide') || element.dataset.lucideManaged === 'true') return;
    element.replaceWith(placeholder(name, element));
  }

  function replaceTextElement(element, name) {
    if (!element || element.querySelector('.lucide, [data-lucide]')) return;
    const text = element.textContent.trim();
    if (!text || !(/[×✕❮❯«»]/.test(text) || element.classList.contains('album-lightbox-close') || element.classList.contains('wf-modal-close') || element.classList.contains('dep-fs-close-btn') || element.classList.contains('changelog-modal-close') || element.classList.contains('card-close-btn'))) return;
    element.textContent = '';
    element.appendChild(placeholder(name));
  }

  function migrateAutocompleteIcons(root) {
    root.querySelectorAll('.autocomplete-item-icon > svg:not(.lucide)').forEach(function (svg) {
      const item = svg.closest('.autocomplete-item');
      const type = item && item.querySelector('.autocomplete-item-type') ? item.querySelector('.autocomplete-item-type').textContent.trim() : '';
      const name = {
        unidade: 'map-pin',
        bairro: 'map-pin',
        marca: 'star',
        servico: 'wrench',
        foto: 'camera',
        duvida: 'circle-help'
      }[type] || 'search';
      replaceElement(svg, name);
    });
  }

  function migrateMenuToggles(root) {
    root.querySelectorAll('.menu-toggle').forEach(function (button) {
      if (button.querySelector('.lucide, [data-lucide]')) return;
      const bars = button.querySelectorAll('span');
      if (!bars.length) return;
      bars.forEach(function (bar) { bar.remove(); });
      button.appendChild(placeholder('menu'));
    });
  }

  function migrateFaqIcons(root) {
    root.querySelectorAll('.faq-plus-icon').forEach(function (container) {
      if (container.querySelector('.lucide, [data-lucide]')) return;
      container.textContent = '';
      container.appendChild(placeholder('plus'));
    });
  }

  function migrateResetArrows(root) {
    root.querySelectorAll('.btn-reset-filter').forEach(function (button) {
      if (button.querySelector('.lucide, [data-lucide]')) return;
      const text = button.textContent.trim();
      if (!text || !/^(←|\u2190|&larr;)/.test(text)) return;
      button.textContent = '';
      button.appendChild(placeholder('arrow-left'));
      button.appendChild(document.createTextNode(' ' + text.replace(/^(←|\u2190|&larr;)\s*/, '')));
    });
  }

  function migrate(root) {
    LEGACY_RULES.forEach(function (rule) {
      root.querySelectorAll(rule[0]).forEach(function (element) { replaceElement(element, rule[1]); });
    });
    TEXT_ICON_RULES.forEach(function (rule) {
      root.querySelectorAll(rule[0]).forEach(function (element) { replaceTextElement(element, rule[1]); });
    });
    migrateAutocompleteIcons(root);
    migrateMenuToggles(root);
    migrateFaqIcons(root);
    migrateResetArrows(root);
  }

  function render(root) {
    if (!window.lucide || !root) return;
    migrate(root);
    window.lucide.createIcons({
      attrs: {
        'stroke-width': 2,
        'aria-hidden': 'true'
      }
    });
  }

  function setLucideIcon(element, name) {
    if (!element) return;
    const current = element.querySelector('.lucide, [data-lucide]');
    if (current) current.replaceWith(placeholder(name, current));
    else element.appendChild(placeholder(name));
    render(element);
  }

  let renderTimer = null;
  function scheduleRender() {
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(function () { render(document); }, 0);
  }

  window.refreshLucideIcons = function (root) { render(root || document); };
  window.setLucideIcon = setLucideIcon;

  document.addEventListener('DOMContentLoaded', function () {
    render(document);
    if (!document.body || !window.MutationObserver) return;
    const observer = new MutationObserver(function (mutations) {
      if (mutations.some(function (mutation) { return mutation.addedNodes.length > 0; })) scheduleRender();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
