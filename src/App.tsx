import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <div className="relative w-full min-h-screen" style={{ minHeight: '100vh', position: 'relative', overflow: 'auto' }}>
      <PatternBackground />
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
