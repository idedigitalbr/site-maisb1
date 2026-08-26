import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <main className="flex min-h-[50vh] items-center justify-center bg-[var(--color-page)] px-6 py-20 text-[var(--color-text)]"><div className="max-w-md text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">404</p><h1 className="mb-3 text-3xl font-bold">Página não encontrada</h1><p className="mb-6 text-[var(--color-text-muted)]">O endereço acessado não existe ou foi movido.</p><Link className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-surface-inverse)] px-4 py-3 text-sm font-semibold text-[var(--color-text-inverse)]" href="/"><ArrowLeft size={16} aria-hidden="true" />Voltar para o início</Link></div></main>;
}

