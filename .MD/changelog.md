# Changelog

- **Recriação e Redesign Premium da Seção "Nossas Marcas / Espiral"**:
  - **Correção da Falha de Sintaxe no CSS**: Identificada e corrigida a chave não fechada na regra `.gallery-panel` do `src/css/brands.css`, restaurando todo o código CSS descartado pelo navegador.
  - **Medalhões Circulares Glassmorphism**: Reestilizados os ícones satélites das submarcas na espiral (`.node-logo-wrapper`) para formato 100% circular (`border-radius: 50%`), eliminando caixas pretas quadradas e aplicando fundo translúcido com brilho sutil.
  - **Emblema da Marca Sobreposto 100% Circular**: Ajustado `.card-logo-overlap` no card de detalhes com borda ultrafina de 1px discreta e efeito de vidro escuro.
  - **Suavização dos Efeitos de Hover**: Atenuadas as sombras e bordas estouradas dos cards e medalhões, aplicando iluminação elegante e sombras de profundidade realistas.
  - **Setas Flutuantes Restauradas**: Setas laterais circulares de 48px com acabamento em vidro e iluminação suave ao passar o mouse.
  - **Invalidação de Cache (`v=9.2`)**: Incrementada a versão das folhas de estilo em `index.html` e `main.css` para atualização imediata nos navegadores.

