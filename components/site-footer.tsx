'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Camera, ChevronLeft, ChevronRight, ExternalLink, MapPin, Search, Star, Users, X } from 'lucide-react';
import { storeUnits } from '../lib/locations';

const asset = (path: string) => `/assets/${path}`;

const units = storeUnits;

export function SiteFooter() {
  const [query, setQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const visibleUnits = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return units;
    return units.filter((unit) => `${unit.name} ${unit.address} ${unit.subbrands.join(' ')}`.toLowerCase().includes(normalized));
  }, [query]);

  const selectedUnit = units.find((unit) => unit.address === selectedAddress);
  const mapSrc = selectedUnit ? `https://www.google.com/maps?q=${encodeURIComponent(`${selectedUnit.name} ${selectedUnit.address} Belém PA`)}&output=embed` : 'https://www.google.com/maps?q=Supermercados+Mais+B+Bel%C3%A9m+PA&output=embed';
  const onFooterMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

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
              {visibleUnits.map((unit) => <article className={`gold-unit-card ${selectedAddress === unit.address ? 'active' : ''}`} key={unit.id}>
                <button type="button" className="unit-card-select" aria-pressed={selectedAddress === unit.address} aria-label={`Selecionar ${unit.shortName}`} onClick={() => setSelectedAddress(unit.address)}>
                  <div className="unit-card-thumb" onClick={(event) => { event.stopPropagation(); setSelectedAddress(unit.address); lightboxTriggerRef.current = event.currentTarget.closest('button') as HTMLButtonElement | null; setLightboxIndex(units.findIndex((item) => item.id === unit.id)); }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset(unit.image)} alt={unit.name} /></div>
                  <div className="unit-card-info"><div className="unit-card-header"><h4 className="unit-card-title">{unit.name}</h4><span className="unit-card-rating"><Star size={13} fill="currentColor" aria-hidden="true" /> {unit.rating}</span></div><div className="unit-subbrands-inline-row">{unit.subbrands.join('  |  ')}</div><p className="unit-card-addr"><MapPin size={14} aria-hidden="true" /> {unit.address}</p></div>
                </button>
                <div className="store-card-footer"><a href={unit.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-unit-ver-mais">VER NO GOOGLE MAPS <ExternalLink size={13} aria-hidden="true" /></a></div>
              </article>)}
              {!visibleUnits.length ? <div className="locator-empty-state" role="status"><p>Nenhuma unidade encontrada.</p><button type="button" className="locator-empty-action" onClick={() => setQuery('')}>Limpar busca</button></div> : null}
            </div>
          </div>
          <div className="store-right-col"><div className="gold-map-wrapper"><iframe id="teaser-google-map-embed" title="Mapa das unidades Supermercados +B" src={mapSrc} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></div>
        </div></div>
      </div>
      <div className={`album-lightbox${lightboxIndex !== null ? ' open' : ''}`} id="album-lightbox" role="dialog" aria-modal="true" aria-label="Galeria das unidades" onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}><button ref={lightboxCloseRef} type="button" className="lightbox-close" id="lightbox-close" aria-label="Fechar galeria" onClick={closeLightbox}><X size={24} /></button><button type="button" className="lightbox-nav prev" id="lightbox-prev" aria-label="Foto anterior" onClick={() => setLightboxIndex((current) => current === null ? null : (current + units.length - 1) % units.length)}><ChevronLeft size={28} aria-hidden="true" /></button><div className="lightbox-content">{lightboxIndex !== null ? <><img id="lightbox-img" src={asset(units[lightboxIndex].image)} alt={units[lightboxIndex].name} /><div id="lightbox-caption" className="lightbox-caption">{units[lightboxIndex].name} — {lightboxIndex + 1} de {units.length}</div></> : null}</div><button type="button" className="lightbox-nav next" id="lightbox-next" aria-label="Próxima foto" onClick={() => setLightboxIndex((current) => current === null ? null : (current + 1) % units.length)}><ChevronRight size={28} aria-hidden="true" /></button></div>
      <div className="footer-minimal-glow-section"><div className="container footer-minimal-container"><div className="footer-minimal-centered-content"><div className="footer-logo-glow-wrapper">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset('Logo Marca Grupo MaisB/Logo Grupo Mais Barato (White Monoegativo).webp')} alt="Grupo Mais Barato" className="footer-minimal-logo" /></div><p className="footer-minimal-slogan">Excelência que conecta negócios e pessoas.</p><div className="footer-minimal-social-row"><a href="https://www.instagram.com/maisbsupermercados" target="_blank" rel="noopener" aria-label="Instagram" className="social-circle-minimal"><Camera size={17} /></a><a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="social-circle-minimal"><Users size={17} /></a><a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" className="social-circle-minimal"><Badge size={17} /></a></div></div><div className="footer-minimal-bottom-bar"><span className="copyright-left">Copyright © 2026 Grupo Mais Barato – All rights reserved</span><a href="#" className="legal-center">Termos & Privacidade</a><div className="dev-right"><span>Desenvolvido por:</span><a href="https://idedigital.com.br" target="_blank" rel="noopener">ide digital</a></div></div></div></div>
    </footer>
  );
}
