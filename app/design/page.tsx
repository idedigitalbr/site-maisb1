'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, ChevronUp, Copy, 
  Eye, HeartPulse, Info, Layers, MapPin, Moon, Palette, PartyPopper, 
  Search, ShieldCheck, ShoppingCart, Sliders, Smartphone, Sparkles, 
  Sun, Target, Type, Utensils, Wine, Zap, Code, FileJson, Cpu,
  CheckCircle2, AlertTriangle, XCircle, Clock, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

// Componente de Tooltip Interativo para Comportamento Mobile
function MobileInfoTooltip({ desktopPx, mobilePx, description }: { desktopPx: string; mobilePx: string; description: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '5px', 
          backgroundColor: 'rgba(200, 146, 35, 0.12)', 
          border: '1px solid rgba(200, 146, 35, 0.4)', 
          color: '#C89223', 
          padding: '3px 8px', 
          borderRadius: '6px', 
          fontSize: '0.74rem', 
          fontWeight: 700, 
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <Smartphone size={13} />
        <span>Mobile: {mobilePx}</span>
        <Info size={11} style={{ opacity: 0.8 }} />
      </button>

      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          bottom: '100%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          marginBottom: '8px', 
          backgroundColor: '#0E0B0B', 
          color: '#FDFAF6', 
          border: '1px solid #C89223', 
          borderRadius: '10px', 
          padding: '12px 14px', 
          fontSize: '0.78rem', 
          width: '260px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)', 
          zIndex: 100, 
          lineHeight: 1.45,
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#C89223', fontWeight: 800 }}>
            <Smartphone size={14} />
            <span>Comportamento no Smartphone</span>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: '0.76rem', color: '#DED8D0' }}>
            No Desktop: <strong>{desktopPx}</strong>.<br />
            No Smartphone reduz para <strong>{mobilePx}</strong> {description}
          </p>
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #C89223' }} />
        </div>
      )}
    </div>
  );
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  
  // Estados para o Testador Tipográfico Completo
  const [sandboxMode, setSandboxMode] = useState<'preview' | 'edit'>('preview');
  const [testEyebrow, setTestEyebrow] = useState('SOBRE O GRUPO INSTITUCIONAL');
  const [testHeadlinePrefix, setTestHeadlinePrefix] = useState('O ');
  const [testHeadlineItalic, setTestHeadlineItalic] = useState('Grupo Mais Barato');
  const [testHeadlineSuffix, setTestHeadlineSuffix] = useState(' reúne negócios que transformam o dia a dia em Belém — PA');
  const [testLeadText, setTestLeadText] = useState('Nossa atuação integra grandes marcas com excelência, compromisso humano e investimento no futuro do Pará.');
  const [testPreviewTheme, setTestPreviewTheme] = useState<'light' | 'dark'>('light');

  // Estados para o Exportador Universal de Tokens
  const [exportTab, setExportTab] = useState<'css' | 'json' | 'tailwind' | 'ai-prompt'>('css');

  // Estados para Componentes Interativos
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [interactiveSearch, setInteractiveSearch] = useState('');
  const [motionHovered, setMotionHovered] = useState(false);

  const copyToken = (text: string, tokenName: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedToken(tokenName);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const colors = [
    { name: 'Ouro Principal (Gold)', var: '--color-yellow / --color-primary', hex: '#C89223', rgb: '200, 146, 35', text: '#120E0E', usage: 'Ações primárias, acentos dourados, itálicos de destaque e badges' },
    { name: 'Preto Institucional (Ink)', var: '--color-black / --ink', hex: '#120E0E', rgb: '18, 14, 14', text: '#FDFAF6', usage: 'Fundo escuro principal, cabeçalho, rodapé e títulos nobres' },
    { name: 'Branco Papel (Paper)', var: '--color-white / --paper', hex: '#FDFAF6', rgb: '253, 250, 246', text: '#120E0E', usage: 'Fundo de página padrão, texto sobre fundo escuro' },
    { name: 'Carvão / Grafite (Charcoal)', var: '--color-charcoal / --graphite', hex: '#191616', rgb: '25, 22, 22', text: '#FDFAF6', usage: 'Cards escuros, superfícies elevadas no tema noturno' },
    { name: 'Off-White Suave', var: '--color-off-white', hex: '#F8F5F0', rgb: '248, 245, 240', text: '#120E0E', usage: 'Campos de formulário, fundos de cards claros' },
    { name: 'Bege Nobre (Beige)', var: '--color-beige', hex: '#F3EFE8', rgb: '243, 239, 232', text: '#120E0E', usage: 'Hover de botões claros, divisórias suaves' },
    { name: 'Cinza Borda (Gray Light)', var: '--color-gray-light', hex: '#DED8D0', rgb: '222, 216, 208', text: '#120E0E', usage: 'Bordas de cards e separadores sobre fundo claro' },
    { name: 'Cinza Médio (Muted)', var: '--color-gray-medium / --muted', hex: '#8E8780', rgb: '142, 135, 128', text: '#FDFAF6', usage: 'Descrições secundárias, metadados e legendas' },
    { name: 'Cinza Escuro (Text Body)', var: '--color-gray-dark', hex: '#4D4845', rgb: '77, 72, 69', text: '#FDFAF6', usage: 'Texto padrão de parágrafos e leituras longas' },
    { name: 'Verde Sucesso (Success)', var: '--color-success', hex: '#237A4A', rgb: '35, 122, 74', text: '#FDFAF6', usage: 'Status "Publicada", validações e confirmações' },
    { name: 'Amarelo Alerta (Warning)', var: '--color-warning', hex: '#A87516', rgb: '168, 117, 22', text: '#FDFAF6', usage: 'Status "Rascunho", avisos de edição' },
    { name: 'Vermelho Perigo (Danger)', var: '--color-danger', hex: '#9F342D', rgb: '159, 52, 45', text: '#FDFAF6', usage: 'Botões de exclusão e mensagens de erro' },
  ];

  const accessibilityMatrix = [
    { pair: 'Ouro (#C89223) em Fundo Preto (#120E0E)', ratio: '6.8 : 1', level: 'WCAG AAA (Textos Grandes & Badges)', status: 'Aprovado' },
    { pair: 'Branco Papel (#FDFAF6) em Fundo Preto (#120E0E)', ratio: '19.3 : 1', level: 'WCAG AAA (Leitura Máxima)', status: 'Aprovado' },
    { pair: 'Preto Institucional (#120E0E) em Fundo Branco (#FDFAF6)', ratio: '19.3 : 1', level: 'WCAG AAA (Leitura Máxima)', status: 'Aprovado' },
    { pair: 'Cinza Escuro (#4D4845) em Fundo Papel (#FDFAF6)', ratio: '8.4 : 1', level: 'WCAG AAA (Texto Regular)', status: 'Aprovado' },
    { pair: 'Verde Sucesso (#237A4A) em Fundo Papel (#FDFAF6)', ratio: '5.2 : 1', level: 'WCAG AA (Texto & Badges)', status: 'Aprovado' },
    { pair: 'Cinza Médio (#8E8780) em Fundo Preto (#120E0E)', ratio: '4.8 : 1', level: 'WCAG AA (Metadados e Legendas)', status: 'Aprovado' },
  ];

  const radii = [
    { name: 'Radius Small', var: '--radius-small', value: '6px', desc: 'Tags pequenas e micro botões' },
    { name: 'Radius Control', var: '--radius-control', value: '12px', desc: 'Inputs, selects e botões de formulário' },
    { name: 'Radius Panel', var: '--radius-panel', value: '16px', desc: 'Cards, diálogos e painéis' },
    { name: 'Radius Section', var: '--radius-section', value: '28px', desc: 'Bordas curvas de grandes seções do site' },
  ];

  return (
    <div className="design-system-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: previewTheme === 'light' ? '#FDFAF6' : '#0B0909', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', fontFamily: 'var(--font-primary, "DM Sans", sans-serif)', transition: 'background-color 0.3s, color 0.3s' }}>
      
      {/* 🧭 SIDEBAR DE NAVEGAÇÃO FIXA ESTILO DESIGN.MD */}
      <aside style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0, 
        width: '280px', 
        height: '100vh', 
        backgroundColor: '#0E0B0B', 
        borderRight: '1px solid rgba(253, 250, 246, 0.08)', 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        zIndex: 100 
      }}>
        
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(253, 250, 246, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#C89223', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#120E0E', fontWeight: 900, fontSize: '1rem' }}>
              +B
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em', color: '#FDFAF6' }}>Grupo Mais Barato</div>
              <div style={{ fontSize: '0.72rem', color: '#C89223', fontWeight: 700, letterSpacing: '0.05em' }}>DESIGN SYSTEM OFICIAL</div>
            </div>
          </div>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(200, 146, 35, 0.12)', border: '1px solid #C89223', color: '#C89223', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
            v2.0.0 — Design.MD Gold Spec
          </span>
        </div>

        {/* Links do Menu */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', color: '#8E8780', textTransform: 'uppercase', padding: '0 8px 8px' }}>
            Índice de Especificação
          </div>
          {[
            { id: 'overview', label: '1. Overview & Identidade', icon: Sparkles },
            { id: 'colors', label: '2. Cores & Tokens de Marca', icon: Palette },
            { id: 'sub-brands', label: '3. Paletas de Submarcas', icon: Layers },
            { id: 'typography', label: '4. Tipografia & Títulos (PX)', icon: Type },
            { id: 'accessibility', label: '5. Acessibilidade & WCAG AAA', icon: ShieldCheck },
            { id: 'layout', label: '6. Grid, Layout & Espaçamento', icon: Layers },
            { id: 'elevation', label: '7. Elevação, Sombras & Motion', icon: Zap },
            { id: 'components', label: '8. Biblioteca de Componentes', icon: Sliders },
            { id: 'responsive', label: '9. Responsividade & Breakpoints', icon: Smartphone },
            { id: 'export-tokens', label: '10. Hub de Exportação (Dev/IA)', icon: Cpu },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#C89223' : 'transparent',
                  color: isActive ? '#120E0E' : '#A8A29E',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = '#FDFAF6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#A8A29E';
                  }
                }}
              >
                <Icon size={15} color={isActive ? '#120E0E' : '#8E8780'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && <ChevronRight size={14} />}
              </button>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(253, 250, 246, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(253, 250, 246, 0.12)', color: '#FDFAF6', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
            <ArrowUpRight size={14} color="#C89223" /> Voltar para o Site
          </Link>
          <Link href="/admin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'transparent', color: '#8E8780', fontSize: '0.75rem', textDecoration: 'none' }}>
            Acessar Painel CMS
          </Link>
        </div>
      </aside>

      {/* 📄 CONTEÚDO PRINCIPAL (DOCUMENTO VIVO) COM MARGEM PARA SIDEBAR FIXA */}
      <main style={{ marginLeft: '280px', width: 'calc(100% - 280px)', minHeight: '100vh', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        
        {/* Topbar de Ações e Controles */}
        <header style={{ height: '64px', backgroundColor: previewTheme === 'light' ? 'rgba(253, 250, 246, 0.92)' : 'rgba(18, 14, 14, 0.92)', backdropFilter: 'blur(12px)', borderBottom: previewTheme === 'light' ? '1px solid #DED8D0' : '1px solid rgba(253,250,246,0.1)', position: 'sticky', top: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#C89223', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={15} /> Living Styleguide / Design System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#191616', border: '1px solid #DED8D0', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              {previewTheme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{previewTheme === 'light' ? 'Modo Noturno' : 'Modo Diurno'}</span>
            </button>
          </div>
        </header>

        {/* CORPO DO DOCUMENTO */}
        <div style={{ maxWidth: '1040px', width: '100%', margin: '0 auto', padding: '48px 32px 120px' }}>
          
          {/* SEÇÃO 1: OVERVIEW */}
          <section id="overview" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold" style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>DOCUMENTAÇÃO OFICIAL DO SISTEMA DE DESIGN</span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '12px 0 20px' }}>
              Sistema Visual <span style={{ fontFamily: 'var(--font-editorial, "DM Serif Display", serif)', fontStyle: 'italic', color: '#C89223' }}>Grupo Mais Barato</span>
            </h1>

            <div style={{ fontSize: '1.08rem', lineHeight: 1.7, color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                O <strong>Grupo Mais Barato (+B)</strong> é o ecossistema líder de varejo, farmácias, gastronomia e entretenimento no Pará. Sua arquitetura de design baseia-se em um contraste nobre entre a lona <strong>Branco Papel</strong> (<code>var(--paper)</code> — <code>#FDFAF6</code>) e a assinatura <strong>Preto Institucional</strong> (<code>var(--ink)</code> — <code>#120E0E</code>), energizada pela voltagem única do <strong>Ouro Principal</strong> (<code>var(--gold)</code> — <code>#C89223</code>) que conduz todos os CTAs primários, destaques editoriais e badges de prestígio.
              </p>
              <p>
                A tipografia opera em regime de <strong>dupla engrenagem editorial</strong>: a sofisticada <strong>DM Serif Display</strong> em títulos expressivos e frases em itálico dourado, equilibrada pela clareza funcional da <strong>DM Sans</strong> para corpo, interface, menus e dados.
              </p>
            </div>

            <div style={{ marginTop: '28px', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', border: '1px solid #C89223', borderRadius: '16px', padding: '28px', boxShadow: '0 8px 30px rgba(18,14,14,0.04)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 16px', color: '#C89223', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Princípios & Características Fundamentais:
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', lineHeight: 1.6, color: previewTheme === 'light' ? '#4D4845' : '#DED8D0' }}>
                <li><strong>Voltagem Única Dourada:</strong> <code>#C89223</code> é o tom oficial intransponível. Usado com parcimônia cirúrgica para que cada destaque brilhe com autoridade.</li>
                <li><strong>Linguagem de Cantos Orgânicos:</strong> Seções usam raios de <code>28px</code> (com margens contidas no desktop), cards usam <code>16px/24px</code>, botões e campos usam <code>12px</code> e pílulas são <code>9999px</code>. Sem cantos cortantes secos.</li>
                <li><strong>Dualidade Nobre de Ambientes:</strong> Transição fluida entre seções de leitura diurna (fundo claro com tipografia grafite) e seções de prestígio noturno (Hero, Marcas, Footer escuros com iluminação de <em>Golden Glow</em>).</li>
                <li><strong>Design System sem Dependências Externas:</strong> Fontes 100% integradas ao Next.js, zero layout shift e renderização ultrarrápida.</li>
              </ul>
            </div>
          </section>

          {/* SEÇÃO 2: CORES */}
          <section id="colors" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">02. PALETA NUCLEAR</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Cores & Tokens Semânticos</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px' }}>
              Clique em qualquer amostra para copiar a variável CSS correspondente para uso imediato no código.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {colors.map((c) => (
                <div 
                  key={c.name}
                  onClick={() => copyToken(`var(${c.var.split(' ')[0]})`, c.name)}
                  style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#191616', borderRadius: '16px', border: previewTheme === 'light' ? '1px solid #DED8D0' : '1px solid rgba(253,250,246,0.1)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <div style={{ height: '90px', backgroundColor: c.hex, padding: '12px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <span style={{ color: c.text, fontWeight: 800, fontSize: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                      {c.hex}
                    </span>
                    {copiedToken === c.name ? (
                      <span style={{ backgroundColor: '#237A4A', color: '#FFF', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={12} /> Copiado
                      </span>
                    ) : (
                      <Copy size={15} color={c.text} style={{ opacity: 0.8 }} />
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '4px' }}>{c.name}</div>
                    <code style={{ display: 'inline-block', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#120E0E', color: '#C89223', fontSize: '0.78rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                      {c.var}
                    </code>
                    <div style={{ fontSize: '0.8rem', color: '#8E8780', lineHeight: 1.4 }}>{c.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 3: SUBMARCAS */}
          <section id="sub-brands" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">03. ECOSSISTEMA MULTIMARCAS</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Paletas e Temas das Submarcas</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px' }}>
              Cada marca do Grupo Mais Barato possui um tema cromático e semântico dedicado, isolado por escopos CSS.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { name: 'The Wine Experience', theme: 'theme-wine', color: '#541212', accent: '#D4A017', icon: Wine, desc: 'Curadoria de vinhos nobres e gastronomia internacional. Vinho tinto bordô profundo com ouro nobre.' },
                { name: '+B Supermercados', theme: 'theme-supermercado', color: '#C89223', accent: '#120E0E', icon: ShoppingCart, desc: 'Varejo alimentar completo, rotina das famílias, mix completo e ofertas diárias.' },
                { name: '+B Farma', theme: 'theme-farma', color: '#0B3B24', accent: '#27AE60', icon: HeartPulse, desc: 'Saúde, farmácia, medicamentos e bem-estar. Verde escuro floresta com acento esmeralda.' },
                { name: 'Villa Plaza Park', theme: 'theme-park', color: '#B85D08', accent: '#F39C12', icon: PartyPopper, desc: 'O maior parque infantil de Belém. Diversão segura e lazer para crianças e famílias.' },
                { name: 'Villa Plaza Restaurante', theme: 'theme-plaza', color: '#7A3E1D', accent: '#E67E22', icon: Utensils, desc: 'Complexo gastronômico e convivência sofisticada integrada ao lazer.' },
              ].map((sb) => {
                const Icon = sb.icon;
                return (
                  <div key={sb.name} style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', border: `1px solid ${sb.accent}`, borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '90px', height: '90px', background: `radial-gradient(circle, ${sb.color} 0%, transparent 70%)`, opacity: 0.3, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: sb.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FDFAF6' }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{sb.name}</h4>
                        <code style={{ fontSize: '0.75rem', color: '#C89223' }}>.{sb.theme}</code>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: previewTheme === 'light' ? '#4D4845' : '#8E8780', lineHeight: 1.5, margin: 0 }}>
                      {sb.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SEÇÃO 4: TIPOGRAFIA & PADRÃO DE TÍTULOS */}
          <section id="typography" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">04. MOTOR TIPOGRÁFICO & HIERARQUIA</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Padrão Oficial de Títulos & Tipografia</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px', maxWidth: '800px', lineHeight: 1.6 }}>
              A identidade do <strong>Grupo Mais Barato</strong> não utiliza tipografia genérica (como Arial ou Roboto). Ela é regida por uma <strong>dupla engrenagem editorial</strong>: a clareza geométrica da <strong>DM Sans</strong> complementada pelo requinte nobre da <strong>DM Serif Display</strong> em itálicos dourados.
            </p>

            {/* 🌟 1. ANATOMIA E REGRAS DOS 5 NÍVEIS DE TÍTULO COM FOCO DESKTOP + TOOLTIP MOBILE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px' }}>
              
              {/* Nível 1: Subtitulozinho (Eyebrow / Overline) */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px', borderLeft: '5px solid #C89223' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', letterSpacing: '0.1em' }}>NÍVEL 01 • OVERLINE DE CATEGORIA</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>Subtitulozinho (Eyebrow Tag)</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      12px (Desktop)
                    </code>
                    <MobileInfoTooltip desktopPx="12px" mobilePx="11px" description="para manter espaçamento arejado e equilibrado em telas pequenas." />
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>.eyebrow-gold</code>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>Bold 700 • UPPERCASE</code>
                  </div>
                </div>
                
                <div style={{ margin: '12px 0 16px', padding: '16px 20px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#0B0909', borderRadius: '10px' }}>
                  <span className="eyebrow-gold" style={{ margin: 0 }}>SOBRE O GRUPO INSTITUCIONAL</span>
                </div>

                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', lineHeight: 1.6 }}>
                  <li><strong>💻 Padrão Desktop:</strong> Fixado em <strong>12px</strong> (<code>0.75rem</code>).</li>
                  <li><strong>📱 Comportamento Mobile:</strong> Ajusta sutilmente para <strong>11px</strong> com letter-spacing de <code>0.15em</code>.</li>
                  <li><strong>Família Tipográfica:</strong> <code>DM Sans</code> (700 Bold, Todas Maiúsculas) com filete linear dourado de 16px à esquerda.</li>
                </ul>
              </div>

              {/* Nível 2: Headline Principal */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px', borderLeft: '5px solid #C89223' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', letterSpacing: '0.1em' }}>NÍVEL 02 • TÍTULO PRINCIPAL EDITORIAL</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>Título Headline (com Destaque Dourado em Serif)</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      38px (Desktop)
                    </code>
                    <MobileInfoTooltip desktopPx="38px" mobilePx="20–22px" description="para que o título não fique gigantesco e caiba confortavelmente em 2 a 3 linhas na tela do smartphone." />
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>.about-headline / h2</code>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>Line-Height 1.22</code>
                  </div>
                </div>

                <div style={{ margin: '12px 0 16px', padding: '18px 22px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#0B0909', borderRadius: '10px' }}>
                  <h2 className="about-headline" style={{ margin: 0, fontSize: '38px', lineHeight: 1.22 }}>
                    O <span className="headline-highlight-italic">Grupo Mais Barato</span> reúne negócios<br />
                    que fazem parte do dia a dia<br />
                    das pessoas de <span style={{ whiteSpace: 'nowrap' }}>Belém — PA</span>
                  </h2>
                </div>

                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', lineHeight: 1.6 }}>
                  <li><strong>💻 Padrão Desktop:</strong> Fixado em <strong>38px</strong> (~<code>2.375rem</code>), garantindo presença nobre e harmoniosa em todas as seções.</li>
                  <li><strong>📱 Redução Fluida para Celulares:</strong> Em telas pequenas, a escala fluida reduz automaticamente para <strong>20px – 22px</strong> (evitando títulos estourados no mobile).</li>
                  <li><strong>Regra de Ouro do Destaque:</strong> O texto geral é <strong>DM Sans (700 Bold)</strong>, mas o nome da marca ou termo nobre é <strong>SEMPRE</strong> envolvido em <code>&lt;span className="headline-highlight-italic"&gt;</code> em <strong>DM Serif Display (400 Italic)</strong> na cor <strong>#C89223 (Gold)</strong>.</li>
                </ul>
              </div>

              {/* Nível 3: Subtítulo / Lead Editorial */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px', borderLeft: '5px solid #C89223' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', letterSpacing: '0.1em' }}>NÍVEL 03 • PARÁGRAFO LEAD INTRODUTÓRIO</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>Subtítulo / Lead Editorial (Lead Paragraph)</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      17px (Desktop)
                    </code>
                    <MobileInfoTooltip desktopPx="17px" mobilePx="15px" description="para que a introdução seja lida com leveza sem empurrar o conteúdo para baixo." />
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>.lead / .section-lead</code>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>Medium 500 • LH 1.65</code>
                  </div>
                </div>

                <div style={{ margin: '12px 0 16px', padding: '16px 20px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#0B0909', borderRadius: '10px' }}>
                  <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', fontWeight: 500 }}>
                    Nossa atuação integra marcas que compartilham o mesmo compromisso: oferecer experiências que superem expectativas, com foco nas pessoas, na excelência e no desenvolvimento regional.
                  </p>
                </div>

                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', lineHeight: 1.6 }}>
                  <li><strong>💻 Padrão Desktop:</strong> <strong>17px</strong> (<code>1.05rem</code> / <code>16.8px</code>) em <code>DM Sans (500 Medium)</code>.</li>
                  <li><strong>📱 Comportamento Mobile:</strong> Reduz para <strong>15px</strong> para leitura ágil em celulares.</li>
                </ul>
              </div>

              {/* Nível 4: Títulos de Cards & Matérias */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px', borderLeft: '5px solid #C89223' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', letterSpacing: '0.1em' }}>NÍVEL 04 • TÍTULOS DE CARDS & NOTÍCIAS</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>Títulos de Cards (H3 Card Title)</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      22px (Desktop)
                    </code>
                    <MobileInfoTooltip desktopPx="22px" mobilePx="18px" description="permitindo cards compactos em grid vertical no mobile." />
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>h3 / .card-title</code>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>Bold 700 • LH 1.25</code>
                  </div>
                </div>

                <div style={{ margin: '12px 0 16px', padding: '16px 20px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#0B0909', borderRadius: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, lineHeight: 1.25 }}>
                    Grupo Mais Barato celebra 10 anos de liderança e sustentabilidade
                  </h3>
                </div>

                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', lineHeight: 1.6 }}>
                  <li><strong>💻 Padrão Desktop:</strong> <strong>22px</strong> (<code>1.375rem</code>).</li>
                  <li><strong>📱 Comportamento Mobile:</strong> <strong>18px</strong> (<code>1.125rem</code>).</li>
                </ul>
              </div>

              {/* Nível 5: Corpo de Texto Corrido */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px', borderLeft: '5px solid #C89223' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', letterSpacing: '0.1em' }}>NÍVEL 05 • CORPO DE TEXTO CORRIDO</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>Texto de Parágrafo (Body Regular)</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 700 }}>
                      16px (Desktop)
                    </code>
                    <MobileInfoTooltip desktopPx="16px" mobilePx="14.5px" description="tamanho ideal para leitura confortável de blocos de parágrafos no smartphone." />
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>p / .body-default</code>
                    <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#8E8780', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem' }}>Regular 400 • LH 1.65</code>
                  </div>
                </div>

                <div style={{ margin: '12px 0 16px', padding: '16px 20px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#0B0909', borderRadius: '10px' }}>
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.65, color: previewTheme === 'light' ? '#4D4845' : '#DED8D0' }}>
                    Presente nos principais polos comerciais do estado, o grupo investe continuamente em inovação logística, valorização humana e relacionamento próximo com cada cliente.
                  </p>
                </div>

                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', lineHeight: 1.6 }}>
                  <li><strong>💻 Padrão Desktop:</strong> <strong>16px</strong> (<code>1.0rem</code>).</li>
                  <li><strong>📱 Comportamento Mobile:</strong> <strong>14.5px</strong> (<code>0.9rem</code>).</li>
                </ul>
              </div>

            </div>

            {/* 🛠️ 2. TESTADOR TIPOGRÁFICO INTERATIVO COMPLETO COM ABAS [EDITAR | VER PREVIEW] */}
            <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #C89223', padding: '24px 28px', marginBottom: '32px', boxShadow: '0 8px 30px rgba(200,146,35,0.06)' }}>
              
              {/* Barra Superior de Controles: [ EDITAR | VER PREVIEW ] e [ Fundo Claro | Fundo Escuro ] */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px', paddingBottom: '18px', borderBottom: '1px solid rgba(222,216,208,0.3)' }}>
                <div>
                  <span className="eyebrow-gold" style={{ fontSize: '0.72rem' }}>SANDBOX INTERATIVO</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0' }}>Testador do Conjunto de Títulos ao Vivo</h3>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  
                  {/* Seletor de Modo: [ EDITAR | VER PREVIEW ] */}
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1A1616', padding: '3px', borderRadius: '10px', border: '1px solid #DED8D0' }}>
                    <button 
                      onClick={() => setSandboxMode('preview')}
                      style={{ 
                        padding: '6px 14px', 
                        borderRadius: '7px', 
                        border: 'none', 
                        backgroundColor: sandboxMode === 'preview' ? '#C89223' : 'transparent', 
                        color: sandboxMode === 'preview' ? '#120E0E' : (previewTheme === 'light' ? '#4D4845' : '#DED8D0'), 
                        fontSize: '0.78rem', 
                        fontWeight: 800, 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}>
                      <span>👁️</span> VER PREVIEW
                    </button>
                    <button 
                      onClick={() => setSandboxMode('edit')}
                      style={{ 
                        padding: '6px 14px', 
                        borderRadius: '7px', 
                        border: 'none', 
                        backgroundColor: sandboxMode === 'edit' ? '#C89223' : 'transparent', 
                        color: sandboxMode === 'edit' ? '#120E0E' : (previewTheme === 'light' ? '#4D4845' : '#DED8D0'), 
                        fontSize: '0.78rem', 
                        fontWeight: 800, 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}>
                      <span>✏️</span> EDITAR
                    </button>
                  </div>

                  {/* Seletor de Tema: [ Fundo Claro | Fundo Escuro ] */}
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1A1616', padding: '3px', borderRadius: '10px', border: '1px solid #DED8D0' }}>
                    <button 
                      onClick={() => setTestPreviewTheme('light')}
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: '7px', 
                        border: 'none', 
                        backgroundColor: testPreviewTheme === 'light' ? '#120E0E' : 'transparent', 
                        color: testPreviewTheme === 'light' ? '#FDFAF6' : '#8E8780', 
                        fontSize: '0.76rem', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                      ☀️ Fundo Claro
                    </button>
                    <button 
                      onClick={() => setTestPreviewTheme('dark')}
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: '7px', 
                        border: 'none', 
                        backgroundColor: testPreviewTheme === 'dark' ? '#C89223' : 'transparent', 
                        color: testPreviewTheme === 'dark' ? '#120E0E' : '#8E8780', 
                        fontSize: '0.76rem', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                      🌙 Fundo Escuro
                    </button>
                  </div>

                </div>
              </div>

              {/* MODO 1: EDITAR (Inputs de Customização com Foco no Padrão Desktop) */}
              {sandboxMode === 'edit' && (
                <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#181414', borderRadius: '14px', border: '1px solid rgba(200,146,35,0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase' }}>
                      ✍️ Digite seus próprios textos para testar:
                    </span>
                    <button 
                      onClick={() => {
                        setTestEyebrow('SOBRE O GRUPO INSTITUCIONAL');
                        setTestHeadlinePrefix('O ');
                        setTestHeadlineItalic('Grupo Mais Barato');
                        setTestHeadlineSuffix(' reúne negócios que transformam o dia a dia em Belém — PA');
                        setTestLeadText('Nossa atuação integra grandes marcas com excelência, compromisso humano e investimento no futuro do Pará.');
                      }}
                      style={{ backgroundColor: 'transparent', border: '1px solid #DED8D0', color: previewTheme === 'light' ? '#4D4845' : '#DED8D0', borderRadius: '6px', padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer' }}>
                      ↺ Restaurar Padrão
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span>1. Subtitulozinho (Eyebrow):</span>
                        <span style={{ color: '#8E8780', fontSize: '0.7rem', fontWeight: 600 }}>12px Desktop</span>
                      </label>
                      <input 
                        type="text" 
                        value={testEyebrow} 
                        onChange={(e) => setTestEyebrow(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DED8D0', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#0E0B0B', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span>2. Prefixo do Headline:</span>
                        <span style={{ color: '#8E8780', fontSize: '0.7rem', fontWeight: 600 }}>34px Desktop</span>
                      </label>
                      <input 
                        type="text" 
                        value={testHeadlinePrefix} 
                        onChange={(e) => setTestHeadlinePrefix(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DED8D0', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#0E0B0B', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span>3. Destaque Serif Gold:</span>
                        <span style={{ color: '#C89223', fontSize: '0.7rem', fontWeight: 700 }}>34px Desktop</span>
                      </label>
                      <input 
                        type="text" 
                        value={testHeadlineItalic} 
                        onChange={(e) => setTestHeadlineItalic(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #C89223', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#0E0B0B', color: '#C89223', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span>4. Sufixo do Headline:</span>
                        <span style={{ color: '#8E8780', fontSize: '0.7rem', fontWeight: 600 }}>34px Desktop</span>
                      </label>
                      <input 
                        type="text" 
                        value={testHeadlineSuffix} 
                        onChange={(e) => setTestHeadlineSuffix(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DED8D0', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#0E0B0B', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C89223', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span>5. Subtítulo / Lead Editorial:</span>
                      <span style={{ color: '#8E8780', fontSize: '0.7rem', fontWeight: 600 }}>17px Desktop</span>
                    </label>
                    <input 
                      type="text" 
                      value={testLeadText} 
                      onChange={(e) => setTestLeadText(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #DED8D0', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#0E0B0B', color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                </div>
              )}

              {/* RENDERIZAÇÃO REALISTA AO VIVO COM CONTRASTE TOTAL GARANTIDO EM FUNDO ESCURO */}
              <div style={{ 
                backgroundColor: testPreviewTheme === 'light' ? '#FDFAF6' : '#0E0B0B', 
                borderRadius: '16px', 
                padding: '40px 36px', 
                border: testPreviewTheme === 'light' ? '1px solid #DED8D0' : '1px solid rgba(200,146,35,0.35)', 
                boxShadow: testPreviewTheme === 'light' ? '0 4px 20px rgba(0,0,0,0.03)' : '0 12px 40px rgba(0,0,0,0.6)', 
                transition: 'all 0.3s ease', 
                position: 'relative' 
              }}>
                {/* Régua Flutuante de Medição Desktop + Tooltip Mobile */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', color: testPreviewTheme === 'light' ? '#8E8780' : '#8E8780' }}>
                    Eyebrow: <strong style={{ color: '#C89223' }}>12px</strong>
                  </span>
                  <span style={{ fontSize: '0.74rem', color: testPreviewTheme === 'light' ? '#8E8780' : '#8E8780' }}>
                    Headline: <strong style={{ color: '#C89223' }}>34px</strong>
                  </span>
                  <span style={{ fontSize: '0.74rem', color: testPreviewTheme === 'light' ? '#8E8780' : '#8E8780' }}>
                    Lead: <strong style={{ color: '#C89223' }}>17px</strong>
                  </span>
                  <MobileInfoTooltip desktopPx="34px" mobilePx="20–22px" description="para manter proporção agradável e não quebrar layout em celulares." />
                </div>

                {/* 1. Subtitulozinho (Eyebrow Tag) */}
                <span className="eyebrow-gold" style={{ display: 'inline-block', marginBottom: '16px', color: '#C89223', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em' }}>
                  {testEyebrow || 'SUBTÍTULO DA SEÇÃO'}
                </span>
                
                {/* 2. Título Headline (com cor contrastante explícita no tema escuro) */}
                <h2 style={{ 
                  margin: '0 0 18px', 
                  fontSize: '34px', 
                  lineHeight: 1.22, 
                  fontWeight: 700, 
                  letterSpacing: '-0.015em',
                  color: testPreviewTheme === 'light' ? '#120E0E' : '#FDFAF6' 
                }}>
                  <span>{testHeadlinePrefix}</span>
                  <span style={{ 
                    fontFamily: 'var(--font-editorial, "DM Serif Display", serif)', 
                    fontStyle: 'italic', 
                    color: '#C89223', 
                    fontWeight: 400,
                    margin: '0 4px'
                  }}>
                    {testHeadlineItalic}
                  </span>
                  <span>{testHeadlineSuffix}</span>
                </h2>

                {/* 3. Subtítulo / Lead Editorial */}
                <p style={{ 
                  fontSize: '17px', 
                  lineHeight: 1.65, 
                  color: testPreviewTheme === 'light' ? '#4D4845' : '#DED8D0', 
                  maxWidth: '820px', 
                  margin: 0, 
                  fontWeight: 500 
                }}>
                  {testLeadText}
                </p>

                {/* Dica de Ação Rápida no Preview */}
                {sandboxMode === 'preview' && (
                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: testPreviewTheme === 'light' ? '1px solid rgba(222,216,208,0.5)' : '1px solid rgba(253,250,246,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.74rem', color: testPreviewTheme === 'light' ? '#8E8780' : '#8E8780' }}>
                      💡 Visualizando em <strong>PADRÃO DESKTOP (34px)</strong>. Clique na aba <strong>EDITAR</strong> acima para testar seus próprios textos.
                    </span>
                    <button 
                      onClick={() => setSandboxMode('edit')}
                      style={{ backgroundColor: 'transparent', border: '1px solid #C89223', color: '#C89223', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}>
                      ✏️ Personalizar Textos
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 📋 3. TABELA DE ESPECIFICAÇÃO DE TOKENS (COM DESTAQUE DESKTOP + TOOLTIP MOBILE) */}
            <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: previewTheme === 'light' ? '1px solid #DED8D0' : '1px solid rgba(253,250,246,0.1)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#191616', borderBottom: '1px solid #DED8D0' }}>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>Token</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>Família</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800, color: '#C89223' }}>PADRÃO DESKTOP (PX)</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>ADAPTAÇÃO MOBILE</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>Peso</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>Line Height</th>
                      <th style={{ padding: '14px 16px', fontWeight: 800 }}>Uso Principal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: '{typography.eyebrow-tag}', font: 'DM Sans', desktopPx: '12px', mobilePx: '11px', mobileDesc: 'para manter proporção nítida em telas menores.', weight: '700 (Uppercase)', lh: '1.0', usage: 'Subtitulozinho superior com traço dourado (Eyebrow)' },
                      { token: '{typography.headline-serif}', font: 'DM Serif Display', desktopPx: '38px', mobilePx: '20–22px', mobileDesc: 'para que o título não estoure no mobile e caiba em 2 a 3 linhas.', weight: '400 (Italic Gold)', lh: '1.22', usage: 'Destaque nobre no Headline (\"Grupo Mais Barato\")' },
                      { token: '{typography.section-h2}', font: 'DM Sans', desktopPx: '38px', mobilePx: '20–22px', mobileDesc: 'para não quebrar em várias linhas no smartphone.', weight: '700', lh: '1.22', usage: 'Texto base do Headline principal' },
                      { token: '{typography.body-lead}', font: 'DM Sans', desktopPx: '17px', mobilePx: '15px', mobileDesc: 'proporcionando leitura leve de parágrafos em celulares.', weight: '500', lh: '1.65', usage: 'Subtítulo / Parágrafo Lead introdutório' },
                      { token: '{typography.title-card-h3}', font: 'DM Sans / Serif', desktopPx: '22px', mobilePx: '18px', mobileDesc: 'permitindo cards compactos em grid vertical no mobile.', weight: '700', lh: '1.25', usage: 'Títulos de cards de marcas e matérias de notícias' },
                      { token: '{typography.body-default}', font: 'DM Sans', desktopPx: '16px', mobilePx: '14.5px', mobileDesc: 'tamanho ideal para leitura confortável de notícias no smartphone.', weight: '400', lh: '1.65', usage: 'Texto corrido de artigos e parágrafos' },
                      { token: '{typography.button-cta}', font: 'DM Sans', desktopPx: '13px', mobilePx: '12px', mobileDesc: 'botões ergonômicos e bem dimensionados para o toque.', weight: '700 (Uppercase)', lh: '1.0', usage: 'Rótulo de botões e ações de conversão' },
                    ].map((t, idx) => (
                      <tr key={t.token} style={{ borderBottom: '1px solid rgba(222,216,208,0.4)', backgroundColor: idx % 2 === 0 ? 'transparent' : (previewTheme === 'light' ? 'rgba(248,245,240,0.5)' : 'rgba(25,22,22,0.4)') }}>
                        <td style={{ padding: '12px 16px' }}><code style={{ color: '#C89223', fontWeight: 700 }}>{t.token}</code></td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{t.font}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', border: '1px solid rgba(200,146,35,0.35)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                            {t.desktopPx}
                          </code>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <MobileInfoTooltip desktopPx={t.desktopPx} mobilePx={t.mobilePx} description={t.mobileDesc} />
                        </td>
                        <td style={{ padding: '12px 16px' }}>{t.weight}</td>
                        <td style={{ padding: '12px 16px' }}>{t.lh}</td>
                        <td style={{ padding: '12px 16px', color: previewTheme === 'light' ? '#4D4845' : '#8E8780' }}>{t.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SEÇÃO 5: ACESSIBILIDADE & WCAG AAA */}
          <section id="accessibility" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">05. MATRIZ DE ACESSIBILIDADE</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Contraste Óptico & Padrão WCAG 2.1 AAA</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px' }}>
              Todas as combinações de cores do Grupo Mais Barato são rigorosamente validadas para garantir legibilidade impecável para pessoas com diferentes graus de sensibilidade visual.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
              {accessibilityMatrix.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '14px', border: previewTheme === 'light' ? '1px solid #DED8D0' : '1px solid rgba(253,250,246,0.1)', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>{item.pair}</div>
                    <div style={{ fontSize: '0.74rem', color: '#8E8780' }}>{item.level}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(35, 122, 74, 0.12)', border: '1px solid #237A4A', color: '#237A4A', padding: '3px 8px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 800 }}>
                      <CheckCircle2 size={12} /> {item.ratio}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 6: GRID & ESPAÇAMENTO */}
          <section id="layout" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">06. ESTRUTURA ESPACIAL</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Grid, Layout & Escala de Espaçamento</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px' }}>
              Base unit matemática de <strong>4px</strong> com passos progressivos. Largura máxima oficial de container fixada em <strong>1280px</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
              {[
                { token: '--space-1', value: '4px', usage: 'Micro-espaçamentos, gaps entre ícone e badge' },
                { token: '--space-2', value: '8px', usage: 'Gap entre ícone e texto de botão, padding de pílulas' },
                { token: '--space-3', value: '12px', usage: 'Padding vertical de inputs e botões padrão' },
                { token: '--space-4', value: '16px', usage: 'Gaps de grids de cards, padding de cards padrão' },
                { token: '--space-6', value: '24px', usage: 'Padding de painéis, margem inferior de parágrafos' },
                { token: '--space-8', value: '32px', usage: 'Espaçamento entre subtítulos e blocos de conteúdo' },
                { token: '--space-12', value: '48px', usage: 'Margem lateral de containers em telas desktop' },
                { token: '--space-16', value: '64px', usage: 'Padding vertical padrão de seções nobres' },
                { token: '--space-32', value: '120px', usage: 'Espaçamento máximo entre grandes blocos narrativos' },
              ].map((s) => (
                <div key={s.token} style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#191616', border: '1px solid #DED8D0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <code style={{ color: '#C89223', fontWeight: 800, fontSize: '0.85rem' }}>{s.token}</code>
                    <strong style={{ fontSize: '0.9rem' }}>{s.value}</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F8F5F0', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: s.value, height: '100%', backgroundColor: '#C89223' }} />
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#8E8780', lineHeight: 1.35 }}>{s.usage}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 7: PROFUNDIDADE, MOTION & MICRO-INTERAÇÕES */}
          <section id="elevation" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">07. PROFUNDIDADE & MOTION</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Elevação, Sombras & Curvas de Animação</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              
              {/* Sombra Suave */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', border: '1px solid #DED8D0', borderRadius: '16px', padding: '24px', boxShadow: '0 16px 45px rgba(18, 14, 14, 0.08)' }}>
                <span className="eyebrow-gold">SOMBRA SUAVE (--shadow-subtle)</span>
                <h4 style={{ margin: '8px 0', fontSize: '1.1rem', fontWeight: 800 }}>Elevação Padrão de Painéis</h4>
                <p style={{ fontSize: '0.84rem', color: '#8E8780', margin: 0, lineHeight: 1.5 }}>
                  Utilizada em cards de notícias, painéis flutuantes e modais. Sombra neutra suave sem aberração cromática em fundos claros.
                </p>
              </div>

              {/* Golden Glow */}
              <div style={{ backgroundColor: '#120E0E', color: '#FDFAF6', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(200,146,35,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <span className="eyebrow-gold">GOLDEN GLOW SPOTLIGHT</span>
                <h4 style={{ margin: '8px 0', fontSize: '1.1rem', fontWeight: 800 }}>Iluminação Dinâmica de Cursor</h4>
                <p style={{ fontSize: '0.84rem', color: '#DED8D0', margin: 0, lineHeight: 1.5 }}>
                  Gradiente radial acionado dinamicamente no Hero, seções noturnas e rodapé via mix-blend screen.
                </p>
              </div>
            </div>

            {/* Playground de Motion & Curvas de Transição */}
            <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#141010', borderRadius: '16px', border: '1px solid #DED8D0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span className="eyebrow-gold" style={{ fontSize: '0.72rem' }}>TOKENS DE TRANSIÇÃO (MOTION SPEC)</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '2px 0 0' }}>Curva Suave: <code>cubic-bezier(0.16, 1, 0.3, 1)</code></h4>
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.76rem' }}>
                  <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', padding: '3px 8px', borderRadius: '6px' }}>--duration-fast: 150ms</code>
                  <code style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1F1B1B', color: '#C89223', padding: '3px 8px', borderRadius: '6px' }}>--duration-normal: 250ms</code>
                </div>
              </div>

              {/* Card Interativo com Hover Lift */}
              <div 
                onMouseEnter={() => setMotionHovered(true)}
                onMouseLeave={() => setMotionHovered(false)}
                style={{
                  padding: '24px',
                  backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1C1818',
                  borderRadius: '12px',
                  border: motionHovered ? '1px solid #C89223' : '1px solid transparent',
                  transform: motionHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: motionHovered ? '0 16px 36px rgba(200, 146, 35, 0.18)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#C89223', fontWeight: 800, textTransform: 'uppercase' }}>Passe o mouse para testar a curva</span>
                    <h5 style={{ margin: '4px 0', fontSize: '1.05rem', fontWeight: 800 }}>Efeito Suave de Elevação & Magnetismo</h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#8E8780' }}>
                      Transição elástica suave sem cortes secos para garantir a sensação de produto premium.
                    </p>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: motionHovered ? '#C89223' : '#120E0E', color: motionHovered ? '#120E0E' : '#FDFAF6', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}>
                    <Sparkles size={18} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 8: BIBLIOTECA COMPLETA DE COMPONENTES VIVOS */}
          <section id="components" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">08. COMPONENTES VIVOS</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Biblioteca Completa de Componentes UI</h2>
            <p style={{ color: '#8E8780', margin: '0 0 28px' }}>
              Componentes oficiais renderizados ao vivo. Teste cliques, digitação, seletores e interações.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* 1. Botões Oficiais */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#C89223' }}>1. Botões & Ações CTA</h4>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a href="#hero" className="btn-hero-cta" onClick={(e) => e.preventDefault()}>
                    Conheça o GMB <ArrowRight size={16} />
                  </a>
                  <a href="#links" className="btn-card-primary" onClick={(e) => e.preventDefault()}>
                    Ver links <ArrowUpRight size={15} />
                  </a>
                  <a href="#map" className="btn-card-secondary" onClick={(e) => e.preventDefault()}>
                    <MapPin size={15} /> Ver localização
                  </a>
                  <a href="#work" className="btn-trabalhe-card" onClick={(e) => e.preventDefault()}>
                    QUERO ME CANDIDATAR <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* 2. Badges e Pílulas de Categoria */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#C89223' }}>2. Badges & Pílulas de Categoria</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#C89223', color: '#120E0E', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Institucional</span>
                  <span style={{ backgroundColor: '#237A4A', color: '#FDFAF6', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Publicada</span>
                  <span style={{ backgroundColor: '#A87516', color: '#FDFAF6', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Rascunho</span>
                  <span style={{ backgroundColor: '#541212', color: '#FDFAF6', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>The Wine Experience</span>
                  <span style={{ backgroundColor: '#0B3B24', color: '#FDFAF6', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>+B Farma</span>
                  <span style={{ backgroundColor: '#B85D08', color: '#FDFAF6', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Villa Plaza Park</span>
                </div>
              </div>

              {/* 3. Card Editorial de Notícia Completo */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#C89223' }}>3. Card de Notícia (News Card Plate)</h4>
                <div style={{ maxWidth: '420px', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#191616', borderRadius: '16px', border: '1px solid #DED8D0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div style={{ width: '100%', height: '190px', backgroundColor: '#120E0E', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span style={{ backgroundColor: '#C89223', color: '#120E0E', padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Institucional</span>
                    </div>
                    <span style={{ color: '#8E8780', fontSize: '0.85rem' }}>📷 Foto Editorial / Thumbnail</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#8E8780', marginBottom: '10px' }}>
                      <Calendar size={13} />
                      <span>01 de Setembro de 2026</span>
                      <span>•</span>
                      <Clock size={13} />
                      <span>3 min de leitura</span>
                    </div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 800, margin: '0 0 10px', lineHeight: 1.3 }}>
                      Grupo Mais Barato celebra 10 anos de expansão e sustentabilidade no Pará
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#8E8780', margin: 0, lineHeight: 1.55 }}>
                      Trajetória de sucesso conectando varejo, saúde e entretenimento para milhares de famílias paraenses.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Inputs & Barra de Busca com Foco Dourado */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#C89223' }}>4. Campos de Formulário & Barra de Busca</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  
                  {/* Campo de Busca Interativo */}
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '6px', color: '#C89223' }}>
                      BARRA DE PESQUISA COM ÍCONE:
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8E8780' }} />
                      <input 
                        type="text" 
                        placeholder="Buscar por marcas, matérias ou unidades..." 
                        value={interactiveSearch} 
                        onChange={(e) => setInteractiveSearch(e.target.value)} 
                        style={{
                          width: '100%',
                          padding: '10px 14px 10px 38px',
                          borderRadius: '10px',
                          border: '1px solid #DED8D0',
                          backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1A1616',
                          color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6',
                          fontSize: '0.85rem',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s'
                        }} 
                        onFocus={(e) => {
                          e.target.style.borderColor = '#C89223';
                          e.target.style.boxShadow = '0 0 0 3px rgba(200, 146, 35, 0.15)';
                        }} 
                        onBlur={(e) => {
                          e.target.style.borderColor = '#DED8D0';
                          e.target.style.boxShadow = 'none';
                        }} 
                      />
                    </div>
                  </div>

                  {/* Campo Regular */}
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '6px', color: '#C89223' }}>
                      CAMPO REGULAR COM LABEL:
                    </label>
                    <input 
                      type="text" 
                      defaultValue="contato@grupomaisbarato.com.br" 
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #DED8D0',
                        backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#1A1616',
                        color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }} 
                      onFocus={(e) => {
                        e.target.style.borderColor = '#C89223';
                        e.target.style.boxShadow = '0 0 0 3px rgba(200, 146, 35, 0.15)';
                      }} 
                      onBlur={(e) => {
                        e.target.style.borderColor = '#DED8D0';
                        e.target.style.boxShadow = 'none';
                      }} 
                    />
                  </div>

                </div>
              </div>

              {/* 5. Accordion Interativo (FAQ & Governança) */}
              <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#C89223' }}>5. Accordion Interativo (FAQ & Governança)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { q: 'Qual é o propósito do Design System do Grupo Mais Barato?', a: 'Garantir consistência visual, agilidade no desenvolvimento de novos produtos e fidelidade estrita à identidade institucional em todas as submarcas.' },
                    { q: 'Como funciona a adaptação tipográfica em smartphones?', a: 'Os títulos desktop de 34px reduzem fluidamente para 20px–22px, evitando quebras excessivas de linha e mantendo o design equilibrado e legível no mobile.' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ border: '1px solid #DED8D0', borderRadius: '10px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)} 
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '14px 18px',
                          backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#181414',
                          border: 'none',
                          color: previewTheme === 'light' ? '#120E0E' : '#FDFAF6',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span>{item.q}</span>
                        {faqOpenIndex === idx ? <ChevronUp size={16} color="#C89223" /> : <ChevronDown size={16} />}
                      </button>
                      {faqOpenIndex === idx && (
                        <div style={{ padding: '14px 18px', backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', fontSize: '0.84rem', color: '#8E8780', lineHeight: 1.55 }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* SEÇÃO 9: RESPONSIVIDADE */}
          <section id="responsive" style={{ marginBottom: '64px', scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">09. PADRÃO RESPONSIVO</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Breakpoints & Comportamento Adaptativo</h2>
            
            <div style={{ backgroundColor: previewTheme === 'light' ? '#FFFFFF' : '#120E0E', borderRadius: '16px', border: '1px solid #DED8D0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ backgroundColor: previewTheme === 'light' ? '#F8F5F0' : '#191616', borderBottom: '1px solid #DED8D0' }}>
                    <th style={{ padding: '14px 16px', fontWeight: 800 }}>Dispositivo</th>
                    <th style={{ padding: '14px 16px', fontWeight: 800 }}>Largura (Width)</th>
                    <th style={{ padding: '14px 16px', fontWeight: 800 }}>Comportamento Chave</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(222,216,208,0.4)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Mobile</td>
                    <td style={{ padding: '12px 16px' }}><code>&lt; 768px</code></td>
                    <td style={{ padding: '12px 16px', color: '#8E8780' }}>Menu lateral overlay em tela cheia; colunas empilhadas (1 coluna); cards full width; headline reduz para 20–22px.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(222,216,208,0.4)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Tablet</td>
                    <td style={{ padding: '12px 16px' }}><code>768px – 1024px</code></td>
                    <td style={{ padding: '12px 16px', color: '#8E8780' }}>Grids em 2 colunas; seções com margem lateral contida de 20px.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(222,216,208,0.4)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Desktop</td>
                    <td style={{ padding: '12px 16px' }}><code>1024px – 1440px</code></td>
                    <td style={{ padding: '12px 16px', color: '#8E8780' }}>Layout completo com raio de 28px nas seções, órbita interativa e navegação fixa.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>Wide Screen</td>
                    <td style={{ padding: '12px 16px' }}><code>&gt; 1440px</code></td>
                    <td style={{ padding: '12px 16px', color: '#8E8780' }}>Container centrado e travado em 1280px de largura máxima para conforto visual.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SEÇÃO 10: HUB DE EXPORTAÇÃO UNIVERSAL PARA DEVS & IAS */}
          <section id="export-tokens" style={{ scrollMarginTop: '88px' }}>
            <span className="eyebrow-gold">10. EXPORTAÇÃO UNIVERSAL</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px' }}>Hub de Tokens para Desenvolvedores & IAs</h2>
            <p style={{ color: '#8E8780', margin: '0 0 20px' }}>
              Selecione o formato desejado para exportar instantaneamente as especificações oficiais para Next.js, Tailwind ou instruções de IA.
            </p>

            {/* Seletor de Abas de Exportação */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {[
                { id: 'css', label: 'CSS Variables (:root)', icon: Code },
                { id: 'json', label: 'JSON Tokens (W3C / Figma)', icon: FileJson },
                { id: 'tailwind', label: 'Tailwind Config Extend', icon: Sliders },
                { id: 'ai-prompt', label: '🤖 Prompt de IA para Design', icon: Cpu },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = exportTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setExportTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #C89223' : '1px solid #DED8D0',
                      backgroundColor: isSelected ? '#C89223' : (previewTheme === 'light' ? '#FFFFFF' : '#141010'),
                      color: isSelected ? '#120E0E' : (previewTheme === 'light' ? '#120E0E' : '#FDFAF6'),
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bloco de Código com Botão de Copiar */}
            <div style={{ backgroundColor: '#120E0E', color: '#FDFAF6', borderRadius: '16px', border: '1px solid rgba(200,146,35,0.4)', padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: '#C89223', fontWeight: 700 }}>
                  {exportTab === 'css' && 'tokens.css — Variáveis CSS Oficiais'}
                  {exportTab === 'json' && 'design-tokens.json — Especificação W3C'}
                  {exportTab === 'tailwind' && 'tailwind.config.ts — Extend Snippet'}
                  {exportTab === 'ai-prompt' && 'DESIGN_SYSTEM_AI_PROMPT.md — Instruções para Agentes'}
                </span>
                
                <button 
                  onClick={() => {
                    let textToCopy = '';
                    if (exportTab === 'css') {
                      textToCopy = `:root {
  --color-yellow: #C89223;
  --color-black: #120E0E;
  --color-white: #FDFAF6;
  --color-charcoal: #191616;
  --color-off-white: #F8F5F0;
  --color-gray-light: #DED8D0;
  --color-gray-medium: #8E8780;
  --color-gray-dark: #4D4845;
  --font-primary: "DM Sans", sans-serif;
  --font-editorial: "DM Serif Display", serif;
  --radius-small: 6px;
  --radius-control: 12px;
  --radius-panel: 16px;
  --radius-section: 28px;
  --container-width: 1280px;
}`;
                    } else if (exportTab === 'json') {
                      textToCopy = JSON.stringify({
                        name: "Grupo Mais Barato Design Tokens",
                        version: "2.0.0",
                        colors: {
                          primary: { value: "#C89223", type: "color" },
                          ink: { value: "#120E0E", type: "color" },
                          paper: { value: "#FDFAF6", type: "color" },
                          charcoal: { value: "#191616", type: "color" },
                          muted: { value: "#8E8780", type: "color" }
                        },
                        typography: {
                          headline: { desktopPx: "34px", mobilePx: "20px", fontFamily: "DM Sans", highlightFont: "DM Serif Display" },
                          eyebrow: { desktopPx: "12px", mobilePx: "11px", fontWeight: "700" }
                        }
                      }, null, 2);
                    } else if (exportTab === 'tailwind') {
                      textToCopy = `export default {
  theme: {
    extend: {
      colors: {
        gold: '#C89223',
        ink: '#120E0E',
        paper: '#FDFAF6',
        charcoal: '#191616'
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'DM Sans', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'DM Serif Display', 'serif']
      }
    }
  }
};`;
                    } else {
                      textToCopy = `# REGRAS OFICIAIS DE DESIGN SYSTEM — GRUPO MAIS BARATO
1. Tipografia: SEMPRE usar DM Sans para texto e DM Serif Display (Italic Gold #C89223) no destaque nobre dos Headlines.
2. Tamanho dos Títulos: Desktop padrão é 38px. Mobile reduz automaticamente para 20–22px.
3. Cores: Base Canvas #FDFAF6, Tinta #120E0E, Acento Ouro #C89223.`;
                    }
                    copyToken(textToCopy, `export-${exportTab}`);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#C89223', color: '#120E0E', padding: '6px 14px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                  {copiedToken === `export-${exportTab}` ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedToken === `export-${exportTab}` ? 'Copiado!' : 'Copiar Tudo'}</span>
                </button>
              </div>

              <pre style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#DED8D0', overflowX: 'auto' }}>
                {exportTab === 'css' && `:root {
  --color-yellow: #C89223;         /* Ouro Principal */
  --color-black: #120E0E;          /* Preto Institucional */
  --color-white: #FDFAF6;          /* Branco Papel */
  --color-charcoal: #191616;       /* Superfícies Escuras */
  --color-off-white: #F8F5F0;      /* Superfícies Suaves */
  --color-gray-light: #DED8D0;     /* Bordas Claras */
  --color-gray-medium: #8E8780;    /* Metadados e Muted */
  --color-gray-dark: #4D4845;      /* Texto Corrido */

  /* Tipografia Oficial */
  --font-primary: "DM Sans", sans-serif;
  --font-editorial: "DM Serif Display", serif;

  /* Geometria e Raios */
  --radius-small: 6px;
  --radius-control: 12px;
  --radius-panel: 16px;
  --radius-section: 28px;
  --container-width: 1280px;
}`}

                {exportTab === 'json' && `{
  "name": "Grupo Mais Barato Design Tokens",
  "version": "2.0.0",
  "colors": {
    "primary": { "value": "#C89223", "type": "color" },
    "ink": { "value": "#120E0E", "type": "color" },
    "paper": { "value": "#FDFAF6", "type": "color" },
    "charcoal": { "value": "#191616", "type": "color" },
    "muted": { "value": "#8E8780", "type": "color" }
  },
  "typography": {
    "headline": {
      "desktopPx": "38px",
      "mobilePx": "20px",
      "fontFamily": "DM Sans",
      "highlightFont": "DM Serif Display"
    },
    "eyebrow": {
      "desktopPx": "12px",
      "mobilePx": "11px",
      "fontWeight": "700"
    }
  }
}`}

                {exportTab === 'tailwind' && `export default {
  theme: {
    extend: {
      colors: {
        gold: '#C89223',
        ink: '#120E0E',
        paper: '#FDFAF6',
        charcoal: '#191616'
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'DM Sans', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'DM Serif Display', 'serif']
      }
    }
  }
};`}

                {exportTab === 'ai-prompt' && `# REGRAS OFICIAIS DE DESIGN SYSTEM — GRUPO MAIS BARATO
1. Tipografia: SEMPRE usar DM Sans para texto e DM Serif Display (Italic Gold #C89223) no destaque nobre dos Headlines.
2. Tamanho dos Títulos: Desktop padrão é 38px. Mobile reduz automaticamente para 20–22px via clamp ou tooltips.
3. Cores: Base Canvas #FDFAF6, Tinta #120E0E, Acento Ouro #C89223.
4. Cards: Raio de 16px, borda sutil #DED8D0 e sombra de elevação suave.`}
              </pre>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}