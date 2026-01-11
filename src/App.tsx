import Header from './components/universal/Header';
import { Background } from './components/universal/Background';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen" style={{ minHeight: '100vh', overflow: 'auto' }}>
      <Background />
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
