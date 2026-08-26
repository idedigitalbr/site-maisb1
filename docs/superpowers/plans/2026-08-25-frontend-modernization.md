# Frontend Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Next.js public site and CMS interface to visual, responsive, accessible, and maintainable parity with the official static legacy site while preserving all current URLs, APIs, database behavior, and business rules.

**Architecture:** Apply changes incrementally behind the existing App Router and legacy CSS compatibility layer. Establish semantic tokens and shared primitives first, then centralize location data and extract domain components, followed by scoped resilience/performance changes and route-by-route visual QA. Keep browser-only interactions client-side and content/metadata/data access server-side.

**Tech Stack:** Next.js 16.3.2 App Router, React 19.2.8, TypeScript 5.8.3 strict mode, Tailwind CSS v4, shadcn/Radix primitives, CVA, Lucide React, Prisma 6.16.2, MySQL, Leaflet, Quill.

**Spec:** `docs/superpowers/specs/2026-08-25-frontend-design-system-design.md`

## Global Constraints

- Preserve public route paths, hash anchors, article slugs, API contracts, Prisma/MySQL schema, CMS behavior, SEO meanings, analytics configuration, external map links, official legacy fonts, and Lucide icons.
- Keep the static legacy frontend and its assets/styles operational during the migration; do not delete legacy CSS, JS, or HTML.
- Do not reintroduce Sanity, add a second UI framework, or push to GitHub.
- Use `npm run typecheck` and `npm run build` after each implementation slice; do not claim lint/tests pass while those scripts do not exist.
- Do not stage or commit unrelated pre-existing worktree changes, secrets, `.env*` files, uploads, local databases, `.next`, or build output.

---

### Task 1: Establish the audit and semantic token baseline

**Files:**
- Create: `FRONTEND_AUDIT.md`
- Create: `DESIGN_SYSTEM.md`
- Modify: `app/globals.css`
- Modify: `app/admin/admin.css`
- Modify: `components/ui/button.tsx`
- Modify: `components/ui/badge.tsx`
- Modify: `components/ui/card.tsx`
- Modify: `components/ui/input.tsx`
- Modify: `components/ui/textarea.tsx`
- Modify: `components/ui/label.tsx`

