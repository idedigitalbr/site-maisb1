'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-[50vh] items-center justify-center bg-[var(--color-page)] px-6 py-20 text-[var(--color-text)]"><div className="max-w-md text-center"><AlertCircle className="mx-auto mb-4 text-[var(--color-danger)]" size={32} aria-hidden="true" /><h1 className="mb-3 text-2xl font-bold">Não foi possível carregar esta página</h1><p className="mb-6 text-[var(--color-text-muted)]">O conteúdo não ficou disponível agora. Tente novamente.</p><Button type="button" variant="gold" onClick={() => reset()}><RefreshCw size={16} aria-hidden="true" />Tentar novamente</Button></div></main>;
}

