import Header from './components/universal/Header';
import HeroPage from './pages/Hero';
import Initiatives from './pages/Initiatives';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <>
      <Header />
      <HeroPage />
      <Initiatives />
      <TeamSection />
    </>
  );
}

export default App;
