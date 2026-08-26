# Frontend and Design System Modernization

## Context

The project currently contains two related frontends: the official static legacy site at the repository root and under `src/`, and a Next.js App Router implementation under `app/`, `components/`, and `lib/`. The Next.js application already covers the main public routes, article routes, the administrative area, Prisma/MySQL-backed content, metadata, sitemap, robots, the map locator, the brands interaction, and the video hero. The legacy frontend remains the visual reference and must continue to work during the transition.

The current implementation is functional, but the audit found several sources of visual and maintenance drift:

- design tokens are split between `src/css/tokens.css`, `src/css/components.css`, `app/globals.css`, and `app/admin/admin.css`, with duplicate aliases and repeated hardcoded values;
- shared UI primitives exist but still encode most colors and states directly in utility classes;
- unit/store data is duplicated between `components/map-locator.tsx`, `components/site-footer.tsx`, and `src/data/units.js`;
- `components/home-sections.tsx` concentrates multiple domains and interaction patterns in one file;
- map cards and footer unit controls use click-only `div` elements, and global visual effects are attached by `components/route-theme.tsx`;
- the codebase has 34 raw `<img>` usages, one sanitized HTML injection boundary, five `any` occurrences, 166 arbitrary Tailwind utility occurrences, and no route-level loading, error, or not-found UI;
- package scripts currently expose build, typecheck, and database commands, but no lint or automated test command.

The visual target is not a redesign. It is parity with the legacy site: the same typography hierarchy, official colors, section proportions, rounded containers, gold accents, image treatment, orbit/brand interaction, map presentation, video controls, cards, footer, and page URLs.

## Goals

1. Produce an evidence-based `FRONTEND_AUDIT.md` and a maintainable `DESIGN_SYSTEM.md` grounded in the existing legacy and Next.js code.
2. Preserve the current public URLs, CMS behavior, Prisma/MySQL integration, analytics/SEO configuration, article rendering, map links, and existing business rules.
3. Bring the Next.js public pages and admin interface into visual and typographic parity with the legacy site without removing legacy assets or styles before parity is verified.
4. Establish one semantic token layer and reuse it through shared primitives and new/refactored components.
5. Improve keyboard, focus, escape, reduced-motion, loading, empty, error, and responsive behavior without changing the product language.
6. Centralize shared unit data and split domain-heavy components into focused, testable boundaries.
7. Improve image and client-boundary performance where behavior and asset routing remain unchanged.

## Non-goals and constraints

- Do not reintroduce Sanity or replace the current Next.js/Prisma/MySQL CMS.
- Do not change database schema, API contracts, content slugs, route paths, external map links, analytics IDs, or SEO meanings.
- Do not delete the static legacy implementation, its CSS, or its assets as part of this work.
- Do not replace official brand artwork or existing Lucide icons with newly generated artwork.
- Do not force every arbitrary Tailwind value into a token when it is a one-off geometry value; normalize repeated semantic colors, typography, spacing, radii, borders, and elevations first.
- Do not add a new UI framework or a second styling system. Continue using Tailwind v4, shadcn/Radix primitives, CVA, and `lucide-react`.
- Do not push to GitHub. Implementation commits, if needed later, must remain local and must not include secrets, build output, local databases, or unrelated existing user changes.

## Baseline and success criteria

The audit baseline is: Next.js 16.3.2, React 19.2.8, TypeScript 5.8.3, Tailwind v4, Prisma 6.16.2, and `lucide-react`. The scoped repository currently contains approximately 83 files and 22,747 lines across `app`, `components`, `lib`, and `src`; the legacy CSS and JS account for approximately 15,557 and 5,373 lines respectively.

Success means:

- `/`, `/sobre-nos`, `/noticias`, `/noticias/[slug]`, `/links`, `/mapinha`, `/admin/login`, `/admin/posts`, `/admin/posts/new`, `/admin/posts/[id]`, and `/admin/settings` retain their current behavior and load without console-breaking errors;
- public Next.js screenshots at desktop and mobile widths visibly match the legacy reference for section order, typography, colors, spacing, controls, cards, map, video, brand orbit, and footer;
- the static legacy pages remain unchanged in behavior after each migration slice;
- shared units have one typed source consumed by the map and footer;
- interactive controls are keyboard reachable, have accessible names and visible focus, and dialogs/menus close with Escape where applicable;
- `npm run typecheck` and `npm run build` pass, and a documented browser smoke checklist passes. If lint/tests are introduced, they must have deterministic scripts and pass without weakening compiler strictness.

## Target architecture

### 1. Compatibility-first style layers

Keep the imported legacy styles in `app/globals.css` while parity work is in progress. Add a small semantic token layer for the Next.js surface, using the official legacy values as the source of truth. The first semantic names should cover page background, elevated surface, inverse surface, text, muted text, border, gold primary, gold hover, success, warning, danger, focus ring, and the standard radius/shadow families. Map the aliases once instead of creating new color names.

Admin styles may keep their separate layout scope, but shared controls must consume the same semantic values where the visual language overlaps. Existing legacy class names must not be renamed solely for cleanup.

### 2. Component boundaries

Organize components by responsibility:

- `components/ui`: primitive controls and states (`Button`, `Badge`, `Input`, `Textarea`, `Card`, `Dialog`/menu primitives when needed);
- `components/layout`: public header, footer, route chrome, and shared container/section shells;
- `components/content`: news cards, article sections, metadata, related content, and sanitized body rendering;
- `components/locations`: typed unit data consumer, search/filter list, map shell, and unit card;
- `components/brands`: orbit visualization, brand carousel, and brand detail panel;
- `components/home`: hero/video, about, metrics, news teaser, opportunities, FAQ, and section composition;
- `components/admin`: shell, navigation, dashboard table, editor, settings, and admin-specific feedback states.