- **Remoção da Linha de Valores e Redesign de Métricas ("Sobre Nós")**:
  - Removida a linha de blocos de valores (`PROPÓSITO`, `PESSOAS`, `EXCELÊNCIA`, `FUTURO`) de [sobre-nos.html](file:///g:/Meu%20Drive/.PROJETOS/Sites%20Institucionais/site-maisb1/sobre-nos.html) conforme solicitado.
  - Mantida apenas a linha de números/métricas da trajetória no layout *open row* minimalista com divisores finos e tipografia limpa.

- **Controles do Vídeo Hero Institucional ("Sobre Nós")**:
  - **Barra de Progresso Minimalista Interativa**: Adicionada a linha de tempo no centro inferior da seção do vídeo topo (`.video-progress-container`), com visual minimalista dourado (`var(--yellow)`), atualização em tempo real do tempo decorrido do vídeo e suporte a clique/arraste para avançar ou retroceder a reprodução (*scrubber*).
  - **Botão Fullscreen no Canto Inferior Direito**: Posicionado ao lado direito do botão de Mute/Unmute, com estilo idêntico em vidro escuro e brilho dourado (`.video-fullscreen-btn`), alternando a exibição em tela cheia do vídeo/seção com alteração dinâmica de ícones.

- **Correção dos Links e Endereços do Google Maps ("Nossas Unidades")**:
  - Atualização dos URLs do Google Maps para a API de Busca oficial (`https://www.google.com/maps/search/?api=1&query=...`), garantindo direcionamento exato para a página oficial do estabelecimento em cada unidade (+B Supermercado Alcindo Cacela, +B Supermercado Tapanã e +B Supermercado Villa Plaza).
  - Correção dos endereços e coordenadas no banco de dados (`src/data/units.js`) e na Home (`index.html`):
    - **Alcindo Cacela**: Atualizado para `Av. Alcindo Cacela, 1848 - Nazaré` (coordenadas reais: `[-1.4516, -48.4779]`).
    - **Tapanã**: Atualizado para `Rod. Tapanã, 597 - Tapanã`.
    - **Villa Plaza**: Atualizado para `Av. Gov. José Malcher, 2388 - São Brás`.
  - Atualização no gerador de cards de unidades (`src/js/unidades.js`) para utilizar o fallback de busca de localização oficial do Google Maps.

## 2026-07-27

- **Eliminação de Botões e Cores Vermelhas**:
  - Substituído o botão vermelho `.red-btn` no modal/árvore de links (`links.html` e `src/css/links.css`) pelo novo **botão branco premium (`.white-btn`)** com fundo `#FFFFFF` sólido, texto preto (`#000000`) e hover limpo.
  - Removido o hover vermelho do botão de fechar (`.card-close-btn`) e dos itens de marca (`.brand-super`, `.brand-farma`), padronizando com brilho dourado e transparências minimalistas.
- Correção e refinamento de design da página **Sobre Nós** (`sobre-nos.html`):
  - **Substituição da Imagem Principal**: Atualizada a foto da Seção 1 para a foto oficial da fachada do supermercado (`unid-plaza-foto-de-fachada-vila-plaza.webp`).
  - **Correção da Foto do Marco 2019**: Corrigido o caminho do arquivo da foto da +B Farma (`./assets/Fotografias/Mais B Farma/foto-banner-maisb-farmacia.webp`), resolvendo o problema da imagem quebrada na Linha do Tempo.
  - **Nova Tag Minimalista da Timeline**: Substituída a antiga pílula amarela de timeline pela tag oficial sem fundo (`.eyebrow-gold`), alinhada ao padrão visual minimalista do projeto.
  - **Refinamento dos Blocos de Valores e Métricas**: Reformulação em layout *open-row* com divisores verticais minimalistas em Dark Mode (fundo limpo `#08080c`, números em grande escala e sem containers de bordas pesadas), fiéis ao estilo do Print 2.
- Remoção dos indicadores de pontinhos/traços no carrossel do topo Hero (`index.html`, `src/css/hero.css` e `src/js/hero-carousel.js`), mantendo exclusivamente a barra de progresso horizontal refinada.
- Refatoração da **Seção 2 (Sobre o Grupo / "sobrenoszinho")** da Home (`index.html` e `src/css/sections.css`) com alinhamento 100% idêntico à referência do protótipo (`s2-sobrezinho.png`).
- Atualização da foto principal da Seção 2 para a fachada oficial (`s1-topo-hero-foto-.png`).
- Aplicação do estilo de tipografia serifada itálica em dourado (`.headline-highlight-italic`) na palavra de destaque *"expansão."*.
- Reestruturação das métricas (`.about-stats-row`): alinhamento à esquerda, números em destaque (`font-weight: 700`), divisores verticais em tom dourado (`#C49A45`) e espaçamentos simétricos.
- Atualização da versão do CSS em `index.html` para `?v=8.5`.

## 2026-07-22

- Atualização dos nomes e cargos dos depoimentos no carrossel da Home (`index.html`): **Miki Nogani (Cliente +B)**, **Karina Santos (Cliente +B)**, **Maria Antonieta (Cliente +B)** e **Olhala & Equipe (Parceiro Institucional)**.
- Atualização da imagem do marco **2019 (Nascimento da Rede +B Farma)** na Linha do Tempo "Nossa Trajetória" (`sobre-nos.html` e `main.js`) para a foto oficial da farmácia (`foto-banner-maisb-farmacia.webp`).
- Atualização dos textos da seção Eventos na Home (`index.html`): badge alterado para **"APROVEITE E CONHEÇA"** e título principal atualizado para **"Eventos +B feitos para cuidar de você e reunir quem você ama"**.
- Substituição dos vídeos duplicados do carrossel da seção Depoimentos da Home (`index.html`) por 4 vídeos reais e inéditos (`depoimento-cliente-parceiro-mais-b.mp4`, `depo-japa.mp4`, `depo-fk.mp4` e `depo-olhala.mp4`), otimizados para reprodução web.
- Conversão global de caminhos absolutos (`/assets/`) para relativos (`./assets/`) em todo o projeto, garantindo 100% de compatibilidade e carregamento de imagens no protocolo local (`file://`) e no servidor web.
- Correção das fotos quebradas na linha do tempo "Nossa Trajetória" (`main.js` e `sobre-nos.html`), atualizando todos os marcos históricos com mídias de alta definição dos assets.
- Reformulação do modal Lightbox do álbum de fotos (`album.css`): aplicação de `object-fit: contain` e ampliação do modal no desktop para exibir fotos horizontais e verticais 100% completas sem nenhum corte lateral.
- Inclusão das 3 novas fotos oficiais de equipe e liderança do Grupo +B (Holding) no álbum da marca.
- Limpeza dos títulos das fotos do álbum (`album.js`), removendo redundâncias com o nome da unidade e mantendo o identificador visual nas pílulas/badges vermelhas.
- Restrição dinâmica da barra de subfiltros (departamentos) exclusivamente para a categoria Supermercados +B.
- Revisão completa do álbum de fotos na página Sobre Nós (`src/js/album.js`): correção de nomes de setores (Exposição e Mercearia Alcindo, Açougue Alcindo, Hortifrúti Selecionado Alcindo), remoção de fotos duplicadas e atualização das imagens das submarcas (+B Farma, Villa Plaza Park e Grupo +B).
- Reformulação do álbum da submarca The Wine Experience para exibir exclusivamente suas 4 fotos oficiais de ambientação, adega e degustação, removendo fotos genéricas do supermercado.
- Atualizados os botões "Ver links" dos cards de marcas em destaque para abrirem em nova guia (`target="_blank"`) apontando diretamente para os canais do Linktree (The Wine, Supermercados +B, +B Farma, Villa Plaza Park e Villa Plaza Restaurante).
- Substituídas e otimizadas em formato WebP as fotos da galeria dos cards de Supermercados +B (`00_CardHome`), +B Farma e Villa Plaza Park, reduzindo o consumo de banda em até 90%.
- Removido o efeito de zoom forçado (`transform: scale(2.4)`) e posicionamentos extremos nos cards de Marcas em Destaque (`+B Farma` e `Villa Plaza Park`) no arquivo `src/css/brands.css`.
- Reenquadradas as fotos das galerias com `object-fit: cover` e `object-position: center 20%` para exibir o assunto principal (rostos dos atendentes, prateleiras e ambientes) de forma inteira e natural sem distorção.
- Incrementada a versão do import CSS em `src/css/main.css` para `?v=8.4` garantindo a atualização imediata nos navegadores dos usuários.

## 2026-07-21

- Atualizadas as imagens de fundo do carrossel no topo da Home (`index.html`) para os slides "Trabalhe Conosco" (`topo-banner-trabalhe-conosco.webp`) e "Seja parceiro" (`topo-banner-seja-parceiro.webp`).
- Reordenados os slides do carrossel do topo: "Trabalhe Conosco" passou a ser o 2º slide e "Seja parceiro" o 3º slide.
- Removidos os filtros overlay coloridos (vermelho e amarelo) dos slides do topo, deixando o fundo limpo das imagens originais.
- Reestilizados os elementos visuais dos dois slides no topo: adicionadas tags/badges duplas com ícones (maleta e coração com aperto de mão) e bordas em destaque.
- Ajustados os botões do topo ("Quero me candidatar" e "Quero agendar reunião") com fundo preto sólido e estados de hover personalizados.
- Definida a escrita da seção do topo do Trabalhe Conosco inteiramente na cor preta sólida (`#000000`).
- Corrigida a responsividade e estabilidade visual da seção de Depoimentos Premium (`.testimonials-section-premium`) para diferentes níveis de zoom do navegador (110%, 125%, 150%) e resoluções de tela (notebooks, monitores grandes e TVs).
- Removido o colapso precoce do layout em 1320px, mantendo a grade fluida em 2 colunas (`minmax(0, 1fr) minmax(280px, 400px)`) para telas de desktop.
- Adicionada restrição de largura máxima (`max-width: 1440px`) com centralização automática no container para garantir proporção perfeita em monitores Ultra-Wide e TVs 4K.
- Reajustado o alinhamento vertical e a ancoragem das setas de navegação (`.testimonials-prev-btn` e `.testimonials-next-btn`) com base no centro dos cards de vídeo 9:16.

## 2026-07-20

- Adicionado link externo para o site da Mais B Run (`https://www.maisbrun.com.br/`) no banner da seção "Conheça nossos eventos" na Home (`index.html`).
- Separado o elemento wrapper externo (`.events-banner-wrapper`) do container de recorte interno (`.events-banner-inner`) no HTML e CSS para preservar totalmente a sombra projetada (`box-shadow`) e a animação de hover (`translateY(-8px)`).
- Intensificada a sombra projetada no estado padrão (`box-shadow: 0 14px 35px rgba(0, 0, 0, 0.15)`) e no estado de hover (`box-shadow: 0 26px 65px rgba(0, 0, 0, 0.35)`).
- Atualizada a versão de cache dos arquivos CSS para `?v=6.0` em `index.html`, `sobre-nos.html` e `main.css`.

## 2026-07-08

- Sincronização inicial automática e mapeamento da estrutura do projeto.
