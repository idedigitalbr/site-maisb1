# Design System — Grupo +B

## Princípios

1. Preservar a identidade oficial do site legado antes de otimizar a implementação.
2. Usar semântica HTML e Lucide para controles; reservar SVGs e imagens oficiais para logos, marcas e artwork.
3. Preferir tokens semânticos para cor, tipografia, espaçamento, raio, elevação e foco.
4. Manter contraste, foco visível, teclado e reduced motion como requisitos funcionais.
5. Compartilhar componentes e dados sem alterar URLs, conteúdo, slugs ou regras do CMS.

## Tipografia Oficial (Dupla Engrenagem Editorial)

A identidade opera em regime de **dupla engrenagem editorial**: a sofisticada **DM Serif Display** em títulos expressivos e frases em itálico dourado, equilibrada pela clareza funcional da **DM Sans** para corpo, interface, menus e dados.

| Papel | Fonte | Uso |
| --- | --- | --- |
| Headlines & Títulos | DM Sans (700 Bold) | Títulos de destaque, chamadas institucionais e nomes de marcas |
| Destaques Nobres / Itálicos | DM Serif Display (400 Italic / Dourado #C89223) | Nomes de marcas ou termos em destaque nos títulos (`.headline-highlight-italic`, `.serif-accent`) |
| Interface/corpo | DM Sans (400/500) | Navegação, corpo, cards, formulários e painel |
| Eyebrow | DM Sans (700, uppercase) | Rótulos de seção e categoria (`12px`, letter-spacing `0.14em`) |
| Metadata | DM Sans (400/500) | Datas, status, endereço e informações auxiliares |

Títulos devem usar `letter-spacing` negativo com parcimônia e line-height compacto. O nome da marca e termos de destaque recebem o toque nobre da **DM Serif Display** em itálico dourado.

## Tokens semânticos

Os valores abaixo são aliases de uma única fonte visual oficial, mapeada para os valores do legado em `app/globals.css`:

| Token | Valor oficial | Uso |
| --- | --- | --- |
| `--color-page` | `#FDFAF6` | Fundo claro de página |
| `--color-surface` | `#FFFFFF` | Cards e painéis elevados |
| `--color-surface-soft` | `#F8F5F0` | Campos e superfícies suaves |
| `--color-surface-inverse` | `#120E0E` | Header/footer e seções escuras |
| `--color-surface-inverse-soft` | `#191616` | Cards escuros e hover |
| `--color-text` | `#120E0E` | Texto principal em fundo claro |
| `--color-text-inverse` | `#FDFAF6` | Texto em fundo escuro |
| `--color-text-muted` | `#8E8780` | Metadata e descrições |
| `--color-border` | `#DED8D0` | Bordas claras |
| `--color-border-inverse` | `rgba(253,250,246,.14)` | Bordas sobre fundo escuro |
| `--color-primary` | `#C89223` | Gold principal, ação e destaque |
| `--color-primary-hover` | `#B48838` | Hover e estados ativos |
| `--color-focus` | `#C49A45` | Anel de foco |
| `--color-success` | `#237A4A` | Publicado/sucesso |
| `--color-warning` | `#A87516` | Rascunho/atenção |
| `--color-danger` | `#9F342D` | Exclusão/erro |

Compatibilidade: `--black`, `--paper`, `--ink`, `--gold`, `--muted` e aliases do CSS legado continuam válidos durante a migração, mas código novo deve preferir os tokens semânticos.

## Geometria e elevação

- `--radius-control`: 12px para inputs e botões padrão.
- `--radius-panel`: 16px para cards e painéis.
- `--radius-section`: 28px para seções grandes arredondadas do legado.
- `--shadow-panel`: sombra neutra suave, sem brilho colorido em superfícies claras.
- `--space-1` a `--space-8`: escala de 4px, 8px, 12px, 16px, 24px, 32px, 48px e 64px.
- Valores geométricos únicos podem permanecer explícitos; cores e estados repetidos devem usar tokens.

## Componentes

### Button

Variantes mantidas: `default`, `gold`, `outline`, `ghost` e `danger`. Todo botão deve ter nome acessível, `type="button"` quando não for submit, foco visível, estado disabled e gap de 8px entre ícone e texto.

### Badge/status

Badge usa cápsula, borda e texto semântico. Ícones têm `size-3.5 shrink-0`; o gap entre ícone e texto é 6px. O status deve ser compreensível por texto, não apenas por cor.

### Input/textarea

Campos têm fundo de superfície, borda clara, placeholder muted, foco gold e label associado. Busca deve ter `type="search"`, nome acessível e estado vazio com ação de limpeza quando aplicável.

### Cards

Cards preservam imagem, título e conteúdo aprovados por página. Ações devem ser links/botões reais. Não inserir badges, resumo, tempo de leitura ou ação removidos por decisão visual anterior.

## Ícones

Usar `lucide-react` para busca, navegação, mídia, localização, ações, status e compartilhamento. Tamanhos padrão: 16px em texto, 18px em controles, 20–24px em ações isoladas. Logos, pins de marca e artwork permanecem com os assets oficiais.

## Motion e interação

- Transições padrão: 180–280ms.
- Efeitos de spotlight, reveal, glow e órbita são decorativos e não podem esconder conteúdo ou bloquear interação.
- `prefers-reduced-motion: reduce` remove transições e loops decorativos, mas mantém conteúdo visível e estados funcionais.
- Menus, modais e lightboxes fecham com Escape e retornam o foco ao acionador.

## Responsividade

Usar os breakpoints já adotados pelo legado/Tailwind. Desktop mantém grids e proporções oficiais; tablet reduz colunas e gaps; mobile empilha conteúdo, mantém controles com área de toque adequada e não cria overflow horizontal. Cada mudança deve ser validada em 1440x900, 1024x768 e 390x844.

## Compatibilidade com legado

`app/globals.css` continua importando os estilos oficiais durante a migração. Classes legadas e IDs públicos não devem ser renomeados sem atualização simultânea de CSS, JS, anchors e QA. A remoção de duplicidades só ocorre após comparação visual e funcional.
