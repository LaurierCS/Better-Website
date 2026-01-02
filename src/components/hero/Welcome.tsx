/**
 * Welcome Component
 * Displays "WELCOME TO" using decorative letter assets arranged in a scrapbook style,
 * followed by "Laurier Computing Society"
 */

import ScrapbookText from '../universal/ScrapbookText';

/**
 * Welcome Component
 * Main container component arranging letter assets and text
 */
export const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 py-8 sm:py-12 md:py-16">
      {/* Scrapbook Letter Section */}
      <div className="max-w-4xl w-full px-4 overflow-hidden">
        <ScrapbookText text="WELCOME TO" letterSize={112} mobileLetterSize={48} />
      </div>

      {/* Laurier Computing Society Text */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4"
        style={{ fontFamily: 'var(--font-dosis)' }}
      >
        Laurier Computing Society
      </h1>
    </div>
  );
};

export default Welcome;
