/**
 * Welcome Component
 * Displays "WELCOME TO" using decorative letter assets arranged in a scrapbook style,
 * followed by "Laurier Computing Society"
 */

import ScrapbookText from '../universal/ScrapbookText';
import Mascots from '../universal/Mascots';

/**
 * Welcome Component
 * Main container component arranging letter assets and text
 */
export const Welcome: React.FC = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center py-8 ">
        {/* Scrapbook Letter Section */}
        <div className="max-w-4xl w-full px-4 pr-8 overflow-hidden">
          <ScrapbookText text="WELCOME TO" letterSize={112} mobileLetterSize={48} />
        </div>

        {/* Laurier Computing Society Text */}
        <h1
          className="font-bold text-white text-center pl-5"
          style={{ fontFamily: 'var(--font-dosis)', fontSize: '3.2rem', lineHeight: '1.2' }}
        >
          LAURIER COMPUTING SOCIETY
        </h1>
      </div>
      {/* Mascots Section */}
      <Mascots mascotSize={180}/>
    </div>
  );
};

export default Welcome;
