# Page dependency trees

## Public home
`app/page.tsx` → `components/home-sections.tsx`, `components/map-locator.tsx`, `components/route-theme.tsx`, public shell.

## News listing
`app/noticias/page.tsx` → `components/news-list.tsx` → `components/news-card.tsx`, `lib/content.ts`.

## Article
`app/noticias/[slug]/page.tsx` → `components/article-view.tsx` → `components/news-card.tsx`, `lib/content.ts`.

## CMS posts
`app/admin/posts/page.tsx` → `components/admin/posts-dashboard.tsx` → admin shell, UI primitives, `/api/admin/posts`.
`app/admin/posts/new/page.tsx` → `components/admin/post-editor.tsx` → Quill, UI primitives, `/api/admin/posts`, `/api/admin/assets`.

## CMS settings
`app/admin/settings/page.tsx` → `components/admin/settings-form.tsx` → UI primitives, `/api/admin/settings`.

