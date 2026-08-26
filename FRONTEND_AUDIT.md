# Auditoria Frontend — Grupo +B

**Data da revisão:** 25 de agosto de 2026  
**Escopo:** Next.js/React, CMS administrativo, frontend estático legado, integração de conteúdo e recursos visuais.

## Resumo executivo

O Next.js já possui as rotas públicas principais, página de artigo, localizador, carrossel de marcas, hero em vídeo, CMS próprio com Prisma/MySQL, SEO, sitemap, robots e integração de analytics. O frontend estático legado continua sendo a referência oficial de identidade visual e comportamento.

O principal risco atual é a divergência incremental entre as duas implementações: tokens e regras de estilo estão distribuídos entre CSS legado, CSS global do Next e CSS administrativo; unidades são duplicadas em mais de um componente; efeitos globais alcançam áreas administrativas; e algumas interações visuais ainda dependem de elementos não semânticos. A estratégia recomendada é de paridade incremental, preservando URLs, APIs, conteúdo, banco e assets.

## Inventário técnico

| Área | Estado atual |
| --- | --- |
| Framework | Next.js 16.3.2, App Router |
| UI | React 19.2.8, TypeScript strict, Tailwind v4, shadcn/Radix, CVA |
| Ícones | `lucide-react`; logos e artwork oficiais permanecem SVG/asset de marca |
| Fontes | DM Sans para interface/corpo; DM Serif Display para títulos editoriais |
| Conteúdo | Prisma 6.16.2 + MySQL local/Laragon, com fallback local |
| Editor | Quill via `react-quill-new` |
| Mapa | Leaflet no mapa dedicado e Google Maps embed no localizador de páginas públicas |
| SEO | Metadata por rota/artigo, canonical, Open Graph, sitemap e robots |
| Analytics | Google Analytics 4 opcional via configuração do site |
| Legado | HTML, CSS e JS oficiais continuam no repositório e servem como referência |

## Rotas auditadas

| Rota | Responsabilidade | Observação |
| --- | --- | --- |
| `/` | Home institucional | Hero, sobre, marcas, notícias, oportunidades, FAQ, unidades e footer |
| `/sobre-nos` | Institucional | Hero/vídeos, trajetória, métricas, missão/visão e unidades |
| `/noticias` | Listagem editorial | Busca, filtros, cards e unidades |
| `/noticias/[slug]` | Artigo | Conteúdo sanitizado, compartilhamento, relacionados e unidades |
| `/links` | Links de marcas | Modal/página auxiliar preservando destinos existentes |
| `/admin/login` | Sessão editorial | Cookie HttpOnly assinado |
| `/admin/posts` | Gestão de publicações | Listagem, status, edição e exclusão |
| `/admin/posts/new` | Criação | Editor, banner, categoria, publicação e SEO |
| `/admin/posts/[id]` | Edição | Persistência via APIs próprias |
| `/admin/settings` | Configurações | SEO padrão, analytics e canonical |

## Pontos positivos

- App Router e separação inicial entre leitura de conteúdo no servidor e interações no cliente.
- Fallback local mantém páginas públicas disponíveis quando o banco não está configurado.
- HTML de artigo passa por `sanitize-html` em `lib/content.ts` antes de chegar ao componente de renderização.
- Metadados, sitemap, robots e canonical já estão integrados ao conteúdo/configuração.
- Controles novos usam Lucide e as fontes institucionais do legado.
- O banco próprio substituiu Sanity sem alterar os slugs públicos.

## Achados e prioridade

### P0 — acessibilidade e resiliência

- Cards de unidades usam `div` com `onClick` em alguns fluxos; devem ser controles semânticos com teclado e foco visível.
- Efeitos globais de `RouteTheme` precisam ser limitados às páginas públicas e respeitar `prefers-reduced-motion`.
- Faltam estados de loading, erro e not-found no App Router.
- Menus, modal/lightbox, FAQ, vídeo, carrossel e compartilhamento precisam de revisão de Escape, foco, nomes acessíveis, `aria-expanded` e `aria-current`.

### P1 — consistência do Design System

- Tokens oficiais estão divididos entre `src/css/tokens.css`, `src/css/components.css`, `app/globals.css` e `app/admin/admin.css`.
- Primitives shadcn existem, mas repetem cores, foco, bordas e sombras diretamente em classes arbitrárias.
- O espaçamento entre ícone e texto dos badges/status precisa de uma regra compartilhada.
- As fontes oficiais devem permanecer explícitas nos papéis de display, corpo, metadados e navegação.

### P1 — dados e componentização

- Unidades aparecem em `components/map-locator.tsx`, `components/site-footer.tsx` e `src/data/units.js`.
- `components/home-sections.tsx` concentra vários domínios e handlers.
- Cards e metadados de notícias possuem variações repetidas entre home, listagem, artigo e admin.

### P2 — performance

- Há 34 ocorrências de `<img>` na área auditada; assets locais conhecidos podem migrar para `next/image` com dimensões explícitas.
- Leaflet e Quill devem permanecer em limites client/browser e podem usar carregamento dinâmico com fallback estável.
- Há listeners globais de ponteiro/scroll que devem ser reduzidos ou escopados após a paridade visual.

## Métricas da base

- Aproximadamente 83 arquivos e 22.747 linhas em `app`, `components`, `lib` e `src`.
- CSS legado: aproximadamente 15.557 linhas.
- JavaScript legado: aproximadamente 5.373 linhas.
- 14 diretivas `'use client'`.
- 166 ocorrências de utilitários Tailwind arbitrários.
- 5 ocorrências de `any` identificadas na base escopo.
- Não há scripts de lint ou testes automatizados no `package.json`; os checks existentes são typecheck, build e comandos de banco.

## Plano de validação

```powershell
npm run typecheck
npm run build
git diff --check
```

Além dos checks técnicos, comparar legado `http://localhost:8001` e Next `http://localhost:3000` nas rotas públicas em 1440x900, 1024x768 e 390x844. Validar navegação por teclado, foco, Escape, reduced motion, filtros, mapa incorporado, vídeo, marcas, lightbox, compartilhamento e fluxos do CMS.

## Limitações conhecidas

O CSS legado permanece importado durante a transição para evitar regressões de identidade visual. Por isso, algumas regras continuarão duplicadas até que uma comparação visual e funcional autorize a remoção. Não há lint/test runner configurado neste ciclo; isso deve ser tratado como uma melhoria de tooling separada, sem mascarar a ausência dos comandos.
