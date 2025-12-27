/**
 * Hero page
 */

import { Welcome } from '../components/hero/Welcome';
import { Stats } from '../components/hero/Stats';

export const HeroPage = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-slate-800 to-slate-900">
        <Welcome />
        <Stats />
      </section>
    </>
  );
};

export default HeroPage;
