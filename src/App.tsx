import Header from './components/universal/Header';
import HeroPage from './pages/Hero';
import Events from './pages/Events';
import Initiatives from './pages/Initiatives';
import AssetGallery from './pages/AssetGallery';
import { TeamSection } from './pages/Team';

function App() {
  return (
    <>
      <Header />
      <HeroPage />
      <Events />
      <Initiatives />
      <TeamSection />
      {/* TEMP: Asset Gallery Page */}
      <AssetGallery />
    </>
  );
}

export default App;
