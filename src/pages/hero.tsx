/**
 * Hero page
 */

import { Welcome } from '../components/hero/welcome';

export const HeroPage = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-linear-to-b from-slate-800 to-slate-900">
      <Welcome />
    </section>
  );
};

export default HeroPage;
