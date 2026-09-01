'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Eye, HeartPulse, Leaf, MapPin, Maximize2, Minimize2, PartyPopper, ShoppingCart, Target, Utensils, Volume2, VolumeX, Wine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaqSection } from './home/faq-section';
import { OpportunitiesSection } from './home/opportunities-section';

const asset = (path: string) => `/assets/${path}`;

export function HomeHero() {
  return <section className="hero-carousel-section section-dark" id="home"><div className="carousel-slides-wrapper"><div className="carousel-slide active"><video className="hero-bg-video" autoPlay muted loop playsInline poster={asset('Videos/video-b-home-poster.webp')}><source src={asset('Videos/Supermercado Mais B - Institucional.mp4')} type="video/mp4" /></video><div className="slide-overlay" /><div className="container slide-container"><div className="slide-content"><span className="slide-eyebrow">BEM-VINDO</span><h1 className="slide-headline-huge">Somos o<br /><span className="slide-headline-nowrap">Grupo <span className="headline-highlight">Mais Barato</span></span></h1><p className="slide-lead">Grandes marcas e experiências que fazem parte do dia a dia dos paraenses.</p><div className="slide-actions"><Link href="/sobre-nos" className="btn-hero-cta">CONHEÇA O GRUPO <ArrowRight size={16} aria-hidden="true" /></Link></div></div></div></div></div></section>;
}

export function InstitutionalVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    const onFullscreenChange = () => setFullscreen(document.fullscreenElement === sectionRef.current);
    video.addEventListener('timeupdate', onTimeUpdate);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const section = sectionRef.current;
    if (!section) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void section.requestFullscreen?.();
  };

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    video.currentTime = ((event.clientX - rect.left) / rect.width) * video.duration;
  };

  return <section className="video-hero-section wf-section" ref={sectionRef}>
    <video id="inst-video" ref={videoRef} autoPlay loop muted playsInline poster={asset('Videos/video-b-home-poster.webp')}>
      <source src={asset('Videos/Supermercado Mais B - Institucional.mp4')} type="video/mp4" />
    </video>
    <div className="video-overlay" />
    <div className="video-hero-content visually-hidden"><span className="slide-eyebrow">SOBRE O GRUPO</span><h1>Grupo Mais Barato</h1></div>
    <div className="video-hero-controls" aria-label="Controles do vídeo institucional">
      <div className="video-progress-container" id="video-progress-container" onClick={seek} role="slider" aria-label="Progresso do vídeo" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} tabIndex={0}>
        <div className="video-progress-track"><div className="video-progress-bar" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="video-controls-right">
        <button id="video-mute-toggle" type="button" className="video-mute-btn" onClick={toggleMute} aria-label={muted ? 'Desmutar vídeo' : 'Mutar vídeo'}>{muted ? <VolumeX size={22} aria-hidden="true" /> : <Volume2 size={22} aria-hidden="true" />}</button>
        <button id="video-fullscreen-toggle" type="button" className="video-fullscreen-btn" onClick={toggleFullscreen} aria-label="Alternar tela cheia">{fullscreen ? <Minimize2 size={22} aria-hidden="true" /> : <Maximize2 size={22} aria-hidden="true" />}</button>
      </div>
    </div>
  </section>;
}

export function AboutSection() {
  const stats = [['2015', 'Início da nossa história'], ['+10 mil m²', 'De área operacional'], ['3', 'Lojas bem localizadas em Belém'], ['5', 'Marcas que inspiram confiança']];
  return <section className="section section-light about-premium-section section-full-width" id="sobre"><div className="container about-container"><div className="about-main-grid"><div className="about-content-col"><span className="eyebrow-gold">SOBRE O GRUPO</span><h2 className="about-headline">O <span className="headline-highlight-italic">Grupo Mais Barato</span><br />reúne negócios que<br />fazem parte do dia a dia<br />das pessoas de <span style={{ whiteSpace: 'nowrap' }}>Belém–PA</span></h2><div className="about-paragraphs"><p className="about-mid-text">Conectando varejo, gastronomia, saúde, bem-estar e serviços com qualidade, inovação e proximidade.</p><p>Nossa atuação integra marcas que compartilham o mesmo compromisso: oferecer experiências que superem expectativas, sempre com foco nas pessoas, na excelência e no desenvolvimento das comunidades onde estamos presentes. Mais do que crescer, acreditamos em transformar relações, gerar oportunidades e construir um futuro cada vez melhor para clientes, colaboradores, parceiros e para a sociedade.</p></div><div className="gold-accent-line" /></div><div className="about-photo-col"><div className="about-photo-wrapper">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={asset('Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png')} alt="Equipe e Fachada Grupo Mais Barato" className="about-team-photo" loading="lazy" /></div></div></div><div className="about-stats-row">{stats.map(([number, description], index) => <span key={number} className="stat-group"><div className="stat-item"><strong className="stat-number">{number}</strong><span className="stat-desc">{description}</span></div>{index < 3 ? <span className="stat-divider" /> : null}</span>)}</div></div></section>;
}

