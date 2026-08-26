import type { Metadata } from 'next';
import { AboutInstitutional, InstitutionalVideoHero } from '../../components/home-sections';
import { Timeline } from '../../components/timeline';

export const metadata: Metadata = { title: 'Sobre nós', description: 'Conheça a história, missão, valores e trajetória do Grupo Mais Barato.' };

export default function AboutPage() { return <main id="wf-main-content"><InstitutionalVideoHero /><AboutInstitutional /><Timeline /></main>; }
