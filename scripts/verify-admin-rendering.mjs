import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('.next/prerender-manifest.json', 'utf8'));
const staticAdminRoutes = Object.keys(manifest.routes).filter(
  (route) => route === '/admin' || route.startsWith('/admin/'),
);

if (staticAdminRoutes.length) {
  console.error('Admin routes must validate the session at request time:', staticAdminRoutes);
  process.exit(1);
}

console.log('Admin routes render dynamically and are absent from the prerender cache.');
