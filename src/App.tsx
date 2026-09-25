import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router';
import { AuthProvider, useAuth } from './lib/AuthContext';
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
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { MyRequestsPage } from './pages/MyRequestsPage';
import ClickSpark from './components/ClickSpark';

function AppContent() {
  const { path, navigate } = useRouter();
  const { user, loading, isAdmin } = useAuth();

  const [isCircuitShaderActive, setIsCircuitShaderActive] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [modalInitialService, setModalInitialService] = useState<string | undefined>(undefined);
  const [modalInitialTier, setModalInitialTier] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const normalizedPath = path.replace(/\/$/, '') || '/';
  const isAuthRoute =
    normalizedPath === '/login' ||
    normalizedPath === '/admin-login' ||
    normalizedPath === '/signup' ||
    normalizedPath === '/forgot-password';

  // Route handling:
  // /admin requires admin privileges.
  if (normalizedPath === '/admin' || normalizedPath.startsWith('/admin/')) {
    if (loading) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center font-mono-tech text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span>VERIFYING ACCESS...</span>
          </div>
        </div>
      );
    }
    if (!user) {
      return <LoginPage />;
    }
    if (user.id !== '9163b26d-c7b1-4a13-8688-62ca34233fd9') {
      // Authenticated user but not admin -> redirect to normal home page
      window.location.replace('/');
      return null;
    }
    return <AdminDashboardPage />;
  }

  // Route: /auth/callback for Google OAuth redirect
  if (normalizedPath === '/auth/callback') {
    return <AuthCallbackPage />;
  }

  // If someone explicitly navigates to /login, show LoginPage
  if (normalizedPath === '/login' || normalizedPath === '/admin-login') {
    return <LoginPage />;
  }
  if (normalizedPath === '/signup') {
    return <SignupPage />;
  }
  if (normalizedPath === '/forgot-password') {
    return <ForgotPasswordPage />;
  }

  // 4. Render Main Website (For authenticated users OR visitors with user permission)
  const handleStartProject = (serviceName?: string, tierName?: string) => {
    navigate('/order', { initialService: serviceName, selectedSpeed: tierName });
  };

  const handleExploreWork = () => {
    navigate('/works');
  };

  const isHome = path === '/' || path === '' || path === '/home';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative selection:bg-[#c8f179] selection:text-[#000000] ${
        isCircuitShaderActive ? 'bg-[#0a0a0a] text-white' : 'bg-[#f9faf7] text-[#191c1b]'
      }`}
    >
      <ClickSpark
        sparkColor="#c8f179"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        {/* Interactive WebGL Circuit Shader Background (Toggleable) */}
        <ShaderBackground
          opacity={isCircuitShaderActive ? 0.92 : 0}
          className="transition-opacity duration-700 pointer-events-none"
        />

        {/* Main Header / Navigation (Shared across all pages) */}
        <Header isCircuitShaderActive={isCircuitShaderActive} />

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

            {/* Route: /order or /start-a-project */}
            {(path === '/order' || path === '/start-a-project') && <OrderPage />}

            {/* Route: /my-requests */}
            {path === '/my-requests' && <MyRequestsPage />}

            {/* Default Route: Exact Full Original Home Page */}
            {isHome && (
              <>
                {/* Hero Section */}
                <Hero
                  onStartProject={() => handleStartProject()}
                  onExploreWork={handleExploreWork}
                  isDarkTheme={isCircuitShaderActive}
                />

                {/* Section 1: Phase Sequence (From Idea to Product) */}
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
      </ClickSpark>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AuthProvider>
  );
}
