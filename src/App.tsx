import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import type { QuoteRole } from './data/fabricationData';

export default function App() {
  const [prefillRole, setPrefillRole] = useState<QuoteRole | ''>('');
  const [prefillProjectType, setPrefillProjectType] = useState<string>('');
  const [prefillVersion, setPrefillVersion] = useState<number>(0);

  const scrollToQuote = () => {
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectRoleForQuote = (role: QuoteRole) => {
    setPrefillRole(role);
    setPrefillVersion((prev) => prev + 1);
    scrollToQuote();
  };

  const handleSelectProjectScope = (projectType: string) => {
    setPrefillProjectType(projectType);
    setPrefillVersion((prev) => prev + 1);
    scrollToQuote();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F7F8] text-[#121417]">
      <Navbar onQuoteClick={scrollToQuote} />
      <main>
        <HeroSection onRequestQuote={scrollToQuote} />
        <CapabilitiesSection
          onSelectAudienceForQuote={handleSelectRoleForQuote}
        />
        <ProjectsSection onSelectProjectScope={handleSelectProjectScope} />
        <ProcessSection />
        <QuoteSection
          prefillRole={prefillRole}
          prefillProjectType={prefillProjectType}
          prefillVersion={prefillVersion}
        />
      </main>
      <Footer />
    </div>
  );
}
