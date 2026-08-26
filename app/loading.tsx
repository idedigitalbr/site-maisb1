import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return <main className="site-route-loading min-h-[40vh] bg-[var(--color-page)] px-6 py-20 text-[var(--color-text)]"><div className="mx-auto flex max-w-7xl items-center justify-center gap-3" role="status"><LoaderCircle className="animate-spin text-[var(--color-primary)]" size={20} aria-hidden="true" /><span>Carregando conteúdo…</span></div></main>;
}