**Interfaces:**
- The semantic contract is exposed as CSS variables such as `--color-page`, `--color-surface`, `--color-surface-inverse`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-primary`, `--color-primary-hover`, `--color-focus`, `--color-success`, `--color-warning`, `--color-danger`, `--radius-panel`, and `--shadow-panel`.
- Existing component props and CVA variant names remain unchanged. A consumer using `<Button variant="gold">`, `<Badge>`, `<Card>`, `<Input>`, `<Textarea>`, or `<Label>` must not need an API change.

- [ ] **Step 1: Record the current baseline in `FRONTEND_AUDIT.md`**

Document the current route matrix, architecture, data flow, styling layers, known accessibility/performance findings, exact baseline metrics from the approved specification, existing validation commands, and a severity-ranked backlog. Include the explicit note that the sanitized article HTML boundary is in `lib/content.ts` and that no lint/test scripts currently exist.

- [ ] **Step 2: Define the design token contract in `DESIGN_SYSTEM.md`**

Document typography roles (`DM Sans` for interface/body and `DM Serif Display` for editorial/display emphasis), official colors, semantic states, spacing/radius/elevation rules, icon sizing, focus behavior, responsive breakpoints, card/button/badge variants, and examples for public and admin surfaces. State which legacy aliases remain compatibility-only.

- [ ] **Step 3: Add the semantic variables without removing legacy imports**

Add a `:root` block in `app/globals.css` that maps the documented semantic variables to the official values already used by the legacy site. Add the equivalent Tailwind theme aliases in `app/admin/admin.css` only for repeated semantic values. Leave the current legacy stylesheet imports in place so existing selectors continue to render during migration.

- [ ] **Step 4: Refactor shared primitives to consume semantic values**

Replace repeated semantic color values in the CVA definitions and primitive class strings with the token variables, preserving variant names and DOM structure. Standardize `focus-visible` rings, disabled opacity/cursor, icon gap (`gap-2`), and status badge icon sizing (`size-3.5 shrink-0`).

- [ ] **Step 5: Run the baseline checks**

Run:

```powershell
npm run typecheck
npm run build
git diff --check
```

Expected: all commands exit with code 0; the audit documents any existing build warning without changing unrelated files.

### Task 2: Centralize locations and make map/footer interactions accessible

**Files:**
- Create: `lib/locations.ts`
- Create: `components/locations/unit-card.tsx`
- Create: `components/locations/unit-list.tsx`
- Modify: `components/map-locator.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/ui/input.tsx`

**Interfaces:**
- Export `type StoreUnit = { id: string; name: string; shortName: string; address: string; category: string; services: string[]; rating: string; image: string; mapsUrl: string; latitude: number; longitude: number; }` from `lib/locations.ts`.
- Export `const storeUnits: readonly StoreUnit[]` and `getStoreUnit(id: string): StoreUnit | undefined` from `lib/locations.ts`.
- `UnitCard` receives `{ unit: StoreUnit; active?: boolean; onSelect?: (unit: StoreUnit) => void }` and renders a semantic button for selection plus a real external link for Google Maps.
- `UnitList` receives `{ units: readonly StoreUnit[]; activeUnitId?: string; onSelect: (unit: StoreUnit) => void }` and renders an empty state when the filtered array is empty.

- [ ] **Step 1: Consolidate the three existing unit records**

Copy the current names, addresses, services, ratings, asset paths, coordinates, and Google Maps destinations from `components/map-locator.tsx`, `components/site-footer.tsx`, and `src/data/units.js` into `lib/locations.ts`. Keep exact existing `mapsUrl` values and use stable IDs matching the current unit identity; do not invent a new destination URL.

- [ ] **Step 2: Implement `UnitCard` with keyboard semantics**

Use a `<li>` containing a `<button type="button" aria-pressed={active}>` for selecting the unit and an `<a target="_blank" rel="noreferrer">` for the Maps action. Keep the current image, text, rating, and card classes. The card must be reachable with Tab and show a tokenized focus ring.

- [ ] **Step 3: Implement `UnitList` and preserve search behavior**

Render `UnitCard` for each filtered record. When no records match, render a visible message and a clear-search button with `type="button"`; do not leave an empty list with no feedback.

- [ ] **Step 4: Replace duplicated data in map and footer**

Import `storeUnits` into `components/map-locator.tsx` and `components/site-footer.tsx`, remove their local unit arrays, and wire selection to the same `StoreUnit` ID. The map must update its active marker/iframe query exactly as it does today, and the footer must retain its current lightbox/selection behavior.

- [ ] **Step 5: Verify the location surface**

Run:

```powershell
npm run typecheck
npm run build
```

Then verify `/`, `/sobre-nos`, `/noticias`, and `/noticias/<slug>`: search filters the same records, every Maps link opens the same destination, keyboard selection changes the active map location, and the empty state is visible for an unmatched query.

### Task 3: Add route resilience and scope public visual effects

**Files:**
- Create: `app/loading.tsx`
- Create: `app/error.tsx`
- Create: `app/not-found.tsx`
- Create: `app/admin/loading.tsx`
- Create: `app/admin/error.tsx`
- Modify: `components/route-theme.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/links-modal.tsx`
- Modify: `components/timeline.tsx`

**Interfaces:**
- `app/error.tsx` and `app/admin/error.tsx` are client components accepting `{ error: Error & { digest?: string }; reset: () => void }` and expose a labeled retry button.
- `RouteTheme` must attach cursor/reveal listeners only when `document.body` does not have `admin-page-body` and must skip decorative motion when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- Existing header, modal, timeline, and route-theme props remain unchanged.

- [ ] **Step 1: Add shared loading, not-found, and error UI**

Use the existing token palette and Lucide `LoaderCircle`, `CircleAlert`, and `ArrowLeft` icons. Loading UI must have `role="status"` and a text label; errors must offer a `Tentar novamente` button calling `reset`; not-found must offer a link to `/`.

- [ ] **Step 2: Scope and harden `RouteTheme` effects**

Guard browser listeners with the existing client boundary, skip admin routes, skip pointer/reveal animation in reduced-motion mode, and clean up every observer/listener in the effect return function. Keep section visibility content-safe by ensuring `is-visible` is applied on initial load when motion is reduced.

- [ ] **Step 3: Audit header and modal keyboard behavior**

Add `aria-expanded`/`aria-controls` to disclosure triggers, close mobile navigation and links modal on Escape, restore focus to the trigger after close, and preserve current hash navigation. Do not alter URL destinations or menu labels.

- [ ] **Step 4: Add accessible names and reduced-motion behavior to timeline controls**

Keep existing arrow buttons and active state, add `aria-current="true"` to the active timeline item, and remove decorative transition delay when reduced motion is enabled. Preserve the current timeline data and image selection.

- [ ] **Step 5: Validate failure and keyboard states**

Run typecheck/build and manually verify Tab/Shift+Tab, Enter/Space, Escape, focus-visible, reduced motion, loading, retry, and not-found behavior at `/`, `/noticias`, `/noticias/<slug>`, `/links`, `/admin/posts`, and `/admin/settings`.

### Task 4: Split the home composition while preserving legacy markup contracts

**Files:**
- Create: `components/home/home-hero.tsx`
- Create: `components/home/about-section.tsx`
- Create: `components/home/brands-section.tsx`
- Create: `components/home/news-section.tsx`
- Create: `components/home/opportunities-section.tsx`
- Create: `components/home/faq-section.tsx`
- Modify: `components/home-sections.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Each extracted section receives only the data and callbacks it uses; none may read or mutate global DOM state directly.
- `HomeSections` remains the compatibility composition export consumed by `app/page.tsx`, preserving section IDs `home`, `sobre`, `marcas`, `noticias`, `oportunidades`, and `faq-secao`.
- Interactive callbacks retain the current behavior for video controls, brand hash selection, FAQ expansion, and links modal opening.

