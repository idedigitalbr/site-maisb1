'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronDown, MapPin, Search } from 'lucide-react';

/* ==========================================================================
   DADOS DAS UNIDADES (Extraídos 1:1 de src/js/unidades.js do Supermercado)
   ========================================================================== */
interface DaySchedule {
  label: string;
  open: string;
  close: string;
  text: string;
}

interface UnitData {
  id: string;
  name: string;
  shortName: string;
  coords: [number, number];
  address: string;
  googleMapsUrl: string;
  rating: number;
  reviewsCount: string;
  subbrands: string[];
  thumbLocal: string;
  thumbOnline: string;
  schedule: Record<number, DaySchedule>;
}

const unitsData: UnitData[] = [
  {
    id: "alcindo",
    name: "+B SUPERMERCADOS (ALCINDO CACELA)",
    shortName: "Alcindo Cacela",
    coords: [-1.4516, -48.4779],
    address: "Av. Alcindo Cacela, 1848",
    googleMapsUrl: "https://maps.app.goo.gl/BUbRXApXKgTSYXKG8",
    rating: 4.8,
    reviewsCount: "1.240",
    subbrands: ["SUPERMERCADOS +B", "THE WINE EXPERIENCE", "+B FARMA"],
    thumbLocal: "/assets/Fotografias/Supermercado +B/00_CardHome/1-foto-supermercado.webp",
    thumbOnline: "https://www.grupomaisbarato.com.br/assets/Fotografias/Supermercado%20+B/00_CardHome/1-foto-supermercado.webp",
    schedule: {
      0: { label: "domingo", open: "07:00", close: "20:00", text: "07:00–20:00" },
      1: { label: "segunda-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      2: { label: "terça-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      3: { label: "quarta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      4: { label: "quinta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      5: { label: "sexta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      6: { label: "sábado", open: "07:00", close: "22:00", text: "07:00–22:00" }
    }
  },
  {
    id: "tapana",
    name: "+B SUPERMERCADOS (TAPANÃ)",
    shortName: "Tapanã",
    coords: [-1.353381, -48.468711],
    address: "Rod. Tapanã, 597",
    googleMapsUrl: "https://maps.app.goo.gl/aKm2MGrDTNMum9nk7",
    rating: 4.5,
    reviewsCount: "850",
    subbrands: ["SUPERMERCADOS +B", "+B FARMA"],
    thumbLocal: "/assets/Fotografias/Supermercado +B/00_CardHome/2-foto-supermercado.webp",
    thumbOnline: "https://www.grupomaisbarato.com.br/assets/Fotografias/Supermercado%20+B/00_CardHome/2-foto-supermercado.webp",
    schedule: {
      0: { label: "domingo", open: "08:00", close: "14:00", text: "08:00–14:00" },
      1: { label: "segunda-feira", open: "07:00", close: "21:00", text: "07:00–21:00" },
      2: { label: "terça-feira", open: "07:00", close: "21:00", text: "07:00–21:00" },
      3: { label: "quarta-feira", open: "07:00", close: "21:00", text: "07:00–21:00" },
      4: { label: "quinta-feira", open: "07:00", close: "21:00", text: "07:00–21:00" },
      5: { label: "sexta-feira", open: "07:00", close: "21:00", text: "07:00–21:00" },
      6: { label: "sábado", open: "07:00", close: "21:00", text: "07:00–21:00" }
    }
  },
  {
    id: "plaza",
    name: "+B SUPERMERCADOS (PLAZA)",
    shortName: "Plaza",
    coords: [-1.448574, -48.473539],
    address: "Av. Gov. José Malcher, 2388",
    googleMapsUrl: "https://maps.app.goo.gl/wHYfn9JPun4pZ28Z8",
    rating: 4.2,
    reviewsCount: "6.740",
    subbrands: ["SUPERMERCADOS +B", "VILLA PLAZA", "VILLA PLAZA PARK", "+B FARMA"],
    thumbLocal: "/assets/Fotografias/Supermercado +B/00_CardHome/3-foto-supermercado.webp",
    thumbOnline: "https://www.grupomaisbarato.com.br/assets/Fotografias/Supermercado%20+B/00_CardHome/3-foto-supermercado.webp",
    schedule: {
      0: { label: "domingo", open: "07:30", close: "21:00", text: "07:30–21:00" },
      1: { label: "segunda-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      2: { label: "terça-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      3: { label: "quarta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      4: { label: "quinta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      5: { label: "sexta-feira", open: "07:00", close: "22:00", text: "07:00–22:00" },
      6: { label: "sábado", open: "07:00", close: "22:00", text: "07:00–22:00" }
    }
  }
];

// Cálculo idêntico ao do site original do supermercado
function getStoreStatus(unit: UnitData) {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySched = unit.schedule[day];
  const [openH, openM] = todaySched.open.split(':').map(Number);
  const [closeH, closeM] = todaySched.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  let isOpen = false;
  let statusText = '';

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    isOpen = true;
    statusText = `Aberto · Fecha ${todaySched.close}`;
  } else if (currentMinutes < openMinutes) {
    isOpen = false;
    statusText = `Fechado · Abre hoje às ${todaySched.open}`;
  } else {
    const nextDay = (day + 1) % 7;
    const tomorrowSched = unit.schedule[nextDay];
    isOpen = false;
    statusText = `Fechado · Abre amanhã às ${tomorrowSched.open}`;
  }

  return { isOpen, statusText, day };
}

export default function VerMapinhaPage() {
  const [query, setQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [openHours, setOpenHours] = useState<Record<string, boolean>>({});

  const filteredUnits = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return unitsData;
    return unitsData.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q) ||
        u.subbrands.some(sb => sb.toLowerCase().includes(q))
    );
  }, [query]);

  const selectedUnit = selectedUnitId ? unitsData.find(u => u.id === selectedUnitId) || null : null;

  const mapSrc = selectedUnit
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        `${selectedUnit.name} ${selectedUnit.address}, Belém - PA`
      )}&output=embed`
    : 'https://www.google.com/maps?q=Supermercados+Mais+B+Bel%C3%A9m+PA&output=embed';

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(prev => (prev === unitId ? null : unitId));
    const cardEl = document.getElementById(`card-${unitId}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const toggleHours = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenHours(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  // Ordem de dias no painel do supermercado: Segunda a Domingo
  const daysOrder = [1, 2, 3, 4, 5, 6, 0];

  return (
    <>
      <div className="preview-top-bar">
        <Link href="/" className="back-link">
          <ArrowLeft size={14} /> Voltar ao site
        </Link>
        <span className="badge-preview">PRÉVIA ISOLADA — 1:1 SUPERMERCADOS +B</span>
      </div>

      <section className="s-unidades" id="unidades">
        <div className="vmap-container">
          <div className="unid-header">
            <span className="eyebrow-gold">NOSSAS UNIDADES</span>
            <h2 className="locator-gold-title">
              Encontre <span className="headline-highlight-italic">nossas unidades</span>
            </h2>
            <p className="locator-gold-desc">Lojas, serviços e experiências mais perto de você.</p>
          </div>
          <div className="unid-layout">
            <div className="unid-sidebar">
              <div className="search-box">
                <input
                  type="text"
                  id="unit-search"
                  placeholder="Buscar unidade ou endereço"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <Search size={16} className="search-icon" aria-hidden="true" />
              </div>
              <div className="units-list" id="units-list-container">
                {filteredUnits.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', padding: '10px' }}>
                    Nenhuma unidade encontrada.
                  </p>
                ) : (
                  filteredUnits.map(unit => {
                    const status = getStoreStatus(unit);
                    const isActive = selectedUnitId === unit.id;
                    const isOpenDropdown = !!openHours[unit.id];

                    return (
                      <div
                        key={unit.id}
                        className={`unit-card ${isActive ? 'active' : ''}`}
                        id={`card-${unit.id}`}
                        onClick={() => handleSelectUnit(unit.id)}
                      >
                        <div className="unit-card-thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={unit.thumbLocal}
                            alt={unit.name}
                            onError={e => {
                              const t = e.target as HTMLImageElement;
                              if (t.src !== unit.thumbOnline) t.src = unit.thumbOnline;
                            }}
                          />
                        </div>
                        <div className="unit-card-info">
                          <div className="unit-card-title">
                            <h3>{unit.name}</h3>
                            <span className="unit-rating" title={`${unit.reviewsCount} avaliações no Google`}>
                              ★ {unit.rating.toString().replace('.', ',')}{' '}
                              <span className="unit-reviews-count">({unit.reviewsCount})</span>
                            </span>
                          </div>
                          <div className="unit-tags">{unit.subbrands.join(' | ')}</div>
                          <p className="unit-address">
                            <MapPin size={13} aria-hidden="true" /> {unit.address}
                          </p>

                          <div className={`unit-hours ${isOpenDropdown ? 'is-open' : ''}`} id={`hours-dropdown-${unit.id}`}>
                            <div
                              className="unit-hours-trigger"
                              onClick={e => toggleHours(unit.id, e)}
                            >
                              <Clock size={13} aria-hidden="true" />
                              <span className="hours-status">{status.statusText}</span>
                              <ChevronDown size={12} className="hours-chevron" aria-hidden="true" />
                            </div>
                            <div className="unit-hours-panel">
                              <div className="schedule-grid">
                                {daysOrder.map(d => {
                                  const item = unit.schedule[d];
                                  const isToday = status.day === d;
                                  return (
                                    <div key={d} className={`schedule-row ${isToday ? 'is-today' : ''}`}>
                                      <span className="sched-day">{item.label}</span>
                                      <span className="sched-time">{item.text}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <a
                            href={unit.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-maps"
                            onClick={e => e.stopPropagation()}
                          >
                            VER NO GOOGLE MAPS
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="unid-map">
              <iframe
                id="google-map-embed"
                title="Mapa das unidades Supermercados +B"
                src={mapSrc}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          CSS 1:1 EXTRAÍDO DE main.css DO PROJETO SUPERMERCADOS +B
          ========================================================================== */}
      <style jsx global>{`
        :root {
          --gold: #DDA712;
          --gold-hover: #c49310;
          --gold-light: #F4C542;
          --dark: #0D0D0E;
          --dark-card: #161618;
          --dark-border: #2a2a2e;
          --black: #000;
          --font-sans: 'DM Sans', system-ui, sans-serif;
          --r-sm: 10px;
          --r-md: 16px;
          --r-lg: 24px;
          --r-full: 9999px;
          --ease: .3s ease;
        }

        .preview-top-bar {
          background: #000;
          border-bottom: 1px solid #222;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-sans);
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #aaa;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #fff;
        }

        .badge-preview {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--gold);
        }

        .s-unidades {
          background: var(--dark);
          color: #fff;
          padding: 60px 0 88px;
          font-family: var(--font-sans);
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .vmap-container {
          width: 100%;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 32px;
          padding-right: 32px;
          box-sizing: border-box;
        }

        .unid-header {
          margin-bottom: 36px;
        }

        .eyebrow-gold {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #c59b27;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .locator-gold-title {
          font-family: var(--font-primary, 'DM Sans', -apple-system, sans-serif);
          font-size: clamp(1.8rem, 2.5vw, 2.4rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          color: #ffffff;
        }

        .locator-gold-title .headline-highlight-italic {
          font-family: var(--font-editorial, 'DM Serif Display', 'Playfair Display', Georgia, serif);
          font-weight: 400;
          font-style: italic;
          color: #d8a72b;
          margin-left: 6px;
          display: inline-block;
        }

        .locator-gold-desc {
          font-family: var(--font-primary, 'DM Sans', -apple-system, sans-serif);
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.5;
        }

        .unid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
          gap: 28px;
          align-items: stretch;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .unid-sidebar {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .search-box {
          position: relative;
          margin-bottom: 18px;
          width: 100%;
          box-sizing: border-box;
        }

        .search-box input {
          width: 100%;
          padding: 13px 42px 13px 16px;
          background: #18181c;
          border: 1px solid #333;
          border-radius: var(--r-md);
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          box-sizing: border-box;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--gold);
        }

        .search-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gold);
          pointer-events: none;
        }

        .units-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 480px;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 4px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .units-list::-webkit-scrollbar {
          width: 5px;
        }

        .units-list::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        .unit-card {
          background: #161619;
          border: 1.5px solid var(--dark-border);
          border-radius: var(--r-md);
          padding: 14px;
          display: flex;
          gap: 14px;
          align-items: center;
          cursor: pointer;
          transition: all var(--ease);
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .unit-card:hover,
        .unit-card.active {
          border-color: var(--gold);
          background: #1c1c20;
        }

        .unit-card-thumb {
          width: 90px;
          height: 80px;
          border-radius: var(--r-sm);
          overflow: hidden;
          flex-shrink: 0;
        }

        .unit-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .unit-card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          justify-content: center;
          min-width: 0;
          overflow: hidden;
        }

        .unit-card-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          margin: 0;
          width: 100%;
          min-width: 0;
        }

        .unit-card-title h3 {
          font-size: 0.8rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }

        .unit-rating {
          font-size: 0.78rem;
          color: var(--gold);
          font-weight: 700;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .unit-rating .unit-reviews-count {
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 400;
        }

        .unit-tags {
          font-size: 0.65rem;
          color: var(--gold);
          font-weight: 700;
          letter-spacing: 0.3px;
          margin: 0 0 2px;
          line-height: 1.3;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .unit-card .unit-address {
          font-size: 0.76rem;
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 0 0 2px !important;
          line-height: 1.3;
          white-space: normal;
          word-break: break-word;
        }

        .unit-card .unit-address svg {
          color: var(--gold);
          stroke: var(--gold);
          flex: 0 0 auto;
        }

        /* Linha de Horários Minimalista — Próxima e Alinhada com o Endereço */
        .unit-card .unit-hours {
          margin: 0 0 3px !important;
          line-height: 1.3;
        }

        .unit-hours-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          font-size: 0.76rem;
          color: #aaa;
          transition: color var(--ease);
          user-select: none;
          padding: 0;
          margin: 0;
          line-height: 1.3;
        }

        .unit-hours-trigger:hover {
          color: #fff;
        }

        .unit-hours-trigger svg {
          color: var(--gold);
          stroke: var(--gold);
          flex: 0 0 auto;
        }

        .unit-hours-trigger .hours-status {
          font-size: 0.76rem;
          font-weight: 400;
          color: inherit;
          line-height: 1.3;
        }

        .unit-hours-trigger .hours-chevron {
          color: #777;
          stroke: #777;
          transition: transform 0.25s ease, stroke 0.2s ease;
          flex: 0 0 auto;
          margin-left: 1px;
        }

        .unit-hours.is-open .unit-hours-trigger {
          color: #fff;
        }

        .unit-hours.is-open .hours-chevron {
          transform: rotate(180deg);
          stroke: var(--gold);
          color: var(--gold);
        }

        .unit-hours-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, margin 0.2s ease;
          margin-top: 0;
          padding-left: 18px;
        }

        .unit-hours.is-open .unit-hours-panel {
          max-height: 200px;
          opacity: 1;
          margin-top: 4px;
          margin-bottom: 4px;
        }

        .schedule-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(255, 255, 255, 0.03);
          border-left: 1.5px solid rgba(221, 167, 18, 0.4);
          padding: 4px 8px;
          border-radius: 0 6px 6px 0;
        }

        .schedule-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 0.68rem;
          color: #888;
          padding: 1px 0;
        }

        .schedule-row.is-today {
          color: #fff;
          font-weight: 700;
        }

        .schedule-row.is-today .sched-day::after {
          content: " • hoje";
          font-size: 0.62rem;
          color: var(--gold);
          font-weight: 700;
        }

        .btn-maps {
          align-self: flex-start;
          font-size: 0.68rem;
          font-weight: 800;
          border: 1px solid #555;
          padding: 3px 10px;
          border-radius: var(--r-full);
          margin-top: 2px;
          color: #fff;
          transition: all var(--ease);
          text-decoration: none;
          display: inline-block;
        }

        .btn-maps:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .unid-map {
          border-radius: var(--r-lg);
          overflow: hidden;
          min-height: 480px;
          border: 1px solid var(--dark-border);
        }

        .unid-map iframe {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 480px;
          border: 0;
        }

        /* ──────────────────────────────────────────────
           RESPONSIVIDADE MASTER (MOBILE-FIRST POLISH)
           ────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .vmap-container {
            padding-left: 20px;
            padding-right: 20px;
          }
          .unid-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 24px;
            width: 100%;
          }
          .unid-map {
            min-height: 380px;
            height: 380px;
            width: 100%;
          }
          .unid-map iframe {
            min-height: 380px;
            height: 380px;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .s-unidades {
            padding: 40px 0 54px;
          }
          .vmap-container {
            padding-left: 16px;
            padding-right: 16px;
          }
          .unid-header {
            margin-bottom: 20px;
          }
          .locator-gold-title {
            font-size: 1.65rem;
            line-height: 1.2;
          }
          .locator-gold-desc {
            font-size: 0.85rem;
          }
          .units-list {
            max-height: 440px;
            gap: 12px;
          }
          .unit-card {
            padding: 12px;
            gap: 12px;
            border-radius: 14px;
          }
          .unit-card-thumb {
            width: 78px;
            height: 72px;
            border-radius: 8px;
          }
          .unit-card-title h3 {
            font-size: 0.76rem;
          }
          .unit-rating {
            font-size: 0.72rem;
          }
          .unid-map {
            min-height: 320px;
            height: 320px;
            border-radius: 16px;
            margin-top: 8px;
          }
          .unid-map iframe {
            min-height: 320px;
            height: 320px;
          }
        }

        @media (max-width: 480px) {
          .preview-top-bar {
            padding: 8px 12px;
            font-size: 0.65rem;
          }
          .badge-preview {
            font-size: 0.62rem;
          }
          .vmap-container {
            padding-left: 14px;
            padding-right: 14px;
          }
          .s-unidades {
            padding: 28px 0 44px;
          }
          .locator-gold-title {
            font-size: 1.45rem;
          }
          .locator-gold-title .headline-highlight-italic {
            margin-left: 2px;
          }
          .search-box input {
            padding: 11px 36px 11px 12px;
            font-size: 0.82rem;
          }
          .unit-card {
            padding: 10px;
            gap: 10px;
            border-radius: 12px;
          }
          .unit-card-thumb {
            width: 70px;
            height: 66px;
            border-radius: 6px;
          }
          .unit-card-title h3 {
            font-size: 0.72rem;
          }
          .unit-tags {
            font-size: 0.56rem;
            line-height: 1.25;
          }
          .unit-card .unit-address {
            font-size: 0.7rem;
          }
          .unit-hours-trigger {
            font-size: 0.7rem;
          }
          .unit-hours-panel {
            padding-left: 10px;
          }
          .schedule-grid {
            padding: 4px 6px;
          }
          .schedule-row {
            font-size: 0.62rem;
            gap: 6px;
          }
          .btn-maps {
            font-size: 0.62rem;
            padding: 3px 8px;
          }
          .unid-map {
            min-height: 290px;
            height: 290px;
            border-radius: 14px;
          }
          .unid-map iframe {
            min-height: 290px;
            height: 290px;
          }
        }
      `}</style>
    </>
  );
}
