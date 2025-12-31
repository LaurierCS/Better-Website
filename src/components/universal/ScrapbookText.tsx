/**
 * ScrapbookText Component
 * Universal component for displaying text in scrapbook style using letter assets
 * Supports letters: C, E, L, M, O, S, T, W
 */

import React, { useMemo } from 'react';

interface ScrapbookTextProps {
  text: string;
  letterSize?: number; // Size in pixels for desktop, default 112 (w-28)
  mobileLetterSize?: number; // Size in pixels for mobile, default is letterSize * 0.5
  className?: string;
  letterClassName?: string;
}

// Supported letters - only these have assets
const SUPPORTED_LETTERS = ['C', 'E', 'L', 'M', 'O', 'S', 'T', 'W'] as const;
type SupportedLetter = typeof SUPPORTED_LETTERS[number];

// Map each letter to its asset path
const letterAssets: Record<SupportedLetter, string> = {
  C: '/src/assets/letters/C.webp',
  E: '/src/assets/letters/E.webp',
  L: '/src/assets/letters/L.webp',
  M: '/src/assets/letters/M.webp',
  O: '/src/assets/letters/O.webp',
  S: '/src/assets/letters/S.webp',
  T: '/src/assets/letters/T.webp',
  W: '/src/assets/letters/W.webp',
};

/**
 * Validates text contains only supported letters and spaces
 */
const validateText = (text: string): void => {
  const uppercaseText = text.toUpperCase();
  const invalidChars = uppercaseText
    .split('')
    .filter((char) => char !== ' ' && !SUPPORTED_LETTERS.includes(char as SupportedLetter));

  if (invalidChars.length > 0) {
    throw new Error(
      `ScrapbookText: Unsupported characters found: "${invalidChars.join(', ')}". ` +
      `Only these letters are supported: ${SUPPORTED_LETTERS.join(', ')}`
    );
  }
};

/**
 * Generates random transform values for scrapbook effect
 */
const generateRandomTransforms = (count: number) => {
  return Array.from({ length: count }, () => ({
    rotation: Math.random() * 16 - 8, // Random between -8 and 8 degrees
    offsetY: Math.random() * 6 - 3, // Random between -3 and 3 pixels
    scale: Math.random() * 0.1 + 0.95, // Random between 0.95 and 1.05
  }));
};

/**
 * ScrapbookLetter Component
 * Renders individual letter with scrapbook effect styling
 */
interface ScrapbookLetterProps {
  letter: SupportedLetter;
  rotation: number;
  offsetY: number;
  scale: number;
  zIndex: number;
  size: number;
  letterClassName?: string;
}

const ScrapbookLetter: React.FC<ScrapbookLetterProps> = ({
  letter,
  rotation,
  offsetY,
  scale,
  zIndex,
  size,
  letterClassName,
}) => {
  const assetPath = letterAssets[letter];

  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${rotation}deg) translateY(${offsetY}px) scale(${scale})`,
        transition: 'transform 0.2s ease-out',
        marginRight: `${-size * 0.45}px`, // Dynamic overlap based on size
        zIndex,
      }}
    >
      <img
        src={assetPath}
        alt={letter}
        className={`object-contain drop-shadow-lg hover:drop-shadow-xl transition-shadow ${letterClassName || ''}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
};

/**
 * ScrapbookText Component
 * Main component for rendering scrapbook-style text
 */
export const ScrapbookText: React.FC<ScrapbookTextProps> = ({
  text,
  letterSize = 112,
  mobileLetterSize,
  className = '',
  letterClassName = '',
}) => {
  // Track window width for responsive sizing
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate responsive letter size
  const responsiveLetterSize = isMobile 
    ? (mobileLetterSize ?? letterSize * 0.5) 
    : letterSize;

  // Validate text on mount
  useMemo(() => {
    validateText(text);
  }, [text]);

  const uppercaseText = text.toUpperCase();

  // Generate random transforms once per component instance (changes on reload)
  const transforms = useMemo(() => {
    const letterCount = uppercaseText.replace(/ /g, '').length;
    return generateRandomTransforms(letterCount);
  }, [uppercaseText]);

  return (
    <div className={`flex items-center justify-center flex-wrap ${className}`}>
      {uppercaseText.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <div
              key={`space-${index}`}
              style={{ width: `${responsiveLetterSize * 0.36}px` }} // Dynamic space width
            />
          );
        }

        // Calculate letter index (excluding spaces)
        const letterIndex = uppercaseText.slice(0, index).replace(/ /g, '').length;
        const transform = transforms[letterIndex];
        const totalLetters = uppercaseText.replace(/ /g, '').length;

        return (
          <ScrapbookLetter
            key={`${char}-${index}`}
            letter={char as SupportedLetter}
            rotation={transform.rotation}
            offsetY={transform.offsetY}
            scale={transform.scale}
            zIndex={totalLetters - letterIndex}
            size={responsiveLetterSize}
            letterClassName={letterClassName}
          />
        );
      })}
    </div>
  );
};

export default ScrapbookText;
