import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const staticAdminRoutes = Object.keys(manifest.routes).filter(
  (route) => route === '/admin' || route.startsWith('/admin/')
    || ['/', '/noticias', '/sitemap.xml', '/robots.txt'].includes(route),
);

if (staticAdminRoutes.length) {
  console.error('Admin and CMS content routes must render at request time:', staticAdminRoutes);
  process.exit(1);
}

console.log('Admin and CMS content routes render dynamically and are absent from the prerender cache.');
