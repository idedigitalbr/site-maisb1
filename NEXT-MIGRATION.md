# Migração incremental para Next.js

## Etapa 1 — scaffold executável

O aplicativo Next.js foi adicionado na raiz do repositório sem remover as páginas HTML existentes. O site legado continua sendo servido pelo fluxo atual na porta 8001; a nova aplicação usa a porta 3000 durante o desenvolvimento.

Incluído nesta etapa:

- App Router com TypeScript e runtime Node (`output: standalone`);
- shell global com menu, rodapé e tokens visuais do Grupo +B;
- rotas `/`, `/sobre-nos`, `/noticias`, `/noticias/[slug]` e `/links`;
- camada `lib/content.ts` com leitura do banco MySQL e fallback local;
- metadata, `sitemap.xml`, `robots.txt` e `generateMetadata` por notícia;
- Google Analytics opcional via `NEXT_PUBLIC_GA_MEASUREMENT_ID`;
- endpoint `POST /api/revalidate` protegido por `REVALIDATE_SECRET`;
- rota temporária `/assets/*` para reaproveitar os arquivos existentes sem duplicar os cerca de 163 MB de assets.

## Etapa 2 — mini CMS editorial

O Next.js agora possui uma área administrativa protegida em `/admin` para gerenciar as matérias que aparecem nos cards e nas páginas públicas de notícias.

- `/admin/login`, `/admin/posts`, `/admin/posts/new`, `/admin/posts/[id]` e `/admin/settings`;
- layout editorial com Tailwind, primitives no padrão shadcn/ui e ícones Lucide;
- editor Quill com títulos, listas, links, imagens, citações e sanitização no servidor;
- upload de banner para `public/uploads`, com texto alternativo e legenda;
- status rascunho/publicada, data de publicação, slug, categoria, autor e resumo;
- checklist SEO, título/descrição SEO, `noIndex`, canonical, Open Graph e Google Analytics 4;
- tabelas `posts` e `site_settings`, filtro público de rascunhos e revalidação após alterações.

Para habilitar a persistência, inicie o MySQL do Laragon, crie o banco `grupomaisb_cms`, configure `DATABASE_URL`, `CMS_ADMIN_PASSWORD` e `CMS_SESSION_SECRET` no `.env.local` e rode `npm run db:setup`.

## Variáveis iniciais

Copie `.env.example` para `.env.local` e preencha os valores locais. O fallback local permite executar e validar o app mesmo antes do banco estar configurado.

## Próximas etapas

1. Configurar MySQL no ambiente de desenvolvimento e produção, com volume persistente.
2. Aplicar `npm run db:setup` no primeiro ambiente e usar `prisma db push`/migrações nos demais.
3. Homologar upload de mídia, publicação agendada e pré-visualização com o conteúdo real.
4. Refinar diferenças de pixel após homologação responsiva em desktop e mobile.
5. Criar Dockerfile Node/standalone, incluir MySQL no Compose e adaptar o workflow da VPS.
