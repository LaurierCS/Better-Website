import Header from './components/universal/Header';
import { PatternBackground } from './components/universal/PatternBackground';
import { Particles } from './components/universal/Particles';
import { useEffect, useState } from 'react';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  const [refreshParticles, setRefreshParticles] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setRefreshParticles(r => !r);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen" style={{ minHeight: '100vh', position: 'relative', overflow: 'auto' }}>
      <PatternBackground />
      <Particles refresh={refreshParticles} />
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
