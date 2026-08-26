'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-6 text-[#120E0E]"><div className="max-w-md text-center"><AlertCircle className="mx-auto mb-4 text-[#9F342D]" size={32} aria-hidden="true" /><h1 className="mb-3 text-2xl font-bold">Erro no painel</h1><p className="mb-6 text-[#8E8780]">Não foi possível concluir esta operação. Tente novamente.</p><Button type="button" variant="gold" onClick={() => reset()}><RefreshCw size={16} aria-hidden="true" />Tentar novamente</Button></div></div>;
}

