
import Header from './components/universal/Header';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
// Initiatives component import (to be created)
// Remove the below line and uncomment the import when Initiatives is implemented
// import Initiatives from './pages/Initiatives';
const Initiatives = () => <div>Initiatives section coming soon.</div>;
import { TeamSection } from './pages/Team';

function App() {
  return (
    <>
      <Header />
      <HeroPage />
      <Events />
      <Initiatives />
      <TeamSection />
    </>
  );
}

export default App;