- [ ] **Step 1: Capture the current section contract**

Before moving JSX, record the current IDs, data arrays, hash anchors, class names used by imported legacy CSS, and event callbacks from `components/home-sections.tsx`. Use that list as the acceptance checklist for the extracted files.

- [ ] **Step 2: Extract the hero and about sections**

Move only the hero/video and about/metrics JSX plus their local handlers into `HomeHero` and `AboutSection`. Keep the video element, Lucide controls, asset paths, typography classes, and metrics text unchanged.

- [ ] **Step 3: Extract brands, news, opportunities, and FAQ**

Move each domain block to its focused component. Keep the exact section IDs and existing data values. Use the existing `NewsCard`, `Timeline`, footer localizer, and UI primitives instead of duplicating their markup.

- [ ] **Step 4: Leave `HomeSections` as a thin composition layer**

Compose the six extracted components in the existing order, pass existing props/data, and keep any legacy wrapper needed for section selectors and visual effects. `app/page.tsx` should continue rendering the same top-level component interface.

- [ ] **Step 5: Verify visual parity at fixed viewports**

Run typecheck/build and compare legacy `http://localhost:8001/index.html` with Next `http://localhost:3000/` at 1440x900 and 390x844. Check hero/video controls, about metrics, brand orbit/carousel, news, opportunities, FAQ, localizer, footer, anchors, and scroll height.

### Task 5: Normalize news/article/admin surfaces and performance boundaries

**Files:**
- Modify: `components/news-card.tsx`
- Modify: `components/news-list.tsx`
- Modify: `components/article-view.tsx`
- Modify: `components/admin/posts-dashboard.tsx`
- Modify: `components/admin/post-editor.tsx`
- Modify: `components/admin/admin-shell.tsx`
- Modify: `app/noticias/page.tsx`
- Modify: `app/noticias/[slug]/page.tsx`
- Modify: `next.config.mjs`

