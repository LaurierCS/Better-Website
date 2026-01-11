import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import ParticlesBackgroundWrapper from './components/universal/ParticlesBackground';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <PatternBackground />
        <ParticlesBackgroundWrapper />
      </div>
      <div className="relative w-full min-h-screen">
        <Header />
        <HeroPage />
        <Events />
        <Initiatives />
        <TeamSection />
      </div>
    </>
  );
}

export default App;
