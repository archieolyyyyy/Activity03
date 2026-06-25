import { useInvestigationStore } from './store/useInvestigationStore';
import { useScrollPerformance } from './hooks/useScrollPerformance';
import { AmbientLayer } from './components/ui/Primitives';
import { BootScreen } from './components/layout/BootScreen';
import { TopBar } from './components/layout/TopBar';
import { ProgressNav } from './components/layout/ProgressNav';
import { HeroSection } from './components/sections/HeroSection';
import { EvidenceBoard } from './components/sections/EvidenceBoard';
import { PhasesSection } from './components/sections/PhasesSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { ImpactSection } from './components/sections/ImpactSection';
import { ImprovementSection } from './components/sections/ImprovementSection';
import { RecommendationsSection } from './components/sections/RecommendationsSection';
import { Footer } from './components/layout/Footer';

export default function App() {
  const bootComplete = useInvestigationStore((s) => s.bootComplete);
  useScrollPerformance();

  return (
    <div className="scanlines film-grain min-h-screen relative">
      <AmbientLayer />
      <TopBar />
      <ProgressNav />
      <main className={`relative z-[1] xl:pl-44 pb-24 xl:pb-8 transition-opacity duration-300 ${bootComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <HeroSection />
        <hr className="border-white/5 max-w-6xl mx-auto" />
        <EvidenceBoard />
        <PhasesSection />
        <hr className="border-white/5 max-w-6xl mx-auto" />
        <TimelineSection />
        <hr className="border-white/5 max-w-6xl mx-auto" />
        <ImpactSection />
        <hr className="border-white/5 max-w-6xl mx-auto" />
        <ImprovementSection />
        <hr className="border-white/5 max-w-6xl mx-auto" />
        <RecommendationsSection />
        <Footer />
      </main>
      {!bootComplete && <BootScreen />}
    </div>
  );
}