**Interfaces:**
- News card/article/admin props remain backward-compatible; data shape changes must be introduced in `lib/content.ts` first and reflected in all call sites.
- Sanitized HTML continues to be produced by `lib/content.ts`; `ArticleView` must not bypass or duplicate sanitization.
- Browser-only Quill and Leaflet code may be dynamically loaded, but the editor and map must still render their current controls and fallback states.

- [ ] **Step 1: Normalize repeated metadata and card states**

Create a shared metadata presentation inside `components/news-card.tsx` or a focused sibling component, preserving the previously approved visibility rules for public cards. Add explicit loading/empty/error UI to `NewsList` and preserve the existing card variants used by home, listing, article-related, and admin surfaces.

- [ ] **Step 2: Make article rendering resilient**

Keep the sanitized `bodyHtml` render path, add a visible fallback when the body is empty, preserve canonical/OG metadata, and ensure related content has a clear empty state. Do not change article slug resolution or share URL generation.

- [ ] **Step 3: Optimize only known local images**

Convert local static banners with known dimensions to `next/image` using explicit `width`, `height`, `sizes`, and `className="object-cover"`. Leave externally hosted/Leaflet/Quill-generated images as regular elements until their dimensions and loading behavior are proven. Do not change crop or asset URL.

- [ ] **Step 4: Isolate editor/map browser dependencies**

Use a client wrapper with dynamic loading for Quill and keep Leaflet initialization behind the existing browser guard. Render a fixed-height fallback shell during load so the page does not collapse or shift unexpectedly.

- [ ] **Step 5: Verify public and admin data flows**

Run typecheck/build, then verify `/noticias`, `/noticias/<slug>`, `/admin/posts`, `/admin/posts/new`, and `/admin/posts/<id>` with populated data, empty search results, image fallback, draft/public status, SEO fields, and editor load. Confirm the fixed sidebar/hover rail behavior remains unchanged.

### Task 6: Complete visual QA and close documentation

**Files:**
- Modify: `FRONTEND_AUDIT.md`
- Modify: `DESIGN_SYSTEM.md`
- Create: `docs/qa/frontend-parity-checklist.md`

**Interfaces:**
- The QA checklist is a route-by-route acceptance artifact, not runtime code. It records viewport, expected legacy reference, Next result, status, and follow-up without secrets or personal data.

- [ ] **Step 1: Create the route and viewport matrix**

Cover `/`, `/sobre-nos`, `/noticias`, `/noticias/<slug>`, `/links`, `/admin/login`, `/admin/posts`, `/admin/posts/new`, `/admin/posts/<id>`, and `/admin/settings` at 1440x900, 1024x768, and 390x844.

- [ ] **Step 2: Run interaction checks**

Check header/mobile menu, video pause/mute/fullscreen, brand arrows/hash/swipe, news filters/search, FAQ, map search/selection/external links, share buttons/copy link, lightbox, admin sidebar hover rail, table actions, editor, settings, loading, error, empty, Escape, focus, and reduced motion.

- [ ] **Step 3: Run technical checks**

Run:

```powershell
npm run typecheck
npm run build
git diff --check
```

Record command results and any limitation such as the absence of a lint/test script. Check that `git status --short` contains no generated artifacts or environment files.

- [ ] **Step 4: Update the audit with evidence**

Replace the initial backlog status with completed, partial, or deferred results. Every deferred item must identify the exact reason and affected route; do not leave unqualified “later” notes.

- [ ] **Step 5: Update the design system with adopted rules**

Document the final token names, component variants, typography roles, responsive rules, icon rules, motion policy, and compatibility exceptions that remain because of the legacy CSS transition.

- [ ] **Step 6: Stop before any remote operation**

Review the final diff, verify no push was performed, and report local validation results plus the remaining known limitations.
