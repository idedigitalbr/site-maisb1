/* Conteúdo local do site legado. A aplicação Next usa o mesmo modelo no MySQL. */
(function () {
  const articles = [
    { slug: 'grupo-mais-barato-celebra-10-anos-expansao-varejo-paraense', title: 'Grupo Mais Barato celebra 10 anos de expansão e inovação no varejo paraense', category: 'Institucional', publishedAt: '2026-08-20T12:00:00-03:00', excerpt: 'Com mais de 10 mil metros quadrados de área operacional e 5 marcas consolidadas, o Grupo reafirma seu compromisso com Belém e com a geração de oportunidades.', imageUrl: './assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png', imageAlt: 'Equipe do Grupo Mais Barato em frente à unidade', body: ['Desde a sua fundação em 2015, o Grupo Mais Barato tem sido sinônimo de pioneirismo, respeito às pessoas e compromisso inegociável com a qualidade. O que começou como uma visão de transformar o varejo local hoje se consolida como um dos ecossistemas de marcas mais integrados da Região Norte.', 'Hoje, o ecossistema abrange os Supermercados +B, a rede de farmácias +B Farma, os espaços de conveniência e lazer Villa Plaza e Villa Plaza Park, além da boutique refinada The Wine Experience. Essa sinergia permite atender os clientes em todas as suas necessidades diárias com máxima excelência.', 'Mais do que crescer, nosso propósito sempre foi transformar relações e construir um futuro sustentável para as comunidades onde estamos inseridos.', 'Os próximos anos trarão investimentos contínuos em tecnologia, infraestrutura logística e capacitação de colaboradores, mantendo Belém no centro do nosso coração e dos nossos negócios.'] },
    { slug: 'the-wine-experience-apresenta-selecao-exclusiva-de-rotulos', title: 'The Wine Experience apresenta seleção exclusiva de rótulos internacionais para o segundo semestre', category: 'The Wine Experience', publishedAt: '2026-08-15T12:00:00-03:00', excerpt: 'Adega premium traz safras consagradas de vinícolas do Chile, Argentina, França e Itália com atendimento especializado.', imageUrl: './assets/Fotografias/The Wine Experience/salao-principal-clientes.webp', imageAlt: 'Equipe da The Wine Experience', body: ['A The Wine Experience amplia a curadoria de rótulos e experiências para quem aprecia bons vinhos.'] },
    { slug: 'mais-b-supermercados-expande-setor-de-carnes-nobres', title: '+B Supermercados expande setor de carnes nobres e hortifrúti selecionado na unidade Alcindo Cacela', category: '+B Supermercados', publishedAt: '2026-08-10T12:00:00-03:00', excerpt: 'Novos balcões climatizados, cortes especiais com padrão gourmet e hortifrúti abastecido diariamente.', imageUrl: './assets/Fotografias/Supermercado +B/00_CardHome/4-supemercado.webp', imageAlt: 'Setor de carnes do supermercado +B', body: ['A expansão reforça o compromisso com qualidade, variedade e proximidade.'] },
    { slug: 'mais-b-farma-inaugura-programa-atencao-farmaceutica', title: '+B Farma inaugura programa de atenção farmacêutica com aferições e orientações gratuitas', category: '+B Farma', publishedAt: '2026-08-01T12:00:00-03:00', excerpt: 'Iniciativa reforça o cuidado integral com a saúde e o bem-estar da família paraense com farmacêuticos presentes em tempo integral.', imageUrl: './assets/Fotografias/Mais B Farma/foto-farma-b (1).webp', imageAlt: 'Atendimento na +B Farma', body: ['A iniciativa reforça o cuidado integral com a saúde e o bem-estar das famílias paraenses.'] },
    { slug: 'villa-plaza-park-anuncia-programacao-cultural-lazer-gastronomia', title: 'Villa Plaza Park anuncia programação cultural de lazer e gastronomia para os finais de semana', category: 'Villa Plaza', publishedAt: '2026-07-28T12:00:00-03:00', excerpt: 'Música ao vivo, espaço kids seguro, food park e ambientes instagramáveis fazem do complexo o ponto de encontro favorito na região.', imageUrl: './assets/Fotografias/Villa Plaza (Park Infantil)/villa-plaza-park-tapana.webp', imageAlt: 'Área infantil do Villa Plaza Park', body: ['O Villa Plaza Park reúne diversão, gastronomia e experiências para toda a família.'] },
  ];

  const format = (date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
  const view = (article) => ({ ...article, url: `./noticia.html?slug=${article.slug}`, formattedDate: format(article.publishedAt) });
  const list = (options = {}) => {
    const category = options.category || 'Todas';
    const search = String(options.search || '').toLocaleLowerCase('pt-BR');
    const filtered = articles.filter((article) => (category === 'Todas' || article.category === category) && (!search || `${article.title} ${article.excerpt}`.toLocaleLowerCase('pt-BR').includes(search)));
    const page = Number(options.page || 1);
    const limit = Number(options.limit || filtered.length || 1);
    return { items: filtered.slice((page - 1) * limit, page * limit).map(view), total: filtered.length, totalPages: Math.ceil(filtered.length / limit) };
  };

  window.SiteContentClient = {
    fetchLatestNoticias: async (limit) => list({ limit }).items,
    fetchNoticiasList: async (options) => list(options),
    fetchNoticiaBySlug: async (slug) => { const article = articles.find((item) => item.slug === slug); return article ? view(article) : null; },
    fetchRelatedNoticias: async (slug, category, limit) => articles.filter((item) => item.slug !== slug && item.category !== category).slice(0, limit || 3).map(view),
  };
}());
