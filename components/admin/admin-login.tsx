'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('');
    const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setError(data.error || 'Não foi possível entrar.'); return; }
    router.push('/admin/posts'); router.refresh();
  };
  return <main className="min-h-screen bg-[#120e0e] px-5 py-10 text-white"><div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_420px]">
    <div className="hidden lg:block"><span className="mb-5 block text-xs font-bold uppercase tracking-[0.22em] text-[#c49a45]">Área restrita</span><h1 className="max-w-xl font-serif text-6xl leading-[0.98]">Conteúdo que mantém a marca em movimento.</h1><p className="mt-6 max-w-lg text-lg leading-8 text-white/60">O painel editorial do Grupo +B centraliza publicação, SEO, imagens e distribuição das matérias.</p></div>
    <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#191616] p-8 shadow-2xl sm:p-10"><div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c49a45] text-[#120e0e]"><LockKeyhole size={22} /></div><div><p className="font-bold">Painel editorial</p><p className="text-xs text-white/50">Grupo Mais Barato</p></div></div><h2 className="text-2xl font-bold">Entrar no CMS</h2><p className="mt-2 text-sm text-white/55">Use a senha administrativa configurada no ambiente.</p><label className="mt-8 block text-sm font-semibold">Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-[#120e0e] px-4 text-white outline-none focus:border-[#c49a45]" placeholder="••••••••••••" autoFocus /></label>{error ? <p className="mt-3 rounded-xl bg-[#9f342d]/20 px-3 py-2 text-sm text-[#f29a92]">{error}</p> : null}<Button type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={loading}>{loading ? 'Validando...' : <>Acessar painel <ArrowRight size={17} /></>}</Button><p className="mt-6 text-center text-xs text-white/35">Acesso protegido por sessão HttpOnly.</p></form>
  </div></main>;
}

