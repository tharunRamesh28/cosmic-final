import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { PhaseSequence } from '../components/PhaseSequence';
import { CapabilitiesCore } from '../components/CapabilitiesCore';
import { SmartDripShowcase } from '../components/SmartDripShowcase';
import { PricingSection } from '../components/PricingSection';
import { ProjectModal } from '../components/ProjectModal';
import { useRouter } from '../router';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [modalInitialService, setModalInitialService] = useState<string | undefined>(undefined);
  const [modalInitialTier, setModalInitialTier] = useState<string | undefined>(undefined);

  const handleStartProject = (serviceName?: string, tierName?: string) => {
    setModalInitialService(serviceName);
    setModalInitialTier(tierName);
    setIsProjectModalOpen(true);
  };

  const handleExploreWork = () => {
    navigate('/works');
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Section */}
      <Hero
        onStartProject={() => handleStartProject()}
        onExploreWork={handleExploreWork}
        isDarkTheme={false}
      />

      {/* Section 1: Phase Sequence (From Idea to Product) */}
      <PhaseSequence />

      {/* Section 2: Capabilities Core (What We Build) */}
      <CapabilitiesCore
        onStartProjectForService={(service) => handleStartProject(service)}
      />

      {/* Section 3: SmartDrip+ Product Showcase */}
      <SmartDripShowcase onStartProject={handleStartProject} />

      {/* Section 5: Transparent Engagement Models */}
      <PricingSection
        onSelectTier={(tier) => handleStartProject(undefined, tier)}
      />

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
};