The exact folder move should be incremental. A component should move only when the new boundary has a clear interface and the old import graph can be updated atomically.

### 3. Shared data and server/client boundaries

Create one typed unit model and one source of unit records for the footer and map. Keep the map implementation client-side because Leaflet requires browser APIs, but pass serializable unit data from the server where possible. Keep interactive video controls, orbit/carousel controls, menus, modals, and editor behavior client-side. Keep metadata, content queries, article data, and static page composition server-side. Avoid making an entire page client-only to support one control.

### 4. Visual effects

Preserve the legacy gold spotlight, grid, glow, rounded section, orbit, and reveal effects, but scope listeners to the public page regions that need them. Respect `prefers-reduced-motion`, avoid applying public cursor effects to admin routes, and ensure the visual effect is decorative rather than required for content visibility or interaction.

### 5. Content and SEO

Retain the current sanitized HTML boundary in `lib/content.ts` and document it in the audit. Article pages continue to use generated metadata, canonical URLs, Open Graph data, sitemap, and robots configuration. The CMS editor remains Quill-based; SEO fields should remain explicit and validated at the form boundary rather than inferred from rendered HTML.

## Implementation phases

### Phase P0 — accessibility and resilience

1. Add route-level `loading.tsx`, `error.tsx`, and not-found handling for public content and admin content where the App Router boundary supports it.
2. Convert map unit cards and footer unit selection controls from click-only containers to semantic buttons/links with accessible names, visible focus, and preserved map behavior.
3. Review header menus, mobile navigation, modal/lightbox, share actions, video controls, FAQ, carousel arrows, and orbit selection for keyboard operation, Escape behavior, `aria-expanded`, `aria-current`, and disabled states.
4. Scope `RouteTheme` effects to public routes and add reduced-motion handling without removing the legacy visual treatment for users who allow motion.
5. Add explicit empty/error/loading feedback to data-driven news, map, article, and admin table/editor states.

### Phase P1 — tokens and primitives

1. Define the semantic token contract and map it to the existing official colors, fonts, spacing, radii, borders, and shadows.
2. Refactor `Button`, `Badge`, `Card`, `Input`, `Textarea`, and `Label` variants to use tokens while preserving their current public props and visual variants.
3. Normalize focus rings, disabled states, icon sizing, icon/text gaps, and badge status spacing across the public and admin surfaces.
4. Record typography roles for display serif, display sans, body, labels, metadata, and navigation; use the same loaded fonts and weights as the legacy site.

### Phase P2 — domain refactor and parity

1. Centralize units and their Google Maps links in a typed module consumed by map and footer.
2. Split `home-sections.tsx` into focused home section components without changing section IDs, order, content, anchors, or behavior.
3. Extract repeated news-card and article metadata presentation while preserving the current card variants and the previously approved removals of badges, excerpts, read-time labels, and action links where those removals already exist.
4. Align brands orbit/carousel geometry, navigation placement, image cropping, state transitions, and detail panel styling with the legacy implementation.
5. Align video hero controls and about metrics typography/layout with the legacy implementation, keeping Lucide icons and current content.

### Phase P3 — performance, documentation, and visual QA

1. Replace raw image elements with `next/image` only where local/static assets and sizing are known; preserve the exact crop and fallback behavior.
2. Isolate browser-only Leaflet and Quill code behind dynamic/client boundaries where this reduces initial work without changing interaction.
3. Remove redundant global listeners and duplicate CSS rules where the scoped replacement has passed visual QA.
4. Complete the audit and design-system documents with before/after evidence, known exceptions, and a route-by-route verification matrix.
5. Run typecheck, build, browser smoke checks, responsive checks, and accessibility checks; document any tooling limitation rather than hiding it.

## Validation strategy

For each phase, validate the smallest affected surface first, then run the full project checks:

```powershell
npm run typecheck
npm run build
```

Use the local Next server to check the public and admin route matrix at desktop and mobile viewport widths. Compare the Next page to the legacy page section-by-section, including top navigation, hero/video, about metrics, brands orbit/carousel, news, opportunities, FAQ, map, footer, article body/share/recommended content, filters, table rows, editor, and settings. Verify keyboard navigation and reduced-motion mode for every newly touched interactive element.

The current package does not expose lint or test scripts. Adding them is allowed only when the chosen tooling is compatible with the existing Next 16/TypeScript setup and the scripts are run as part of validation. No test command may be reported as passing if it does not exist.

## Risks and rollback

- Legacy CSS imports can cause cascade regressions. Keep compatibility imports until a visual comparison proves a replacement is equivalent; remove only isolated duplicate rules.
- Moving components can break implicit IDs and CSS selectors. Preserve IDs/classes used by anchors, effects, and browser QA, and update all imports in one change.
- Centralizing unit data can alter map links or image paths. Snapshot the current records and verify every card, footer action, and external URL before deleting duplicates.
- Client/server boundary changes can affect hydration and Leaflet/Quill availability. Validate the affected route in a real browser and keep the original boundary until the replacement is proven.
- Image optimization can change crop, dimensions, or loading order. Apply it per asset group with explicit dimensions and compare against the legacy screenshot.

Every phase is independently revertible because it must preserve URLs, content contracts, and database schema. No database migration is part of this design.

## Review gate

This specification captures the approved high-level direction. Implementation must begin only after this file is reviewed and accepted. After acceptance, create a bite-sized execution plan that maps each phase to exact files, interfaces, tests, and verification commands.
