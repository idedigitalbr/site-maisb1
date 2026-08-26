'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  ['2015', 'Início da história com o Mais Barato Tapanã', 'Início da trajetória do Grupo com a inauguração da primeira loja no Tapanã, levando variedade, preços justos e atendimento próximo para as famílias paraenses.', '/assets/Fotografias/Supermercado +B/01_Fachadas/unid-tapana-foto-de-fachada-frontal-da-loja.webp'],
  ['2016', '+B Farma amplia o cuidado', 'A expansão para a saúde aproxima serviços farmacêuticos das famílias paraenses.', '/assets/Fotografias/Mais B Farma/foto-banner-maisb-farmacia.webp'],
  ['2021', 'Mais Barato Plaza', 'Uma nova unidade amplia a presença do Grupo e as experiências de compra.', '/assets/Fotografias/Supermercado +B/01_Fachadas/unid-plaza-foto-de-fachada-vila-plaza.webp'],
  ['2022', 'Alcindo Cacela', 'A unidade passa a conectar supermercado, gastronomia, farmácia e experiências.', '/assets/Fotografias/Supermercado +B/01_Fachadas/unid-alcindo-foto-de-fachada-da-loja.webp'],
  ['2022', 'Centro de Distribuição', 'Infraestrutura para atender o crescimento com eficiência e proximidade.', '/assets/Fotografias/CENTRO-DISTRIBUICAO.webp'],
  ['2022', 'The Wine Experience', 'A curadoria de rótulos e encontros especiais entra para o ecossistema.', '/assets/Fotografias/The Wine Experience/salao-principal-clientes.webp'],
  ['2023', 'Villa Plaza', 'Gastronomia, convivência e lazer em uma experiência integrada.', '/assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-restaurante-ambiente.webp'],
  ['2023', 'Villa Plaza Park', 'Diversão e experiências para crianças e famílias.', '/assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (1).webp'],
  ['2025', '+B Supermercados', 'A marca se fortalece e amplia o compromisso com Belém.', '/assets/Fotografias/maisb-supermercados-marca-na-parede.webp'],
  ['2026', 'Villa Plaza Park Tapanã', 'Novas experiências de lazer chegam ao Tapanã.', '/assets/Fotografias/Villa Plaza (Park Infantil)/villa-plaza-park-tapana.webp'],
  ['2026', 'Bosque Grão Pará', 'O Grupo segue conectando marcas, pessoas e oportunidades.', '/assets/Fotografias/maisb-grao-para.webp'],
] as const;

export function Timeline() {
  const [active, setActive] = useState(0);
  const event = events[active];
  const change = (next: number) => setActive(Math.max(0, Math.min(events.length - 1, next)));
  return (
    <section className="section light-section trajetoria-section section-full-width" id="linha-tempo">
      <div className="trajetoria-container reveal">
        <div className="trajetoria-content-wrapper">
          <div className="trajetoria-image-column"><div className="trajetoria-image-frame"><img src={event[3]} alt={event[1]} /></div></div>
          <div className="trajetoria-text-column"><span className="eyebrow-gold">TIMELINE</span><h2 className="trajetoria-title">Nossa <em className="serif-accent">Trajetória</em></h2><div className="trajetoria-year-display">{event[0]}</div><div className="trajetoria-divider-line" /><div className="trajetoria-event-details"><h3 className="trajetoria-event-title">{event[1]}</h3><p className="trajetoria-event-desc">{event[2]}</p></div></div>
        </div>
        <div className="trajetoria-nav-timeline">
          <button type="button" className={`trajetoria-arrow-btn trajetoria-prev-btn${active === 0 ? ' is-disabled' : ''}`} onClick={() => change(active - 1)} aria-label="Voltar trajetória" disabled={active === 0}><ChevronLeft size={22} aria-hidden="true" /></button>
          <button type="button" className="trajetoria-arrow-btn trajetoria-next-btn" onClick={() => change(active + 1)} aria-label="Avançar trajetória" disabled={active === events.length - 1}><ChevronRight size={22} aria-hidden="true" /></button>
          <div className="trajetoria-scroll-container"><div className="trajetoria-track-line"><div className="trajetoria-track-progress" style={{ width: `${(active / (events.length - 1)) * 100}%` }} /></div><div className="trajetoria-nodes-row">{events.map((item, index) => <button type="button" key={`${item[0]}-${index}`} className={`trajetoria-node${index === active ? ' active' : ''}`} onClick={() => setActive(index)} aria-label={`${item[0]} - ${item[1]}`} aria-current={index === active ? 'true' : undefined}><span className="trajetoria-node-dot" /><span className="trajetoria-node-year">{item[0]}</span><span className="trajetoria-node-thumb"><img src={item[3]} alt="" /></span></button>)}</div></div>
        </div>
      </div>
    </section>
  );
}
