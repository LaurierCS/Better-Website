/**
 * Hero page
 */

import { Welcome } from '../components/hero/Welcome';
import { Stats } from '../components/hero/Stats';
import HTMLBox from '../components/hero/HTMLBox';
import Mascots from '../components/universal/Mascots';

export const HeroPage = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16 sm:pt-20">
        <Welcome />
        <HTMLBox />
        <Stats />
        <Mascots/>
      </section>
    </>
  );
};

export default HeroPage;
