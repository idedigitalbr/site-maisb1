# Changelog

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
