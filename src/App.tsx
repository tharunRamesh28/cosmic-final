import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PhaseSequence } from './components/PhaseSequence';
import { CapabilitiesCore } from './components/CapabilitiesCore';
import { SmartDripShowcase } from './components/SmartDripShowcase';
import { PricingSection } from './components/PricingSection';
import { ScrollReveal } from './components/ScrollReveal';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ShaderBackground } from './components/ShaderBackground';
import { WorksPage } from './pages/WorksPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { OrderPage } from './pages/OrderPage';

function AppContent() {
  const { path, navigate } = useRouter();
  const [isCircuitShaderActive, setIsCircuitShaderActive] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [modalInitialService, setModalInitialService] = useState<string | undefined>(undefined);
  const [modalInitialTier, setModalInitialTier] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track scroll position for active nav highlighting when on home page
  useEffect(() => {
    if (path !== '/' && path !== '') return;

    const handleScroll = () => {
      const sections = ['works', 'services', 'process', 'about', 'pricing'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  const handleStartProject = (serviceName?: string, tierName?: string) => {
    navigate('/order', { initialService: serviceName, selectedSpeed: tierName });
  };

  const handleExploreWork = () => {
    navigate('/works');
  };

  const isHome = path === '/' || path === '';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative selection:bg-[#c8f179] selection:text-[#000000] ${isCircuitShaderActive ? 'bg-[#0a0a0a] text-white' : 'bg-[#f9faf7] text-[#191c1b]'
        }`}
    >
      {/* Interactive WebGL Circuit Shader Background (Toggleable) */}
      <ShaderBackground
        opacity={isCircuitShaderActive ? 0.92 : 0}
        className="transition-opacity duration-700 pointer-events-none"
      />

      {/* Main Header / Navigation (Shared across all pages) */}
      <Header
        isCircuitShaderActive={isCircuitShaderActive}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 pt-[72px] md:pt-[84px]">
        <div key={path} className="page-enter min-h-[70vh]">
          {/* Route: /works */}
          {path === '/works' && <WorksPage />}

          {/* Route: /services */}
          {path === '/services' && <ServicesPage />}

          {/* Route: /about */}
          {path === '/about' && <AboutPage />}

          {/* Route: /pricing */}
          {path === '/pricing' && <PricingPage />}

          {/* Route: /order */}
          {path === '/order' && <OrderPage />}

          {/* Default Route: Exact Full Original Home Page */}
          {isHome && (
            <>
              {/* Hero Section */}
              <Hero
                onStartProject={() => handleStartProject()}
                onExploreWork={handleExploreWork}
                isDarkTheme={isCircuitShaderActive}
              />

              {/* Section 1: Phase Sequence (From Idea to Product) - has internal scroll animation */}
              <PhaseSequence />

              {/* Section 2: Capabilities Core (What We Build) */}
              <ScrollReveal>
                <CapabilitiesCore
                  onStartProjectForService={(service) => handleStartProject(service)}
                />
              </ScrollReveal>

              {/* Section 3: SmartDrip+ Product Showcase */}
              <ScrollReveal>
                <SmartDripShowcase onStartProject={handleStartProject} />
              </ScrollReveal>

              {/* Section 5: Transparent Engagement Models */}
              <ScrollReveal>
                <PricingSection
                  onSelectTier={(tier) => handleStartProject(undefined, tier)}
                />
              </ScrollReveal>
            </>
          )}
        </div>
      </main>

      {/* Footer (Shared across all pages) */}
      <Footer />

      {/* Interactive Project Brief & Estimator Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setModalInitialService(undefined);
          setModalInitialTier(undefined);
        }}
        initialService={modalInitialService}
        initialTier={modalInitialTier}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
