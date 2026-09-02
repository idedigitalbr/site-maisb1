'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Search, Star, X } from 'lucide-react';
import { storeUnits } from '../lib/locations';

const asset = (path: string) => `/assets/${path}`;

function InstagramBrandIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
}

function FacebookBrandIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}

function LinkedinBrandIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}

const units = storeUnits;

type BrandLocatorSelection = {
  brandId: string;
};

function unitMatchesBrand(unit: (typeof units)[number], brandId: string) {
  if (brandId === 'super') return unit.category === '+B Supermercados';
  const brandLabels: Record<string, string> = {
    farma: '+B FARMA',
    wine: 'THE WINE EXPERIENCE',
    plaza: 'VILLA PLAZA',
    park: 'VILLA PLAZA PARK',
  };
  return brandLabels[brandId] ? unit.subbrands.includes(brandLabels[brandId]) : false;
}

export function SiteFooter() {
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const visibleUnits = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return units.filter((unit) => {
      const matchesBrand = !brandFilter || unitMatchesBrand(unit, brandFilter);
      const matchesQuery = !normalized || `${unit.name} ${unit.address} ${unit.subbrands.join(' ')}`.toLowerCase().includes(normalized);
      return matchesBrand && matchesQuery;
    });
  }, [brandFilter, query]);

  const selectedUnit = units.find((unit) => unit.address === selectedAddress);
  const mapSrc = selectedUnit ? `https://www.google.com/maps?q=${encodeURIComponent(`${selectedUnit.name} ${selectedUnit.address} Belém PA`)}&output=embed` : 'https://www.google.com/maps?q=Supermercados+Mais+B+Bel%C3%A9m+PA&output=embed';
  const onFooterMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  useEffect(() => {
    const onBrandLocatorSelect = (event: Event) => {
      const brandId = (event as CustomEvent<BrandLocatorSelection>).detail?.brandId;
      if (!brandId) return;

      const matchingUnits = units.filter((unit) => unitMatchesBrand(unit, brandId));
      setBrandFilter(brandId);
      setQuery('');
      setSelectedAddress(matchingUnits[0]?.address ?? '');
      window.requestAnimationFrame(() => {
        document.getElementById('store-locator-teaser')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    const onLocatorHashChange = () => {
      if (window.location.hash === '#store-locator-teaser') {
        setBrandFilter(null);
        setSelectedAddress('');
      }
    };

    window.addEventListener('store-locator-brand-select', onBrandLocatorSelect);
    window.addEventListener('hashchange', onLocatorHashChange);
    return () => {
      window.removeEventListener('store-locator-brand-select', onBrandLocatorSelect);
      window.removeEventListener('hashchange', onLocatorHashChange);
    };
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    lightboxCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const closeLightbox = () => {
    setLightboxIndex(null);
    window.setTimeout(() => lightboxTriggerRef.current?.focus(), 0);
  };

  return (
    <footer className="footer footer-gold" id="contato" onMouseMove={onFooterMouseMove}>
      <div className="store-locator-gold-section" id="store-locator-teaser">
        <div className="container store-locator-container"><div className="store-locator-grid">
          <div className="store-left-col">
            <span className="eyebrow-gold">NOSSAS UNIDADES</span>
            <h2 className="locator-gold-title">Encontre <span className="headline-highlight-italic">nossas unidades</span></h2>
            <p className="locator-gold-desc">Lojas, serviços e experiências mais perto de você.</p>
            <div className="locator-search-box"><input id="teaser-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar unidade ou endereço" aria-label="Buscar unidade ou endereço" autoComplete="off" /><Search className="search-icon-svg" size={18} aria-hidden="true" /></div>
            <div className="store-cards-list" id="teaser-stores-list-container">
              {visibleUnits.map((unit) => <article
                className={`gold-unit-card ${selectedAddress === unit.address ? 'active' : ''}`}
                key={unit.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedAddress === unit.address}
                aria-label={`Selecionar ${unit.shortName}`}
                onClick={() => setSelectedAddress(unit.address)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedAddress(unit.address);
                  }
                }}
              >
                <div className="unit-card-thumb" onClick={(event) => { event.stopPropagation(); setSelectedAddress(unit.address); lightboxTriggerRef.current = event.currentTarget.closest('.gold-unit-card') as HTMLElement | null; setLightboxIndex(units.findIndex((item) => item.id === unit.id)); }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset(unit.image)} alt={unit.name} /></div>
                <div className="unit-card-info">
                  <div className="unit-card-header"><h4 className="unit-card-title">{unit.shortName}</h4><span className="unit-card-rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {unit.rating}</span></div>
                  <div className="unit-subbrands-inline-row">{unit.subbrands.map((brand, index) => <span key={brand}>{brand}{index < unit.subbrands.length - 1 ? <span className="tag-divider">|</span> : null}</span>)}</div>
                  <p className="unit-card-addr"><MapPin size={14} aria-hidden="true" /> {unit.address}</p>
                  <div className="store-card-footer"><a href={unit.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-unit-ver-mais" onClick={(event) => event.stopPropagation()}>VER NO GOOGLE MAPS <ExternalLink size={13} aria-hidden="true" /></a></div>
                </div>
              </article>)}
              {!visibleUnits.length ? <div className="locator-empty-state" role="status"><p>Nenhuma unidade encontrada.</p><button type="button" className="locator-empty-action" onClick={() => setQuery('')}>Limpar busca</button></div> : null}
            </div>
          </div>
          <div className="store-right-col"><div className="gold-map-wrapper"><iframe id="teaser-google-map-embed" title="Mapa das unidades Supermercados +B" src={mapSrc} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></div>
        </div></div>
      </div>
      <div className={`album-lightbox${lightboxIndex !== null ? ' open' : ''}`} id="album-lightbox" role="dialog" aria-modal="true" aria-label="Galeria das unidades" onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}><button ref={lightboxCloseRef} type="button" className="lightbox-close" id="lightbox-close" aria-label="Fechar galeria" onClick={closeLightbox}><X size={24} /></button><button type="button" className="lightbox-nav prev" id="lightbox-prev" aria-label="Foto anterior" onClick={() => setLightboxIndex((current) => current === null ? null : (current + units.length - 1) % units.length)}><ChevronLeft size={28} aria-hidden="true" /></button><div className="lightbox-content">{lightboxIndex !== null ? <><img id="lightbox-img" src={asset(units[lightboxIndex].image)} alt={units[lightboxIndex].name} /><div id="lightbox-caption" className="lightbox-caption">{units[lightboxIndex].name} — {lightboxIndex + 1} de {units.length}</div></> : null}</div><button type="button" className="lightbox-nav next" id="lightbox-next" aria-label="Próxima foto" onClick={() => setLightboxIndex((current) => current === null ? null : (current + 1) % units.length)}><ChevronRight size={28} aria-hidden="true" /></button></div>
      <div className="footer-minimal-glow-section"><div className="container footer-minimal-container"><div className="footer-minimal-centered-content"><div className="footer-logo-glow-wrapper">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset('Logo Marca Grupo MaisB/Logo Grupo Mais Barato (White Monoegativo).webp')} alt="Grupo Mais Barato" className="footer-minimal-logo" /></div><p className="footer-minimal-slogan">Excelência que conecta negócios e pessoas.</p><div className="footer-minimal-social-row"><a href="https://www.instagram.com/maisbsupermercados" target="_blank" rel="noopener" aria-label="Instagram" className="social-circle-minimal"><InstagramBrandIcon /></a><a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="social-circle-minimal"><FacebookBrandIcon /></a><a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="social-circle-minimal"><LinkedinBrandIcon /></a></div></div><div className="footer-minimal-bottom-bar"><span className="copyright-left">Copyright © 2026 Grupo Mais Barato – All rights reserved</span><div className="legal-center" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><a href="#">Termos & Privacidade</a><span style={{ opacity: 0.35 }}>|</span><Link href="/design" style={{ color: 'var(--color-yellow, #C89223)', fontWeight: 600 }}>Design System</Link></div><div className="dev-right"><span>Desenvolvido por:</span><a href="https://idedigital.com.br" target="_blank" rel="noopener" aria-label="ide digital">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset('01-logoh-pb-white-mono-ide-digital-negativo-png.png')} alt="ide digital" className="idedigital-logo-img" /></a></div></div></div></div>
    </footer>
  );
}
