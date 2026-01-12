import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import { Particles } from './components/universal/Particles';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <div className="relative w-full bg-linear-to-b from-slate-800 to-slate-900 min-h-screen">
      <PatternBackground />
      <Particles />
      <div className="relative z-10">
        <Header />
        <HeroPage />
        <Events />
        <Initiatives />
        <TeamSection />
      </div>
    </div>
  );
}

export default App;
