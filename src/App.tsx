import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <div className="relative w-full bg-linear-to-b from-slate-800 to-slate-900 min-h-screen">
      <PatternBackground />
      <div className="relative z-10">
        <Header />
        <div id="about" style={{ scrollMarginTop: '3.5rem' }}>
          <HeroPage />
        </div>
        <div id="impact" style={{ scrollMarginTop: '3.5rem' }}>
          <Events />
        </div>
        <div id="initiatives" style={{ scrollMarginTop: '3.5rem' }}>
          <Initiatives />
        </div>
        <div id="team" style={{ scrollMarginTop: '3.5rem' }}>
          <TeamSection />
        </div>
      </div>
    </div>
  );
}

export default App;
