'use client';

import { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { DefinicionSection } from '@/components/sections/DefinicionSection';
import { ImportanciaSection } from '@/components/sections/ImportanciaSection';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useNavigation } from '@/hooks/useNavigation';
import {
  navigationItems,
  heroContent,
  definicionContent,
  importanciaContent,
  caracteristicasContent,
  funcionamientoContent,
  ejemploContent,
  recursosVisualesContent,
  referenciasContent,
} from '@/data/content';
import { networkDiagram } from '@/data/diagrams';

const CaracteristicasSection = dynamic(
  () => import('@/components/sections/CaracteristicasSection').then((m) => ({ default: m.CaracteristicasSection })),
  { ssr: false }
);
const FuncionamientoSection = dynamic(
  () => import('@/components/sections/FuncionamientoSection').then((m) => ({ default: m.FuncionamientoSection })),
  { ssr: false }
);
const EjemploSection = dynamic(
  () => import('@/components/sections/EjemploSection').then((m) => ({ default: m.EjemploSection })),
  { ssr: false }
);
const RecursosVisualesSection = dynamic(
  () => import('@/components/sections/RecursosVisualesSection').then((m) => ({ default: m.RecursosVisualesSection })),
  { ssr: false }
);
const ReferenciasSection = dynamic(
  () => import('@/components/sections/ReferenciasSection').then((m) => ({ default: m.ReferenciasSection })),
  { ssr: false }
);

const sectionIds = navigationItems.map((item) => item.id);

export default function HomePage() {
  const { activeSection, setActiveSection } = useActiveSection({
    sectionIds,
    offset: 150,
  });
  const { scrollToSection } = useNavigation();

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      scrollToSection(sectionId);
    },
    [setActiveSection, scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header
        items={navigationItems}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <Sidebar
        items={navigationItems}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="pt-16 md:pl-64 md:pt-0">
        <HeroSection id="hero" content={heroContent} />
        <DefinicionSection id="definicion" content={definicionContent} />
        <ImportanciaSection id="importancia" content={importanciaContent} />
        <CaracteristicasSection id="caracteristicas" content={caracteristicasContent} />
        <FuncionamientoSection id="funcionamiento" content={funcionamientoContent} />
        <EjemploSection
          id="ejemplo"
          content={ejemploContent}
          diagramData={networkDiagram}
        />
        <RecursosVisualesSection id="recursos" content={recursosVisualesContent} />
        <ReferenciasSection id="referencias" content={referenciasContent} />
      </main>

      <Footer />
    </div>
  );
}
