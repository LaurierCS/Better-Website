/**
 * Welcome Component
 * Displays "WELCOME TO" using decorative letter assets arranged in a scrapbook style,
 * followed by "Laurier Computing Society"
 */

// Map each letter to its file
const letterAssets: Record<string, string> = {
  W: '/src/assets/letters/W.webp',
  E: '/src/assets/letters/E.webp',
  L: '/src/assets/letters/L.webp',
  C: '/src/assets/letters/C.webp',
  O: '/src/assets/letters/O.webp',
  M: '/src/assets/letters/M.webp',
  T: '/src/assets/letters/T.webp',
};

/**
 * LetterImage Component
 * Renders individual letter with scrapbook effect styling
 */
interface LetterImageProps {
  letter: string;
  index: number;
  totalLength: number;
}

const LetterImage: React.FC<LetterImageProps> = ({ letter, index, totalLength }) => {
  // Calculate rotation and offset based on index for scrapbook effect
  const rotations = [-8, 3, 5, 4, -7, 3, -5, 6, -4, 2, -3];
  const verticalOffsets = [-2, 1, -3, 2, -1, 3, -2, 1, -4, 2, 0];
  const scales = [0.95, 1.05, 0.98, 1.02, 0.96, 1.03, 0.99, 1.04, 0.97];

  const rotation = rotations[index % rotations.length];
  const offset = verticalOffsets[index % verticalOffsets.length];
  const scale = scales[index % scales.length];

  const assetPath = letterAssets[letter];

  if (!assetPath) {
    return null;
  }

  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${rotation}deg) translateY(${offset}px) scale(${scale})`,
        transition: 'transform 0.2s ease-out',
        marginRight: '-50px',
        zIndex: totalLength - index,
      }}
    >
      <img
        src={assetPath}
        alt={letter}
        className="w-28 h-28 object-contain drop-shadow-lg hover:drop-shadow-xl transition-shadow"
      />
    </div>
  );
};

/**
 * Welcome Component
 * Main container component arranging letter assets and text
 */
export const Welcome: React.FC = () => {
  const textToDisplay = 'WELCOME TO';

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      {/* Scrapbook Letter Section */}
      <div className="flex items-center justify-center max-w-4xl px-4">
        {textToDisplay.split('').map((letter, index) => (
          letter === ' ' ? (
            <div key={`space-${index}`} className="w-10" />
          ) : (
            <LetterImage 
              key={`${letter}-${index}`} 
              letter={letter} 
              index={index}
              totalLength={textToDisplay.replace(/ /g, '').length}
            />
          )
        ))}
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