export function AboutInstitutional() {
  const metrics = [
    ['2015', 'Início da nossa história'],
    ['+10 mil m²', 'De área operacional'],
    ['3', 'Lojas bem localizadas em Belém'],
    ['5', 'Marcas que inspiram confiança'],
  ];

  const onAboutMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section className="section about-premium-dark-section" id="sobre" onMouseMove={onAboutMouseMove}>
      <div className="about-bg-glow glow-dark-top-right" aria-hidden="true" />
      <div className="about-bg-glow glow-dark-center-photo" aria-hidden="true" />
      <div className="about-bg-glow glow-dark-bottom-left" aria-hidden="true" />
      <div className="about-dotted-pattern" aria-hidden="true" />
      <div className="about-mouse-spotlight" aria-hidden="true" />

      <div className="container about-container">
        <div className="about-main-grid">
          <div className="about-content-col reveal">
            <span className="eyebrow-gold">SOBRE O GRUPO</span>
            <h2 className="about-headline">
              O <span className="headline-highlight-italic">Grupo Mais Barato</span><br />
              reúne negócios que<br />
              fazem parte do dia a dia<br />
              das pessoas de <span style={{ whiteSpace: 'nowrap' }}>Belém–PA</span>
            </h2>
            <div className="about-paragraphs">
              <p className="about-mid-text">Conectando varejo, gastronomia, saúde, bem-estar e serviços com qualidade, inovação e proximidade.</p>
              <p>Nossa atuação integra marcas que compartilham o mesmo compromisso: oferecer experiências que superem expectativas, sempre com foco nas pessoas, na excelência e no desenvolvimento das comunidades onde estamos presentes. Mais do que crescer, acreditamos em transformar relações, gerar oportunidades e construir um futuro cada vez melhor para clientes, colaboradores, parceiros e para a sociedade.</p>
            </div>
            <div className="gold-accent-line" />
          </div>

          <div className="about-photo-col reveal delay-1">
            <div className="about-photo-wrapper">
              <img
                src={asset('Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png')}
                alt="Equipe e Fachada Grupo Mais Barato"
                className="about-team-photo"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="about-metrics-grid reveal">
          {metrics.map(([number, description]) => (
            <div className="metric-card" key={number}>
              <div className="metric-content">
                <div className="metric-number-title">
                  <span className="num-gold">{number}</span>
                </div>
                <p className="metric-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-culture-block reveal delay-1">
          <div className="about-culture-header">
            <span className="eyebrow-gold">CULTURA</span>
            <h3 className="about-culture-title">
              Missão e <span className="headline-highlight-italic">Visão</span>
            </h3>
            <div className="culture-title-accent" />
          </div>
          <div className="about-culture-grid">
            <div className="culture-card culture-card-missao">
              <div className="culture-card-icon-badge">
                <Target size={24} aria-hidden="true" />
              </div>
              <div className="culture-card-divider" />
              <div className="culture-card-body">
                <h4 className="culture-card-title">Missão</h4>
                <p className="culture-card-text">
                  Participar do dia a dia de nossos clientes, oferecendo produtos e serviços de qualidade comprovada a preços competitivos.
                </p>
              </div>
            </div>
            <div className="culture-card culture-card-visao">
              <div className="culture-card-icon-badge">
                <Eye size={24} aria-hidden="true" />
              </div>
              <div className="culture-card-divider" />
              <div className="culture-card-body">
                <h4 className="culture-card-title">Visão</h4>
                <p className="culture-card-text">
                  Ser reconhecido pelo mercado como uma empresa referência em qualidade, preços competitivos e serviços de excelência na região norte do país.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const brandData = [
  { id: 'wine', theme: 'wine', logo: 'icon-the-winee.png', watermark: Wine, serifTitle: true, title: <>THE WINE<br /><span className="card-brand-subtitle">Xperience</span></>, keywords: 'RÓTULOS • EXPERIÊNCIA • SOFISTICAÇÃO', description: 'Experiência voltada ao universo dos vinhos, com curadoria de rótulos e momentos para apreciar bons encontros.', images: ['The Wine Experience/parede-vinhos-decoracao.webp', 'The Wine Experience/salao-principal-clientes.webp', 'The Wine Experience/mesa-reservada-adega.webp', 'The Wine Experience/jantar-harmonizado-brinde.webp'] },
  { id: 'super', theme: 'super', logo: 'icon-b-supermercadoo.png', watermark: ShoppingCart, title: <>+B Supermercados</>, keywords: 'VARIEDADE • ECONOMIA • CONVENIÊNCIA', description: 'Rede de supermercados com mix completo de alimentos e ofertas para a rotina das famílias.', images: ['Supermercado +B/00_CardHome/1-foto-supermercado.webp', 'Supermercado +B/00_CardHome/2-foto-supermercado.webp', 'Supermercado +B/00_CardHome/3-foto-supermercado.webp', 'Supermercado +B/00_CardHome/4-supemercado.webp'] },
  { id: 'farma', theme: 'farma', logo: 'icon-b-farmaa.png', watermark: HeartPulse, title: <>+B Farma</>, keywords: 'SAÚDE • BELEZA • CONVENIÊNCIA', description: 'Drogarias integradas oferecendo amplo estoque de medicamentos, cuidados para a pele, cosméticos e atendimento humanizado.', images: ['Mais B Farma/foto-farma-b (1).webp', 'Mais B Farma/foto-farma-b (2).webp', 'Mais B Farma/foto-farma-b (3).webp', 'Mais B Farma/foto-farma-b (4).webp'] },
  { id: 'park', theme: 'park', logo: 'icon-vila-plaza.png', watermark: PartyPopper, title: <>Villa Plaza Park</>, keywords: 'DIVERSÃO • FAMÍLIA • LAZER', description: 'Maior Parque infantil de Belém, pensado para crianças e famílias, com atrações, segurança e muita diversão para os pequenos.', images: ['Villa Plaza (Park Infantil)/foto-park-infantil (1).webp', 'Villa Plaza (Park Infantil)/foto-park-infantil (2).webp', 'Villa Plaza (Park Infantil)/foto-park-infantil (3).webp', 'Villa Plaza (Park Infantil)/foto-park-infantil (4).webp'] },
  { id: 'plaza', theme: 'plaza', logo: 'icon-vila-plaza.png', watermark: Utensils, serifTitle: true, title: <>Villa Plaza Restaurante</>, keywords: 'SABOR · ENCONTROS · EXPERIÊNCIA', description: 'Ambiente acolhedor e cardápio pensado para momentos especiais, encontros e boa gastronomia.', images: ['Villa Plaza (Restaurante)/vila-plaza-restaurante-ambiente.webp', 'Villa Plaza (Restaurante)/vila-plaza-gastronomia_buffet_pratos_quentes.webp', 'Villa Plaza (Restaurante)/vila-plaza-gastronomia_buffet_saladas_selecao.webp', 'Villa Plaza (Restaurante)/vila-plaza-experiencia_servico_garcom.webp'] },
];

const orbitOrder = ['plaza', 'super', 'wine', 'park', 'farma'];

function BrandOrbit({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return <div className="brands-orbit-box" id="brands-orbit-box">
    <svg className="brands-orbit-svg" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" id="brands-orbit-svg" aria-hidden="true">
      <circle cx="250" cy="250" r="200" className="network-orbit-line" />
      <circle cx="250" cy="250" r="120" className="network-orbit-line orbit-inner" />
      <line id="line-active-bridge" x1="250" y1="250" x2="450" y2="250" className="split-connect-line active-bridge" />
      {orbitOrder.map((id) => <line key={id} id={'line-' + id} x1="250" y1="250" x2="450" y2="250" className={'split-connect-line to-' + id} />)}
      <circle id="hub-progress-arc" cx="250" cy="250" r="74" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="465" strokeDashoffset="465" transform="rotate(-90 250 250)" />
    </svg>
    <button type="button" className="brands-hub-center" id="brands-hub-center" title="Voltar ao início da rotação" onClick={() => onSelect('plaza')}>
      <img className="hub-logo-white" src={asset('Logo Marca Grupo MaisB/Logo Grupo Mais Barato (White Monoegativo).webp')} alt="Logo Grupo Mais Barato" />
    </button>
    {orbitOrder.map((id) => {
      const brand = brandData.find((item) => item.id === id);
      if (!brand) return null;
      const label = id === 'super' ? 'Supermercados +B' : id === 'wine' ? 'The Wine' : id === 'farma' ? '+B Farma' : id === 'park' ? 'Villa Plaza Park' : 'Villa Plaza';
      return <button type="button" key={id} className={'network-node split-node carousel-node node-' + id + (id === active ? ' active' : '')} data-brand={id} role="button" aria-label={'Ver ' + label} onClick={() => onSelect(id)}>
        <span className="node-logo-wrapper"><img src={asset('Icones Submarcas/' + brand.logo)} alt={'Logo ' + label} /></span>
        <span className="node-label">{label}</span>
      </button>;
    })}
  </div>;
}

export function BrandsSection() {
  const [active, setActive] = useState('plaza');
  const touchStartX = useRef<number | null>(null);
  const onBrandsMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };
  const activeIndex = brandData.findIndex((brand) => brand.id === active);
  const selectBrand = (id: string, updateHash = true) => {
    setActive(id);
    if (updateHash && typeof window !== 'undefined') window.history.replaceState(null, '', '#marca-' + id);
  };
  const selectRelative = (offset: number) => selectBrand(brandData[(activeIndex + offset + brandData.length) % brandData.length].id);

  useEffect(() => {
    const fromHash = window.location.hash.match(/^#marca-(super|farma|plaza|park|wine)$/)?.[1];
    if (fromHash) {
      setActive(fromHash);
      window.requestAnimationFrame(() => document.getElementById('marcas')?.scrollIntoView({ block: 'start' }));
    }
    const onHashChange = () => {
      const next = window.location.hash.match(/^#marca-(super|farma|plaza|park|wine)$/)?.[1];
      if (next) setActive(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const orbit = document.getElementById('brands-orbit-box');
    const stage = document.querySelector('.brands-carousel-stage');
    if (!orbit) return;
    const nodes = Array.from(orbit.querySelectorAll<HTMLElement>('.carousel-node'));
    const arc = document.getElementById('hub-progress-arc');
    const bridge = document.getElementById('line-active-bridge');
    const activeCard = document.querySelector<HTMLElement>('.brand-detail-card.active');
    const logo = activeCard?.querySelector<HTMLElement>('.card-logo-overlap');
    const radius = (orbit.offsetWidth || 500) * 0.4;
    const activeIndex = orbitOrder.indexOf(active);

    nodes.forEach((node) => {
      const id = node.dataset.brand || '';
      const brandIndex = orbitOrder.indexOf(id);
      const relativeIndex = (activeIndex - brandIndex + orbitOrder.length) % orbitOrder.length;
      const angle = relativeIndex * (360 / orbitOrder.length);
      node.style.left = '50%';
      node.style.top = '50%';
      node.style.display = 'flex';
      node.style.opacity = id === active ? '0' : '1';
      node.style.pointerEvents = id === active ? 'none' : 'auto';
      node.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg) translate(' + radius + 'px) rotate(' + (-angle) + 'deg)';
      const wrapper = node.querySelector<HTMLElement>('.node-logo-wrapper');
      if (wrapper) wrapper.style.transform = id === active ? 'scale(0.4)' : 'scale(0.4)';
      const label = node.querySelector<HTMLElement>('.node-label');
      if (label) label.style.opacity = '0';
    });

    if (bridge && logo) {
      const orbitRect = orbit.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const dx = logoRect.left + logoRect.width / 2 - (orbitRect.left + orbitRect.width / 2);
      const dy = logoRect.top + logoRect.height / 2 - (orbitRect.top + orbitRect.height / 2);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const distance = Math.sqrt(dx * dx + dy * dy);
      bridge.style.stroke = '#C89223';
      bridge.style.strokeWidth = '2px';
      bridge.style.opacity = '1';
      bridge.style.transform = 'rotate(' + angle + 'deg) scaleX(' + ((distance / orbitRect.width) * 500 / 200) + ')';
    }

    orbitOrder.forEach((id, index) => {
      const line = document.getElementById('line-' + id);
      if (!line) return;
      const angle = ((activeIndex - index + orbitOrder.length) % orbitOrder.length) * (360 / orbitOrder.length);
      line.style.stroke = '#C89223';
      line.style.opacity = id === active ? '0' : '0.65';
      line.style.transform = 'rotate(' + angle + 'deg)';
    });

    let paused = false;
    let startedAt = performance.now();
    let raf = 0;
    const duration = 9000;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; startedAt = performance.now() - Math.min(performance.now() - startedAt, duration); };
    stage?.addEventListener('mouseenter', pause);
    stage?.addEventListener('mouseleave', resume);
    const tick = (now: number) => {
      const elapsed = paused ? Math.min(now - startedAt, duration) : now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      if (arc) arc.style.strokeDashoffset = String(465 * (1 - progress));
      nodes.forEach((node) => {
        if (node.dataset.brand === active) return;
        const wrapper = node.querySelector<HTMLElement>('.node-logo-wrapper');
        const label = node.querySelector<HTMLElement>('.node-label');
        if (wrapper) wrapper.style.transform = 'scale(' + (0.4 + progress * 0.45) + ')';
        if (label) label.style.opacity = progress <= 0.12 ? '0' : '1';
      });
      if (!paused && progress >= 1) {
        setActive(orbitOrder[(activeIndex + 1) % orbitOrder.length]);
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      stage?.removeEventListener('mouseenter', pause);
      stage?.removeEventListener('mouseleave', resume);
    };
  }, [active]);

  const onStageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); selectRelative(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); selectRelative(1); }
  };
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    if (Math.abs(distance) > 45) selectRelative(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const openBrandLocation = (event: React.MouseEvent<HTMLAnchorElement>, brandId: string) => {
    event.preventDefault();
    event.stopPropagation();
    window.history.pushState(null, '', '#store-locator-teaser');
    window.dispatchEvent(new CustomEvent('store-locator-brand-select', { detail: { brandId } }));
  };

  return <section className="brands-scroll-container" id="marcas"><div className="brands-sticky-wrapper"><div className="brands-black-block" onMouseMove={onBrandsMouseMove}><div className="brands-grid-overlay" /><div className="container brands-section-container"><div className="brands-section-head"><span className="eyebrow-gold">NOSSAS MARCAS</span><h2 className="brands-headline-title">Marcas que conectam, cuidam e fazem parte<br /><span className="headline-highlight">do dia a dia.</span></h2><div className="brands-subtitle-badge-wrapper"><p className="brands-subtitle-text">Cada marca conecta consumo, cuidado, gastronomia, lazer e experiências para o dia a dia.</p></div></div><div className="brands-carousel-stage" tabIndex={0} onKeyDown={onStageKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-label="Carrossel de marcas" role="region"><div className="brands-layout-split"><div className="brands-layout-left"><BrandOrbit active={active} onSelect={selectBrand} /></div><div className="brands-layout-right"><button type="button" className="brands-nav-arrow arrow-left" aria-label="Marca anterior" onClick={() => selectRelative(-1)}><ChevronLeft size={22} /></button><button type="button" className="brands-nav-arrow arrow-right" aria-label="Próxima marca" onClick={() => selectRelative(1)}><ChevronRight size={22} /></button>{brandData.map((brand) => { const Watermark = brand.watermark; return <div className={'brand-detail-card theme-' + brand.theme + (brand.id === active ? ' active' : '')} data-brand={brand.id} id={'marca-' + brand.id} key={brand.id}><div className="card-top-gallery">{brand.images.map((image, index) => <div className="gallery-panel panel-image" key={image}><img src={asset('Fotografias/' + image)} alt={`${brand.id} imagem ${index + 1}`} /></div>)}</div><div className="card-details-body"><div className="card-logo-overlap"><img src={asset('Icones Submarcas/' + brand.logo)} alt={brand.id} /></div><div className="card-header-info"><span className="card-badge">MARCA EM DESTAQUE</span><h3 className={'card-brand-title' + (brand.serifTitle ? ' serif-font' : '')}>{brand.title}</h3><span className={'card-brand-keywords keyword-' + brand.id}>{brand.keywords}</span></div><p className="card-brand-description">{brand.description}</p><div className="card-actions"><a href="#links" className="btn-card-primary">Ver links <ArrowUpRight size={15} aria-hidden="true" /></a><a href="#store-locator-teaser" className="open-map-trigger btn-card-secondary" onClick={(event) => openBrandLocation(event, brand.id)}><MapPin size={15} aria-hidden="true" /> Ver localização</a></div><Watermark className="card-watermark" size={120} strokeWidth={0.8} aria-hidden="true" /></div></div>; })}</div></div></div></div></div></div></section>;
}

export { OpportunitiesSection };
export function FaqSectionExport() {
  return <FaqSection />;
}
export function WorkAndFaqSections() {
  return <><OpportunitiesSection /><FaqSection /></>;
}
