'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { DefinicionSection } from '@/components/sections/DefinicionSection';
import { ImportanciaSection } from '@/components/sections/ImportanciaSection';
import { CaracteristicasSection } from '@/components/sections/CaracteristicasSection';
import { FuncionamientoSection } from '@/components/sections/FuncionamientoSection';
import { EjemploSection } from '@/components/sections/EjemploSection';
import { RecursosVisualesSection } from '@/components/sections/RecursosVisualesSection';
import { ReferenciasSection } from '@/components/sections/ReferenciasSection';
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

const sectionIds = navigationItems.map((item) => item.id);

export default function HomePage() {
  const { activeSection, setActiveSection } = useActiveSection({
    sectionIds,
    offset: 150,
  });
  const { scrollToSection } = useNavigation();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Mobile Header */}
      <Header
        items={navigationItems}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        items={navigationItems}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main content */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
