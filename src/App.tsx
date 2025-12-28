import Header from './components/universal/Header';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <>
      <Header />
      <HeroPage />
      <Events />
      <TeamSection />
    </>
  );
}

export default App;
