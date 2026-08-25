/**
 * ==============================================================================
 * Sanity.io Client - Grupo Mais Barato
 * Pure Vanilla JavaScript (Sem dependências externas / Sem bundler)
 * ==============================================================================
 */

(function (window) {
  'use strict';

  // ============================================================================
  // CONFIGURAÇÃO DO SANITY.IO
  // Substitua 'SEU_PROJECT_ID_AQUI' pelo seu Project ID real obtido em sanity.io/manage
  // ============================================================================
  const SANITY_CONFIG = {
    projectId: 'SEU_PROJECT_ID_AQUI', // <- Cole aqui seu Project ID do Sanity
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true // true para respostas rápidas em Edge CDN
  };

  /**
   * Verifica se o Sanity já foi configurado com um Project ID real
   */
  function isConfigured() {
    return (
      SANITY_CONFIG.projectId &&
      SANITY_CONFIG.projectId !== 'SEU_PROJECT_ID_AQUI' &&
      SANITY_CONFIG.projectId.trim() !== ''
    );
  }

  // ============================================================================
  // DADOS DE DEMONSTRAÇÃO (MOCK DATA)
  // Utilizados automaticamente enquanto o Sanity não possuir matérias cadastradas
  // ============================================================================
  const MOCK_NOTICIAS = [
    {
      _id: 'mock-1',
      title: 'Grupo Mais Barato celebra 10 anos de expansão e inovação no varejo paraense',
      slug: { current: 'grupo-mais-barato-celebra-10-anos-expansao-varejo-paraense' },
      publishedAt: '2026-08-20T14:30:00Z',
      category: 'Institucional',
      author: 'Assessoria de Comunicação Grupo +B',
      mainImage: {
        asset: {
          url: './assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png'
        },
        alt: 'Fachada e equipe do Grupo Mais Barato'
      },
      excerpt: 'Com mais de 10 mil metros quadrados de área operacional e 5 marcas consolidadas, o Grupo reafirma seu compromisso com Belém e com a geração de oportunidades.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Desde a sua fundação em 2015, o Grupo Mais Barato tem sido sinônimo de pioneirismo, respeito às pessoas e compromisso inegociável com a qualidade. O que começou como uma visão de transformar o varejo local hoje se consolida como um dos ecossistemas de marcas mais integrados da Região Norte.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Um ecossistema multissetorial completo' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Hoje, o ecossistema abrange os Supermercados +B, a rede de farmácias +B Farma, os espaços de conveniência e lazer Villa Plaza e Villa Plaza Park, além da boutique refinada The Wine Experience. Essa sinergia permite atender os clientes em todas as suas necessidades diárias com máxima excelência.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'blockquote',
          children: [
            {
              _type: 'span',
              text: '“Mais do que crescer, nosso propósito sempre foi transformar relações e construir um futuro sustentável para as comunidades onde estamos inseridos.”'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Os próximos anos trarão investimentos contínuos em tecnologia, infraestrutura logística e capacitação de colaboradores, mantendo Belém no centro do nosso coração e dos nossos negócios.'
            }
          ]
        }
      ]
    },
    {
      _id: 'mock-2',
      title: 'The Wine Experience apresenta seleção exclusiva de rótulos internacionais para o segundo semestre',
      slug: { current: 'the-wine-experience-selecao-exclusiva-rotulos-internacionais' },
      publishedAt: '2026-08-15T18:00:00Z',
      category: 'The Wine Experience',
      author: 'Curadoria The Wine Experience',
      mainImage: {
        asset: {
          url: './assets/Fotografias/Mais B Farma/foto-banner-maisb-farmacia.webp'
        },
        alt: 'Adega e seleção de vinhos The Wine Experience'
      },
      excerpt: 'Adega premium traz safras consagradas de vinícolas do Chile, Argentina, França e Itália com atendimento sommelier especializado nas unidades.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Os apreciadores da alta enogastronomia em Belém agora contam com uma carta ainda mais sofisticada na The Wine Experience. A curadoria da boutique acaba de desembarcar mais de 120 novos rótulos de safras premiadas das principais regiões vinícolas do planeta.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Atendimento consultivo e harmonização sob medida' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Cada loja conta com sommeliers dedicados para orientar desde jantares íntimos até celebrações corporativas. Os clientes podem ainda desfrutar de taças selecionadas no wine bar acoplado às unidades.'
            }
          ]
        }
      ]
    },
    {
      _id: 'mock-3',
      title: '+B Supermercados expande setor de carnes nobres e hortifrúti selecionado na unidade Alcindo Cacela',
      slug: { current: 'maisb-supermercados-expansao-carnes-nobres-hortifruti-alcindo' },
      publishedAt: '2026-08-10T09:15:00Z',
      category: '+B Supermercados',
      author: 'Gestão Operacional de Lojas',
      mainImage: {
        asset: {
          url: './assets/Fotografias/Supermercado +B/03_Carnes/unid-alcindo-foto-de-setor-de-carnes-nobres.webp'
        },
        alt: 'Setor de carnes nobres Supermercados +B Alcindo Cacela'
      },
      excerpt: 'Novos balcões climatizados, cortes especiais com padrão gourmet e hortifrúti abastecido diariamente direto de produtores regionais.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Com foco contínuo na experiência do cliente, a unidade Alcindo Cacela do +B Supermercados concluiu uma modernização completa em suas áreas de produtos frescos.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Frescor diário e cortes sob demanda' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A nova seção de carnes nobres inclui cortes maturados, opções para churrasco premium e atendimento personalizado pelos mestres açougueiros. Já o hortifrúti ganhou novas bancadas iluminadas com climatização especial.'
            }
          ]
        }
      ]
    },
    {
      _id: 'mock-4',
      title: '+B Farma inaugura programa de atenção farmacêutica com aferições e orientações gratuitas',
      slug: { current: 'maisb-farma-programa-atencao-farmaceutica-orientacoes-gratuitas' },
      publishedAt: '2026-08-01T11:00:00Z',
      category: '+B Farma',
      author: 'Coordenação Farmacêutica',
      mainImage: {
        asset: {
          url: './assets/Fotografias/Mais B Farma/foto-farma-b (1).webp'
        },
        alt: 'Atendimento na farmácia +B Farma'
      },
      excerpt: 'Iniciativa reforça o cuidado integral com a saúde e o bem-estar da família paraense com farmacêuticos presentes em tempo integral.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A saúde preventiva é o pilar central da nova fase da +B Farma. Em todas as nossas unidades, os clientes têm acesso a consultas rápidas de enfermagem farmacêutica, teste de glicemia capilar e aferição de pressão arterial.'
            }
          ]
        }
      ]
    },
    {
      _id: 'mock-5',
      title: 'Villa Plaza Park anuncia programação cultural de lazer e gastronomia para os finais de semana',
      slug: { current: 'villa-plaza-park-programacao-cultural-gastronomia-fim-de-semana' },
      publishedAt: '2026-07-28T16:45:00Z',
      category: 'Villa Plaza',
      author: 'Comunicação Villa Plaza',
      mainImage: {
        asset: {
          url: './assets/Fotografias/Supermercado +B/01_Fachadas/unid-plaza-foto-de-fachada-vila-plaza.webp'
        },
        alt: 'Espaço Villa Plaza'
      },
      excerpt: 'Música ao vivo, espaço kids seguro, food park e ambientes instagramáveis fazem do complexo o ponto de encontro favorito na região.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Unindo boa gastronomia, espaço pet-friendly e diversão segura para as crianças, o Villa Plaza Park consolidou-se como a principal praça de convivência para as famílias.'
            }
          ]
        }
      ]
    }
  ];

  // ============================================================================
  // EXECUTOR DE QUERIES GROQ (SANITY CDN)
  // ============================================================================
  async function fetchGroq(query, params = {}) {
    if (!isConfigured()) {
      return null;
    }

    const host = SANITY_CONFIG.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';
    let url = `https://${SANITY_CONFIG.projectId}.${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;

    // Interpolação simples de parâmetros GROQ se houver
    if (params && Object.keys(params).length > 0) {
      for (const [key, val] of Object.entries(params)) {
        url += `&$${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
      }
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`[Sanity.io] Resposta HTTP ${response.status} ao consultar GROQ:`, response.statusText);
        return null;
      }
      const data = await response.json();
      return data.result;
    } catch (err) {
      console.warn('[Sanity.io] Erro na requisição via Fetch:', err);
      return null;
    }
  }

  // ============================================================================
  // CONVERSOR DE IMAGENS DO SANITY PARA URL DA CDN
  // Converte referências como 'image-tb454...-1200x800-jpg' para URL pública
  // ============================================================================
  function urlForImage(source, options = {}) {
    if (!source) {
      return './assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png';
    }

    // Se já for uma URL estática (ex: do Mock)
    if (typeof source === 'string') {
      return source;
    }
    if (source.asset && source.asset.url) {
      return source.asset.url;
    }

    // Se for objeto de asset do Sanity com _ref
    let ref = source.asset ? source.asset._ref : source._ref;
    if (!ref && typeof source === 'string') {
      ref = source;
    }

    if (!ref) {
      return './assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png';
    }

    // Sanity Asset ID Format: image-abc123456789-1200x800-jpg
    const pattern = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/;
    const matches = pattern.exec(ref);

    if (!matches) {
      return './assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png';
    }

    const [, id, dimensions, extension] = matches;
    const { width, height, quality = 85, fit = 'crop', format = 'webp' } = options;

    let cdnUrl = `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${id}-${dimensions}.${extension}?auto=format&q=${quality}`;

    if (width) cdnUrl += `&w=${width}`;
    if (height) cdnUrl += `&h=${height}`;
    if (fit) cdnUrl += `&fit=${fit}`;
    if (format) cdnUrl += `&fm=${format}`;

    return cdnUrl;
  }

  // ============================================================================
  // PARSER DE PORTABLE TEXT PARA HTML SEMÂNTICO (Sem dependências externas)
  // ============================================================================
  function portableTextToHtml(blocks) {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      return '';
    }

    let html = '';
    let currentList = null; // 'bullet' ou 'number'

    blocks.forEach((block) => {
      // Bloco de Imagem dentro do texto
      if (block._type === 'image') {
        if (currentList) {
          html += currentList === 'bullet' ? '</ul>\n' : '</ol>\n';
          currentList = null;
        }
        const imgUrl = urlForImage(block, { width: 1000 });
        const altText = block.alt || 'Imagem da matéria';
        const caption = block.caption ? `<figcaption class="article-img-caption">${escapeHtml(block.caption)}</figcaption>` : '';
        html += `<figure class="article-inline-figure"><img src="${imgUrl}" alt="${escapeHtml(altText)}" loading="lazy" class="article-inline-img" />${caption}</figure>\n`;
        return;
      }

      // Bloco de Texto normal
      if (block._type === 'block') {
        const textContent = renderSpansWithMarks(block);

        // Se for item de lista
        if (block.listItem) {
          const listType = block.listItem === 'number' ? 'number' : 'bullet';
          if (currentList !== listType) {
            if (currentList) {
              html += currentList === 'bullet' ? '</ul>\n' : '</ol>\n';
            }
            html += listType === 'bullet' ? '<ul class="article-bullet-list">\n' : '<ol class="article-number-list">\n';
            currentList = listType;
          }
          html += `  <li>${textContent}</li>\n`;
          return;
        }

        // Se não for lista, fecha lista anterior se houver
        if (currentList) {
          html += currentList === 'bullet' ? '</ul>\n' : '</ol>\n';
          currentList = null;
        }

        // Se o bloco estiver vazio
        if (!textContent.trim()) {
          return;
        }

        const style = block.style || 'normal';
        switch (style) {
          case 'h2':
            html += `<h2 class="article-h2">${textContent}</h2>\n`;
            break;
          case 'h3':
            html += `<h3 class="article-h3">${textContent}</h3>\n`;
            break;
          case 'h4':
            html += `<h4 class="article-h4">${textContent}</h4>\n`;
            break;
          case 'blockquote':
            html += `<blockquote class="article-quote"><p>${textContent}</p></blockquote>\n`;
            break;
          default:
            html += `<p class="article-p">${textContent}</p>\n`;
            break;
        }
      }
    });

    if (currentList) {
      html += currentList === 'bullet' ? '</ul>\n' : '</ol>\n';
    }

    return html;
  }

  function renderSpansWithMarks(block) {
    if (!block.children || !Array.isArray(block.children)) {
      return '';
    }

    const markDefs = block.markDefs || [];

    return block.children
      .map((child) => {
        let text = escapeHtml(child.text || '');

        if (!child.marks || child.marks.length === 0) {
          return text;
        }

        child.marks.forEach((markKey) => {
          if (markKey === 'strong') {
            text = `<strong>${text}</strong>`;
          } else if (markKey === 'em') {
            text = `<em>${text}</em>`;
          } else if (markKey === 'underline') {
            text = `<u>${text}</u>`;
          } else {
            // Verificar anotação de link em markDefs
            const def = markDefs.find((d) => d._key === markKey);
            if (def && def._type === 'link' && def.href) {
              const target = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
              text = `<a href="${escapeHtml(def.href)}"${target} class="article-link">${text}</a>`;
            }
          }
        });

        return text;
      })
      .join('');
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

  // ============================================================================
  // FORMATAÇÃO DE DATA EM PORTUGUÊS (PT-BR)
  // ============================================================================
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  function getReadingTime(textOrBlocks) {
    let text = '';
    if (typeof textOrBlocks === 'string') {
      text = textOrBlocks;
    } else if (Array.isArray(textOrBlocks)) {
      text = textOrBlocks
        .map((b) => (b.children ? b.children.map((c) => c.text).join(' ') : ''))
        .join(' ');
    }
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} min de leitura`;
  }

  // ============================================================================
  // FUNÇÕES PÚBLICAS DA API DE NOTÍCIAS
  // ============================================================================

  /**
   * Busca as últimas notícias para a seção da Home
   * @param {number} limit Quantidade de matérias (padrão: 3)
   */
  async function fetchLatestNoticias(limit = 3) {
    if (isConfigured()) {
      const groq = `*[_type == "noticia" && publishedAt <= now()] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        author,
        mainImage,
        excerpt
      }`;
      const result = await fetchGroq(groq);
      if (result && result.length > 0) {
        return result.map(normalizeNoticia);
      }
    }
    // Fallback para mock data
    return MOCK_NOTICIAS.slice(0, limit).map(normalizeNoticia);
  }

  /**
   * Busca lista paginada e filtrada de notícias para a página de listagem
   */
  async function fetchNoticiasList({ category = '', search = '', page = 1, limit = 9 } = {}) {
    if (isConfigured()) {
      let filter = `_type == "noticia" && publishedAt <= now()`;

      if (category && category !== 'Todas' && category !== 'todos') {
        filter += ` && category == "${category}"`;
      }

      if (search && search.trim() !== '') {
        const cleanSearch = search.trim().toLowerCase();
        filter += ` && (title match "*${cleanSearch}*" || excerpt match "*${cleanSearch}*")`;
      }

      const offset = (page - 1) * limit;
      const countGroq = `count(*[${filter}])`;
      const itemsGroq = `*[${filter}] | order(publishedAt desc)[${offset}...${offset + limit}] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        author,
        mainImage,
        excerpt
      }`;

      const total = (await fetchGroq(countGroq)) || 0;
      const items = (await fetchGroq(itemsGroq)) || [];

      if (items.length > 0 || total > 0) {
        return {
          items: items.map(normalizeNoticia),
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page
        };
      }
    }

    // Fallback Mock Filter
    let filtered = [...MOCK_NOTICIAS];
    if (category && category !== 'Todas' && category !== 'todos') {
      filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim() !== '') {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (n) => n.title.toLowerCase().includes(s) || (n.excerpt && n.excerpt.toLowerCase().includes(s))
      );
    }

    const total = filtered.length;
    const offset = (page - 1) * limit;
    const items = filtered.slice(offset, offset + limit).map(normalizeNoticia);

    return {
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  /**
   * Busca uma matéria específica pelo Slug
   */
  async function fetchNoticiaBySlug(slug) {
    if (!slug) return null;

    if (isConfigured()) {
      const groq = `*[_type == "noticia" && slug.current == "${slug}"][0] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        author,
        mainImage,
        excerpt,
        body
      }`;
      const result = await fetchGroq(groq);
      if (result) {
        return normalizeNoticia(result);
      }
    }

    // Fallback para Mock
    const mock = MOCK_NOTICIAS.find(
      (n) => (n.slug.current || n.slug) === slug || n.slug === slug
    );
    return mock ? normalizeNoticia(mock) : null;
  }

  /**
   * Busca matérias relacionadas (mesma categoria ou mais recentes)
   */
  async function fetchRelatedNoticias(currentSlug, category, limit = 3) {
    if (isConfigured()) {
      const groq = `*[_type == "noticia" && slug.current != "${currentSlug}" && publishedAt <= now()] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        category,
        author,
        mainImage,
        excerpt
      }`;
      const result = await fetchGroq(groq);
      if (result && result.length > 0) {
        return result.map(normalizeNoticia);
      }
    }

    const related = MOCK_NOTICIAS.filter(
      (n) => (n.slug.current || n.slug) !== currentSlug
    ).slice(0, limit);
    return related.map(normalizeNoticia);
  }

  /**
   * Normaliza os dados do documento para formato consistente
   */
  function normalizeNoticia(raw) {
    if (!raw) return null;
    const slugStr = typeof raw.slug === 'string' ? raw.slug : raw.slug ? raw.slug.current : '';
    const imageUrl = urlForImage(raw.mainImage, { width: 800, height: 500 });

    return {
      id: raw._id,
      title: raw.title || 'Sem título',
      slug: slugStr,
      url: `./noticia.html?slug=${encodeURIComponent(slugStr)}`,
      publishedAt: raw.publishedAt,
      formattedDate: formatDate(raw.publishedAt),
      category: raw.category || 'Institucional',
      author: raw.author || 'Assessoria de Comunicação Grupo +B',
      imageUrl: imageUrl,
      imageAlt: raw.mainImage && raw.mainImage.alt ? raw.mainImage.alt : raw.title,
      excerpt: raw.excerpt || '',
      bodyHtml: raw.body ? (typeof raw.body === 'string' ? raw.body : portableTextToHtml(raw.body)) : '',
      readingTime: getReadingTime(raw.body || raw.excerpt || '')
    };
  }

  // ============================================================================
  // EXPORTAÇÃO GLOBAL
  // ============================================================================
  window.SanityNewsClient = {
    config: SANITY_CONFIG,
    isConfigured,
    fetchLatestNoticias,
    fetchNoticiasList,
    fetchNoticiaBySlug,
    fetchRelatedNoticias,
    urlForImage,
    portableTextToHtml,
    formatDate,
    getReadingTime
  };
})(window);
