/* ==========================================================================
   LOGICA DO ALBUM DE FOTOS - GRUPO MAIS B
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Banco de dados de fotos do Grupo Mais B (Organizado e Verificado)
    const albumPhotos = [
        // Grupo +B (Holding)
        {
            "name": "Sede Administrativa",
            "role": "Estrutura corporativa e sede administrativa do Grupo +B.",
            "category": "grupo-b",
            "subcategory": "Institucional",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-alcindo-foto-de-fachada-da-loja.webp"
        },
        {
            "name": "Equipe Institucional Grupo +B",
            "role": "Colaboradores e lideranças reunidos celebrando o crescimento do Grupo.",
            "category": "grupo-b",
            "subcategory": "Time",
            "photo": "./assets/Fotografias/Grupo Institucional +B/grupob-time (1).webp"
        },
        {
            "name": "Integração e Propósito",
            "role": "União e cultura forte impulsionando os resultados de nossas marcas.",
            "category": "grupo-b",
            "subcategory": "Time",
            "photo": "./assets/Fotografias/Grupo Institucional +B/grupob-time (2).webp"
        },
        {
            "name": "Encontro de Lideranças",
            "role": "Fortalecimento de equipe e alinhamento estratégico corporativo.",
            "category": "grupo-b",
            "subcategory": "Time",
            "photo": "./assets/Fotografias/Grupo Institucional +B/grupob-time (3).webp"
        },
        
        // Supermercados +B
        {
            "name": "Fachada Unidade Alcindo",
            "role": "Fachada moderna e integrada da loja Alcindo Cacela.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Fachadas",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-alcindo-foto-de-fachada-da-loja.webp"
        },
        {
            "name": "Exposição e Mercearia",
            "role": "Exposição de produtos de mercearia e destaques no corredor central da loja Alcindo.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Mercearia",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-alcindo-foto-de-corredor-central-com-exposicao-de-produtos.webp"
        },
        {
            "name": "Fachada Unidade Plaza",
            "role": "Fachada da unidade Plaza, com design moderno e integrado.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Fachadas",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-plaza-foto-de-fachada-vila-plaza.webp"
        },
        {
            "name": "Fachada Frontal Tapanã",
            "role": "Fachada moderna servindo com excelência a região do Tapanã.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Fachadas",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-tapana-foto-de-fachada-frontal-da-loja.webp"
        },
        {
            "name": "Fachada Lateral Tapanã",
            "role": "Acesso facilitado e amplo estacionamento para nossos clientes.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Fachadas",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-tapana-foto-de-fachada-lateral-da-loja.webp"
        },
        {
            "name": "Corredor de Mercearia",
            "role": "Organização e grande variedade de produtos de mercearia no Tapanã.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Mercearia",
            "photo": "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-tapana-foto-de-corredor-central-da-mercearia.webp"
        },
        {
            "name": "Hortifrúti Selecionado",
            "role": "Frutas, legumes e verduras selecionados diariamente com frescor.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/00_CardHome/3-foto-supermercado.webp"
        },
        {
            "name": "Atendimento no Hortifrúti",
            "role": "Nossa equipe sempre pronta para ajudar a selecionar as melhores opções no Hortifrúti.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/02_Hortifruti/unid-plaza-foto-de-atendimento-no-hortifruti.webp"
        },
        {
            "name": "Variedade no Hortifrúti",
            "role": "Produtos frescos e selecionados diariamente com carinho.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/02_Hortifruti/unid-plaza-foto-de-hortifruti.webp"
        },
        {
            "name": "Espaço Verde no Hortifrúti",
            "role": "Ambiente agradável e planejado para uma melhor experiência de compra.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/02_Hortifruti/unid-plaza-foto-de-parede-verde-do-hortifruti.webp"
        },
        {
            "name": "Corredor de Hortifrúti",
            "role": "Qualidade e organização de vegetais e frutas na unidade Tapanã.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/02_Hortifruti/unid-tapana-foto-de-corredor-de-hortifruti.webp"
        },
        {
            "name": "Visão Geral do Hortifrúti",
            "role": "Estrutura moderna e gôndolas completas no setor de Hortifrúti do Tapanã.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Hortifrúti",
            "photo": "./assets/Fotografias/Supermercado +B/02_Hortifruti/unid-tapana-foto-de-visao-geral-do-hortifruti.webp"
        },
        {
            "name": "Cortes Nobres e Especiais",
            "role": "Seleção de carnes nobres e cortes especiais para o seu churrasco.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Carnes",
            "photo": "./assets/Fotografias/Supermercado +B/03_Carnes/unid-alcindo-foto-de-setor-de-carnes-nobres.webp"
        },
        {
            "name": "Açougue e Cortes Resfriados",
            "role": "Gôndola refrigerada com variedade de carnes bovinas e aves embaladas.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Carnes",
            "photo": "./assets/Fotografias/Supermercado +B/06_Lacteos-e-Frios/unid-alcindo-foto-de-corredor-de-frios-e-embutidos.webp"
        },
        {
            "name": "Praticidade em Carnes Embaladas",
            "role": "Cortes prontos e embalados para facilitar o seu dia a dia.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Carnes",
            "photo": "./assets/Fotografias/Supermercado +B/03_Carnes/unid-plaza-foto-de-carnes-embaladas.webp"
        },
        {
            "name": "Açougue e Atendimento",
            "role": "Variedade, procedência garantida e atendimento especializado de açougue.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Carnes",
            "photo": "./assets/Fotografias/Supermercado +B/03_Carnes/unid-plaza-foto-de-secao-de-carnes.webp"
        },
        {
            "name": "Açougue e Cortes Selecionados",
            "role": "Atendimento de primeira com carnes frescas e cortes selecionados.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Carnes",
            "photo": "./assets/Fotografias/Supermercado +B/03_Carnes/unid-tapana-foto-de-secao-de-carnes.webp"
        },
        {
            "name": "Padaria e Confeitaria",
            "role": "Pães quentinhos saindo a toda hora e deliciosos doces artesanais.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Padaria",
            "photo": "./assets/Fotografias/Supermercado +B/04_Padaria/unid-plaza-foto-de-padaria-e-reposicao-de-paes.webp"
        },
        {
            "name": "Rotisseria e Pizzas",
            "role": "Pizzas assadas na hora e salgados ideais para o seu lanche.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Padaria",
            "photo": "./assets/Fotografias/Supermercado +B/04_Padaria/unid-plaza-foto-de-pizzas-e-salgados.webp"
        },
        {
            "name": "Sushi e Pratos Prontos",
            "role": "Comida japonesa fresca e buffet completo de pratos prontos.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Padaria",
            "photo": "./assets/Fotografias/Supermercado +B/04_Padaria/unid-plaza-foto-de-sushi-e-pratos-prontos.webp"
        },
        {
            "name": "Padaria e Confeitaria",
            "role": "Produção diária de pães e salgados com ingredientes selecionados.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Padaria",
            "photo": "./assets/Fotografias/Supermercado +B/04_Padaria/unid-tapana-foto-de-padaria-com-reposicao.webp"
        },
        {
            "name": "Salgados e Pizzas Assadas",
            "role": "Variedade de pizzas e lanches rápidos na unidade Tapanã.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Padaria",
            "photo": "./assets/Fotografias/Supermercado +B/04_Padaria/unid-tapana-foto-de-pizza-e-salgados.webp"
        },
        {
            "name": "Adega e Seleção de Bebidas",
            "role": "Seção de vinhos e bebidas no Supermercado +B Alcindo.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Bebidas",
            "photo": "./assets/Fotografias/Supermercado +B/05_Bebidas/unid-alcindo-foto-de-adega-e-bebidas.webp"
        },
        {
            "name": "Adega e Bebidas Especiais",
            "role": "Seção de vinhos e bebidas no Supermercado +B Plaza.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Bebidas",
            "photo": "./assets/Fotografias/Supermercado +B/05_Bebidas/unid-plaza-foto-de-adega-e-bebidas.webp"
        },
        {
            "name": "Bebidas Importadas e Especiais",
            "role": "Cervejas artesanais, destilados e licores das melhores marcas.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Bebidas",
            "photo": "./assets/Fotografias/Supermercado +B/05_Bebidas/unid-plaza-foto-de-bebidas-especiais.webp"
        },
        {
            "name": "Espaço de Bebidas Self-Service",
            "role": "Variedade de refrigerantes, sucos e águas com prático atendimento.",
            "category": "supermercados-b",
            "unit": "Plaza",
            "subcategory": "Bebidas",
            "photo": "./assets/Fotografias/Supermercado +B/05_Bebidas/unid-plaza-foto-de-cliente-em-area-de-bebidas-self-service.webp"
        },
        {
            "name": "Ilha de Frios e Embutidos",
            "role": "Ilha de frios fatiados, queijos e laticínios selecionados na unidade Alcindo.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Lácteos e Frios",
            "photo": "./assets/Fotografias/Supermercado +B/06_Lacteos-e-Frios/unid-alcindo-foto-de-ilha-de-frios-e-rotisserie.webp"
        },
        {
            "name": "Laticínios e Derivados",
            "role": "Grande variedade de queijos, leites, iogurtes e derivados refrigerados.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Lácteos e Frios",
            "photo": "./assets/Fotografias/Supermercado +B/06_Lacteos-e-Frios/unid-tapana-foto-de-secao-de-lacteos.webp"
        },
        {
            "name": "Setor de Congelados",
            "role": "Refeições prontas, sorvetes e vegetais congelados para sua conveniência.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Congelados",
            "photo": "./assets/Fotografias/Supermercado +B/07_Congelados/unid-alcindo-foto-de-setor-de-congelados.webp"
        },
        {
            "name": "Ilha de Congelados",
            "role": "Ampla seção de congelados com marcas líderes de mercado.",
            "category": "supermercados-b",
            "unit": "Tapanã",
            "subcategory": "Congelados",
            "photo": "./assets/Fotografias/Supermercado +B/07_Congelados/unid-tapana-foto-de-congelados.webp"
        },
        {
            "name": "Equipe de Preparação de Alimentos",
            "role": "Colaboradores treinados e dedicados no manuseio e preparo de alimentos.",
            "category": "supermercados-b",
            "unit": "Alcindo",
            "subcategory": "Time",
            "photo": "./assets/Fotografias/Supermercado +B/09_Lanchonete/unid-alcindo-foto-de-equipe-na-preparacao-de-alimentos.webp"
        },
        
        // +B Farma
        {
            "name": "Atendimento +B Farma",
            "role": "Saúde, bem-estar e atendimento farmacêutico atencioso.",
            "category": "farma-b",
            "subcategory": "Atendimento",
            "photo": "./assets/Fotografias/Mais B Farma/foto-farma-b (1).webp"
        },
        {
            "name": "Medicamentos e Suplementos",
            "role": "Estoque completo de remédios, vitaminas e suplementos para sua saúde.",
            "category": "farma-b",
            "subcategory": "Medicamentos",
            "photo": "./assets/Fotografias/Mais B Farma/foto-farma-b (2).webp"
        },
        {
            "name": "Cosméticos e Cuidados Pessoais",
            "role": "Corredor com produtos de dermo-cosméticos, higiene e beleza.",
            "category": "farma-b",
            "subcategory": "Cosméticos",
            "photo": "./assets/Fotografias/Mais B Farma/foto-farma-b (3).webp"
        },
        {
            "name": "Estrutura e Conveniência Farma",
            "role": "Espaço planejado oferecendo conforto e conveniência para toda a família.",
            "category": "farma-b",
            "subcategory": "Institucional",
            "photo": "./assets/Fotografias/Mais B Farma/foto-farma-b (4).webp"
        },
        
        // Villa Plaza (Restaurante)
        {
            "name": "Ambiente Restaurante Villa Plaza",
            "role": "Espaço acolhedor, sofisticado e planejado para refeições em família.",
            "category": "villa-plaza",
            "subcategory": "Restaurante",
            "photo": "./assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-restaurante-ambiente.webp"
        },
        {
            "name": "Buffet de Pratos Quentes",
            "role": "Gastronomia variada com opções quentes e saborosas preparadas diariamente.",
            "category": "villa-plaza",
            "subcategory": "Rotisseria",
            "photo": "./assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-gastronomia_buffet_pratos_quentes.webp"
        },
        {
            "name": "Seleção de Saladas e Entradas",
            "role": "Opções leves, frescas e coloridas no buffet do restaurante.",
            "category": "villa-plaza",
            "subcategory": "Buffet",
            "photo": "./assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-gastronomia_buffet_saladas_selecao.webp"
        },
        {
            "name": "Serviço de Salão e Atendimento",
            "role": "Atendimento atencioso de garçons em um ambiente agradável.",
            "category": "villa-plaza",
            "subcategory": "Atendimento",
            "photo": "./assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-experiencia_servico_garcom.webp"
        },
        
        // Villa Plaza Park
        {
            "name": "Brinquedão Villa Plaza Park",
            "role": "Estrutura principal de lazer infantil com circuito de brinquedos e segurança.",
            "category": "villa-plaza-park",
            "subcategory": "Park Infantil",
            "photo": "./assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (1).webp"
        },
        {
            "name": "Piscina de Bolinhas",
            "role": "Muitas cores e diversão em área dedicada para os pequenos.",
            "category": "villa-plaza-park",
            "subcategory": "Park Infantil",
            "photo": "./assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (2).webp"
        },
        {
            "name": "Área de Recreação Infantil",
            "role": "Área de jogos e atividades lúdicas com acompanhamento.",
            "category": "villa-plaza-park",
            "subcategory": "Park Infantil",
            "photo": "./assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (3).webp"
        },
        {
            "name": "Escorregador e Jogos Kids",
            "role": "Atrações alegres para momentos inesquecíveis em família.",
            "category": "villa-plaza-park",
            "subcategory": "Park Infantil",
            "photo": "./assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (4).webp"
        },
        
        // The Wine Experience (Fotos exclusivas da submarca The Wine)
        {
            "name": "Parede de Vinhos e Exposição The Wine",
            "role": "Boutique adega com curadoria refinada de rótulos nacionais e internacionais.",
            "category": "the-wine",
            "subcategory": "Adega",
            "photo": "./assets/Fotografias/The Wine Experience/parede-vinhos-decoracao.webp"
        },
        {
            "name": "Salão Principal The Wine",
            "role": "Ambiente aconchegante para degustação de vinhos e ótimos momentos.",
            "category": "the-wine",
            "subcategory": "Experiência",
            "photo": "./assets/Fotografias/The Wine Experience/salao-principal-clientes.webp"
        },
        {
            "name": "Mesa Reservada na Adega",
            "role": "Espaço exclusivo para encontros e jantares harmonizados.",
            "category": "the-wine",
            "subcategory": "Adega",
            "photo": "./assets/Fotografias/The Wine Experience/mesa-reservada-adega.webp"
        },
        {
            "name": "Jantar Harmonizado e Brinde",
            "role": "Momentos marcantes com excelente gastronomia e seleção especial de vinhos.",
            "category": "the-wine",
            "subcategory": "Experiência",
            "photo": "./assets/Fotografias/The Wine Experience/jantar-harmonizado-brinde.webp"
        }
    ];

    const categoryLabels = {
        'grupo-b': 'Grupo Mais Barato',
        'supermercados-b': 'Supermercados +B',
        'farma-b': '+B Farma',
        'villa-plaza': 'Villa Plaza',
        'villa-plaza-park': 'Villa Plaza Park',
        'the-wine': 'The Wine Experience'
    };

    let currentFilter = 'all';
    let currentUnits = ['Plaza', 'Alcindo', 'Tapanã'];
    let currentChildFilter = 'all';
    let activePhotoIndices = [];
    let currentLightboxIndex = -1;
    let touchStartX = 0;
    let touchEndX = 0;
    let isLightboxInfoHidden = false;

    function getPhotoUnit(photoItem) {
        if (photoItem.unit) return photoItem.unit;
        if (photoItem.category === 'supermercados-b') {
            const text = (photoItem.name + ' ' + photoItem.photo).toLowerCase();
            if (text.includes('plaza')) return 'Plaza';
            if (text.includes('alcindo')) return 'Alcindo';
            if (text.includes('tapana') || text.includes('tapanã')) return 'Tapanã';
        }
        return '';
    }
    let visibleCount = 0;
    let searchQuery = '';

    function isMobile() {
        return window.innerWidth <= 640;
    }

    function getInitialCount(totalCount) {
        return isMobile() ? Math.min(6, totalCount) : Math.min(8, totalCount);
    }

    function getLoadMoreCount() {
        return isMobile() ? 2 : 4;
    }

    // Normalização para busca tolerante a acentos
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function matchesSearch(photoItem, query) {
        const cleanQuery = removeAccents(query.toLowerCase().trim());
        const cleanName = removeAccents(photoItem.name.toLowerCase());
        const cleanRole = removeAccents(photoItem.role.toLowerCase());
        return cleanName.includes(cleanQuery) || cleanRole.includes(cleanQuery);
    }

    // Split Name para destacar as primeiras palavras em negrito
    function splitTitle(fullTitle) {
        const parts = fullTitle.trim().split(/\s+/);
        if (parts.length === 0) return { first: '', rest: '' };
        if (parts.length <= 2) return { first: parts.join(' '), rest: '' };
        return {
            first: parts.slice(0, 2).join(' '),
            rest: parts.slice(2).join(' ')
        };
    }

    // Renderização do Grid Inicial
    function renderAlbumGrid() {
        const grid = document.getElementById('album-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        albumPhotos.forEach((photoItem, index) => {
            const card = document.createElement('div');
            card.className = 'album-card';
            card.id = `album-item-${index}`;
            card.setAttribute('data-category', photoItem.category);
            
            const nameSplit = splitTitle(photoItem.name);
            const categoryLabel = categoryLabels[photoItem.category] || '';
            const unit = getPhotoUnit(photoItem);
            
            card.innerHTML = `
                <div class="album-img-container">
                    <img src="${photoItem.photo}" alt="${photoItem.name}" loading="lazy">
                    <div class="album-zoom-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC400" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                </div>
                <div class="album-info-container">
                    <div class="album-badges-container">
                        <span class="album-badge badge-${photoItem.category}">${categoryLabel}</span>
                        ${unit ? `<span class="album-badge album-unit-badge badge-${photoItem.category}-soft">${unit}</span>` : ''}
                        ${(photoItem.subcategory && photoItem.category === 'supermercados-b') ? `<span class="album-badge album-sub-badge badge-${photoItem.category}-softest">${photoItem.subcategory}</span>` : ''}
                    </div>
                    <h3 class="album-photo-title">
                        <span class="album-photo-title-first">${nameSplit.first}</span>
                        <span class="album-photo-title-rest">${nameSplit.rest}</span>
                    </h3>
                    <div class="album-hover-hint" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </div>
                    <span class="album-photo-desc">${photoItem.role}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function updateAlbumVisibility(resetCount = false) {
        const activeIndices = [];
        albumPhotos.forEach((photoItem, index) => {
            const matchesCat = currentFilter === 'all' || photoItem.category === currentFilter;
            const photoUnit = getPhotoUnit(photoItem);
            const matchesUnit = photoUnit === '' || currentUnits.includes(photoUnit);
            const matchesChild = currentChildFilter === 'all' || photoItem.subcategory === currentChildFilter;
            const matchesQuery = searchQuery === '' || matchesSearch(photoItem, searchQuery);
            if (matchesCat && matchesUnit && matchesChild && matchesQuery) {
                activeIndices.push(index);
            }
        });
        
        activePhotoIndices = activeIndices;

        if (resetCount) {
            visibleCount = getInitialCount(activeIndices.length);
        }

        albumPhotos.forEach((photoItem, index) => {
            const card = document.getElementById(`album-item-${index}`);
            if (!card) return;
            const activeIndex = activeIndices.indexOf(index);

            if (activeIndex !== -1 && activeIndex < visibleCount) {
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
                card.classList.add('hidden');
            }
        });

        const loadMoreBtn = document.getElementById('album-load-more-btn');
        if (loadMoreBtn) {
            // Reseta classes do botão e adiciona o tema dinâmico da marca ativa
            loadMoreBtn.className = 'album-load-more-btn';
            loadMoreBtn.classList.add(`theme-${currentFilter}`);

            if (visibleCount < activeIndices.length) {
                loadMoreBtn.classList.remove('hidden');
            } else {
                loadMoreBtn.classList.add('hidden');
            }
        }
    }

    // Renderiza os filtros secundários (subfiltros) exclusivamente para a categoria Supermercados +B
    function renderChildFilters() {
        const childContainer = document.getElementById('album-child-filter-controls');
        if (!childContainer) return;

        if (currentFilter !== 'supermercados-b') {
            childContainer.innerHTML = '';
            childContainer.classList.add('hidden');
            return;
        }

        // Obtém subcategorias únicas correspondentes às fotos da marca selecionada
        const subcategories = [...new Set(
            albumPhotos
                .filter(photo => {
                    const matchesCat = photo.category === currentFilter;
                    const photoUnit = getPhotoUnit(photo);
                    const matchesUnit = photoUnit === '' || currentUnits.includes(photoUnit);
                    return matchesCat && matchesUnit;
                })
                .map(photo => photo.subcategory)
                .filter(Boolean)
        )];

        if (subcategories.length <= 1) {
            childContainer.innerHTML = '';
            childContainer.classList.add('hidden');
            return;
        }

        childContainer.innerHTML = '';
        
        // Botão "Todos" secundário
        const allBtn = document.createElement('button');
        allBtn.className = `album-child-filter-btn active active-theme-${currentFilter}`;
        allBtn.setAttribute('data-child-filter', 'all');
        allBtn.setAttribute('aria-label', 'Mostrar todos');
        allBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
        `;
        allBtn.addEventListener('click', () => {
            document.querySelectorAll('.album-child-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.className = 'album-child-filter-btn';
            });
            allBtn.className = `album-child-filter-btn active active-theme-${currentFilter}`;
            currentChildFilter = 'all';
            updateAlbumVisibility(true);
        });
        childContainer.appendChild(allBtn);

        // Botões de subcategorias reais
        subcategories.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'album-child-filter-btn';
            btn.textContent = sub;
            btn.setAttribute('data-child-filter', sub);
            btn.addEventListener('click', () => {
                document.querySelectorAll('.album-child-filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.className = 'album-child-filter-btn';
                });
                btn.className = `album-child-filter-btn active active-theme-${currentFilter}`;
                currentChildFilter = sub;
                updateAlbumVisibility(true);
            });
            childContainer.appendChild(btn);
        });

        childContainer.classList.remove('hidden');
    }

    // Configuração do Botão "Voltar Filtros" dinamicamente
    const filterButtonsContainer = document.querySelector('.album-filter-buttons');
    let voltarFiltrosBtn = document.getElementById('album-voltar-filtros-btn');
    if (filterButtonsContainer && !voltarFiltrosBtn) {
        voltarFiltrosBtn = document.createElement('button');
        voltarFiltrosBtn.id = 'album-voltar-filtros-btn';
        voltarFiltrosBtn.className = 'album-filter-btn voltar-filtros-btn hidden';
        voltarFiltrosBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span style="font-size: 0.52rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; line-height: 1;">Voltar</span>
        `;
        // Insere o botão de voltar como o primeiro filho
        filterButtonsContainer.insertBefore(voltarFiltrosBtn, filterButtonsContainer.firstChild);

        // Ação de voltar filtros (reseta a unidade primeiro, se houver, depois a marca)
        voltarFiltrosBtn.addEventListener('click', () => {
            const isAllUnitsSelected = currentUnits.length === 3;
            if (!isAllUnitsSelected) {
                currentUnits = ['Plaza', 'Alcindo', 'Tapanã']; // Volta a selecionar todas as unidades
                currentChildFilter = 'all';
                renderUnitFilters();
                renderChildFilters();
                updateAlbumVisibility(true);
            } else {
                const allBtn = document.querySelector('.album-filter-btn[data-filter="all"]');
                if (allBtn) {
                    allBtn.click();
                }
            }
        });
    }

    function updateFilterButtonsVisibility() {
        const mainFilterBtns = document.querySelectorAll('.album-filter-btn:not(.voltar-filtros-btn)');
        const voltarBtn = document.getElementById('album-voltar-filtros-btn');
        
        if (currentFilter === 'all') {
            // Se for "Todos", exibe todos os filtros principais e oculta o botão Voltar
            mainFilterBtns.forEach(btn => btn.classList.remove('hidden-filter'));
            if (voltarBtn) voltarBtn.classList.add('hidden');
        } else {
            // Se for uma submarca específica, esconde as outras marcas e mostra o botão Voltar
            mainFilterBtns.forEach(btn => {
                const filterVal = btn.getAttribute('data-filter');
                if (filterVal === currentFilter) {
                    btn.classList.remove('hidden-filter');
                } else {
                    btn.classList.add('hidden-filter');
                }
            });
            if (voltarBtn) voltarBtn.classList.remove('hidden');
        }
    }

    // Renderiza os botões de unidades (sub-filtros de supermercados-b)
    function renderUnitFilters() {
        // Remove quaisquer botões de unidade anteriores
        document.querySelectorAll('.album-unit-btn').forEach(btn => btn.remove());

        if (currentFilter !== 'supermercados-b') {
            currentUnits = ['Plaza', 'Alcindo', 'Tapanã'];
            return;
        }

        const filterButtonsContainer = document.querySelector('.album-filter-buttons');
        if (!filterButtonsContainer) return;

        const units = ['Plaza', 'Alcindo', 'Tapanã'];

        // Cria os botões para cada unidade (sem botão de grid para unidades)
        units.forEach(unit => {
            const btn = document.createElement('button');
            btn.className = `album-unit-btn unit-theme-${currentFilter}`;
            // Ativo se estiver na lista de selecionados
            if (currentUnits.includes(unit)) btn.classList.add('active');
            btn.textContent = `Unidade: ${unit}`;
            btn.addEventListener('click', () => {
                const isSelected = currentUnits.includes(unit);
                const isAllSelected = currentUnits.length === units.length;

                if (isAllSelected) {
                    // Se todas estavam selecionadas, seleciona apenas a clicada
                    currentUnits = [unit];
                } else if (isSelected) {
                    // Se já estava selecionada, desmarca ela
                    if (currentUnits.length === 1) {
                        // Se era a única ativa, volta a selecionar todas
                        currentUnits = ['Plaza', 'Alcindo', 'Tapanã'];
                    } else {
                        // Remove ela da lista
                        currentUnits = currentUnits.filter(u => u !== unit);
                    }
                } else {
                    // Senão, adiciona a unidade clicada à lista
                    currentUnits.push(unit);
                }

                currentChildFilter = 'all'; // Reseta o filtro filho (subcategoria)
                renderUnitFilters();
                renderChildFilters();
                updateAlbumVisibility(true);
            });
            filterButtonsContainer.appendChild(btn);
        });
    }

    // Configuração dos Botões de Filtros Principais
    const filterButtons = document.querySelectorAll('.album-filter-btn:not(.voltar-filtros-btn)');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterVal = btn.getAttribute('data-filter');
            if (currentFilter === filterVal) return; // Se já estiver filtrado por essa marca, não faz nada
            
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = filterVal;
            currentUnits = ['Plaza', 'Alcindo', 'Tapanã']; // Reseta a unidade ao trocar de marca
            currentChildFilter = 'all'; // Reseta o filtro filho (subcategoria)
            
            updateFilterButtonsVisibility();
            renderUnitFilters();
            renderChildFilters();
            updateAlbumVisibility(true);
        });
    });

    // Configuração do Botão "Ver Mais"
    const loadMoreBtn = document.getElementById('album-load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const activeIndicesCount = albumPhotos.filter(photoItem => {
                const matchesCat = currentFilter === 'all' || photoItem.category === currentFilter;
                const photoUnit = getPhotoUnit(photoItem);
                const matchesUnit = photoUnit === '' || currentUnits.includes(photoUnit);
                const matchesChild = currentChildFilter === 'all' || photoItem.subcategory === currentChildFilter;
                const matchesQuery = searchQuery === '' || matchesSearch(photoItem, searchQuery);
                return matchesCat && matchesUnit && matchesChild && matchesQuery;
            }).length;
            
            visibleCount = Math.min(visibleCount + getLoadMoreCount(), activeIndicesCount);
            updateAlbumVisibility(false);
        });
    }

    // Autocomplete e Busca
    const searchInput = document.getElementById('album-photo-search');
    const suggestionsContainer = document.getElementById('album-search-suggestions');

    if (searchInput && suggestionsContainer) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            updateAlbumVisibility(true);
            showAlbumSuggestions(searchQuery);
        });

        function showAlbumSuggestions(query) {
            if (!query.trim()) {
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.add('hidden');
                return;
            }

            const cleanQuery = removeAccents(query.toLowerCase().trim());
            const suggestions = [];

            albumPhotos.forEach(photoItem => {
                // Filtro consciente de contexto
                const matchesCat = currentFilter === 'all' || photoItem.category === currentFilter;
                const matchesChild = currentChildFilter === 'all' || photoItem.subcategory === currentChildFilter;
                if (!matchesCat || !matchesChild) return;

                const name = photoItem.name;
                const role = photoItem.role;
                
                const cleanName = removeAccents(name.toLowerCase());
                const cleanRole = removeAccents(role.toLowerCase());

                if (cleanName.includes(cleanQuery) && !suggestions.some(s => s.text === name)) {
                    suggestions.push({ text: name, type: 'Título' });
                }
                if (cleanRole.includes(cleanQuery) && !suggestions.some(s => s.text === role)) {
                    suggestions.push({ text: role, type: 'Descrição' });
                }
            });

            const filteredSuggestions = suggestions.slice(0, 5);

            if (filteredSuggestions.length === 0) {
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.add('hidden');
                return;
            }

            suggestionsContainer.innerHTML = filteredSuggestions.map(s => `
                <div class="album-suggestion-item" data-value="${s.text}">
                    <span>${s.text}</span>
                    <span class="album-suggestion-type">${s.type}</span>
                </div>
            `).join('');

            suggestionsContainer.classList.remove('hidden');
        }

        // Selecionar sugestão no clique
        suggestionsContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.album-suggestion-item');
            if (item) {
                const value = item.getAttribute('data-value');
                searchInput.value = value;
                searchQuery = value;
                updateAlbumVisibility(true);
                suggestionsContainer.classList.add('hidden');
            }
        });

        // Fechar sugestões clicando fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.album-search-container')) {
                suggestionsContainer.classList.add('hidden');
            }
        });

        // Fechar no Escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                suggestionsContainer.classList.add('hidden');
                searchInput.blur();
            }
        });
    }

    // Ajustar breakpoints de exibição ao redimensionar
    let lastIsMobile = isMobile();
    window.addEventListener('resize', () => {
        const currentIsMobile = isMobile();
        if (currentIsMobile !== lastIsMobile) {
            lastIsMobile = currentIsMobile;
            updateAlbumVisibility(true);
        }
    });

    // Criação Dinâmica do Modal Lightbox
    const albumSection = document.querySelector('.album-section');
    if (albumSection) {
        const lightbox = document.createElement('div');
        lightbox.className = 'album-lightbox';
        lightbox.id = 'album-lightbox';
        lightbox.innerHTML = `
            <div class="album-lightbox-wrapper">
                <button class="album-lightbox-close" id="album-lightbox-close">&times;</button>
                <button class="album-lightbox-nav prev" id="album-lightbox-prev" aria-label="Anterior">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="album-lightbox-card-container" id="album-lightbox-card-container"></div>
                <button class="album-lightbox-nav next" id="album-lightbox-next" aria-label="Próximo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            <div class="album-lightbox-dots" id="album-lightbox-dots"></div>
        `;
        document.body.appendChild(lightbox);

        const lightboxClose = document.getElementById('album-lightbox-close');
        const lightboxPrev = document.getElementById('album-lightbox-prev');
        const lightboxNext = document.getElementById('album-lightbox-next');
        const lightboxCardContainer = document.getElementById('album-lightbox-card-container');

        // Função para abrir o Lightbox em uma foto específica
        const openLightboxAt = (dbIndex) => {
            currentLightboxIndex = dbIndex;
            const photoItem = albumPhotos[dbIndex];
            const categoryLabel = categoryLabels[photoItem.category] || '';
            const unit = getPhotoUnit(photoItem);
            const nameSplit = splitTitle(photoItem.name);
            
            const fsCard = document.createElement('div');
            fsCard.className = 'album-card album-fullscreen-card';
            fsCard.setAttribute('data-category', photoItem.category);
            
            // Persiste o estado global de visibilidade do texto
            if (isLightboxInfoHidden) {
                fsCard.classList.add('info-hidden');
            }

            fsCard.innerHTML = `
                <div class="album-img-container">
                    <img src="${photoItem.photo}" alt="${photoItem.name}" loading="lazy">
                    <div class="album-zoom-icon"></div>
                </div>
                <div class="album-info-container">
                    <div class="album-badges-container">
                        <span class="album-badge badge-${photoItem.category}">${categoryLabel}</span>
                        ${unit ? `<span class="album-badge album-unit-badge badge-${photoItem.category}-soft">${unit}</span>` : ''}
                        ${photoItem.subcategory ? `<span class="album-badge album-sub-badge badge-${photoItem.category}-softest">${photoItem.subcategory}</span>` : ''}
                    </div>
                    <h3 class="album-photo-title">
                        <span class="album-photo-title-first">${nameSplit.first}</span>
                        <span class="album-photo-title-rest">${nameSplit.rest}</span>
                    </h3>
                    <span class="album-photo-desc">${photoItem.role}</span>
                </div>
            `;
            
            // Clique para alternar visibilidade das informações (focando na foto)
            fsCard.addEventListener('click', (ev) => {
                ev.stopPropagation(); // Evita que feche o modal
                isLightboxInfoHidden = !isLightboxInfoHidden;
                fsCard.classList.toggle('info-hidden', isLightboxInfoHidden);
            });
            
            // Gestos Swipe no mobile
            setupSwipeGestures(fsCard);
            
            lightboxCardContainer.innerHTML = '';
            lightboxCardContainer.appendChild(fsCard);
            lightbox.setAttribute('data-category', photoItem.category);
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Controle de visibilidade das setas laterais (carrossel não infinito)
            const currentPos = activePhotoIndices.indexOf(dbIndex);
            if (lightboxPrev) {
                if (currentPos === 0) {
                    lightboxPrev.classList.add('nav-hidden');
                } else {
                    lightboxPrev.classList.remove('nav-hidden');
                }
            }
            if (lightboxNext) {
                if (currentPos === activePhotoIndices.length - 1) {
                    lightboxNext.classList.add('nav-hidden');
                } else {
                    lightboxNext.classList.remove('nav-hidden');
                }
            }

            // Atualizar os dots indicadores
            updateLightboxDots();
        };

        // Navegação pelo Lightbox (direção: 1 = próximo, -1 = anterior)
        const navigateLightbox = (direction) => {
            if (activePhotoIndices.length <= 1) return;
            
            let currentPos = activePhotoIndices.indexOf(currentLightboxIndex);
            if (currentPos === -1) return;
            
            let nextPos = currentPos + direction;
            
            // Bloqueia navegação nas extremidades (carrossel não infinito)
            if (nextPos >= activePhotoIndices.length || nextPos < 0) {
                return;
            }
            
            const nextDbIndex = activePhotoIndices[nextPos];
            openLightboxAt(nextDbIndex);
        };

        // Atualizar dots dinamicamente
        const updateLightboxDots = () => {
            const dotsContainer = document.getElementById('album-lightbox-dots');
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            
            const totalPhotos = activePhotoIndices.length;
            const currentPos = activePhotoIndices.indexOf(currentLightboxIndex);
            
            if (totalPhotos <= 1) return;
            
            activePhotoIndices.forEach((dbIdx, pos) => {
                const dot = document.createElement('div');
                dot.className = 'album-lightbox-dot' + (pos === currentPos ? ' active' : '');
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightboxAt(dbIdx);
                });
                dotsContainer.appendChild(dot);
            });
        };

        // Swipe Gestures
        const setupSwipeGestures = (element) => {
            element.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            element.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipeGesture();
            }, { passive: true });
        };
        
        const handleSwipeGesture = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                navigateLightbox(1); // Swipe esquerda -> Próximo
            } else if (touchEndX > touchStartX + swipeThreshold) {
                navigateLightbox(-1); // Swipe direita -> Anterior
            }
        };

        // Evento de Clique no Grid para Abrir Lightbox
        const grid = document.getElementById('album-grid');
        if (grid) {
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.album-card');
                if (card) {
                    card.classList.add('visited');
                    
                    const cardId = card.id;
                    const dbIndex = parseInt(cardId.replace('album-item-', ''), 10);
                    openLightboxAt(dbIndex);
                }
            });
        }

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.removeAttribute('data-category');
            document.body.style.overflow = '';
            isLightboxInfoHidden = false; // Reseta o estado global ao fechar
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(-1);
            });
        }
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateLightbox(1);
            });
        }
        
        lightbox.addEventListener('click', (e) => {
            // Se clicar fora do container do card (no overlay escuro ou no wrapper)
            if (!e.target.closest('.album-lightbox-card-container') && !e.target.closest('.album-lightbox-nav')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight' || e.key === 'Right') {
                navigateLightbox(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                navigateLightbox(-1);
            }
        });
    }

    // Inicialização
    renderAlbumGrid();
    updateFilterButtonsVisibility();
    renderUnitFilters();
    renderChildFilters();
    updateAlbumVisibility(true);
});
