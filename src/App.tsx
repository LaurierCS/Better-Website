import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';
import { useRandomScrollbarColor } from './hooks/useRandomScrollbarColor';

function App() {
  // Set random scrollbar color on page load
  useRandomScrollbarColor();

  return (
    <div className="relative w-full bg-linear-to-b from-slate-800 to-slate-900 min-h-screen">
      <PatternBackground />
      <div className="relative z-10">
        <Header />
        <div id="about">
          <HeroPage />
        </div>
        <div id="impact">
          <Events />
        </div>
        <div id="initiatives" style={{ scrollMarginTop: '-100px' }}>
          <Initiatives />
        </div>
        <div id="team" style={{ scrollMarginTop: '-100px' }}>
          <TeamSection />
        </div>
      </div>
    </div>
  );
}

export default App;
