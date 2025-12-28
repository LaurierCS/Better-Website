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
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Scrapbook Letter Section */}
      <div className="max-w-4xl px-4">
        <ScrapbookText text="WELCOME TO" letterSize={112} className="md:letterSize-112" />
      </div>

      {/* Laurier Computing Society Text */}
      <h1
        className="text-4xl md:text-5xl font-bold text-white text-center"
        style={{ fontFamily: 'var(--font-dosis)' }}
      >
        Laurier Computing Society
      </h1>
    </div>
  );
};

export default Welcome;
