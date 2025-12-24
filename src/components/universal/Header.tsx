import { useState, useEffect } from 'react';
import logoFull from '../../assets/logos/LCS_Logo_Long_White_SVG.svg';
import logoIcon from '../../assets/logos/LCS_Icon_White_SVG.svg';

export default function Header() {
  // Track scroll state for background blur effect
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white ${
        isScrolled 
          ? 'bg-(--color-bg)/80 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo - responsive sizing */}
        <div className="flex items-center shrink-0">
          <img 
            src={logoFull} 
            alt="LCS Logo" 
            className="hidden md:block h-8 md:h-10"
          />
          <img 
            src={logoIcon} 
            alt="LCS Logo" 
            className="block md:hidden h-8"
          />
        </div>

        {/* Navigation - responsive gap and text size */}
        <nav className="flex items-center gap-3 md:gap-8">
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#impact">Impact</NavLink>
          <NavLink href="#initiatives">Initiatives</NavLink>
          <NavLink href="#team">Our Team</NavLink>
        </nav>
      </div>
    </header>
  );
}

// Individual nav link with random accent color on hover
function NavLink({ href, children }: { href: string; children: string }) {
  const [currentColor, setCurrentColor] = useState('');
  const [lastColor, setLastColor] = useState('');

  // Accent colors from CSS variables
  const accentColors = [
    '#FF9FC4', // pink
    '#FF9770', // orange
    '#FFD670', // yellow
    '#268AF9', // blue
    '#B1E0FF', // light-blue
  ];

  // Pick random color on each hover (exclude previous color)
  const handleMouseEnter = () => {
    const availableColors = accentColors.filter(color => color !== lastColor);
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    setCurrentColor(randomColor);
    setLastColor(randomColor);
  };

  const handleMouseLeave = () => {
    setCurrentColor('');
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-white text-sm md:text-lg font-medium transition-all duration-300 whitespace-nowrap"
      style={{ 
        fontFamily: 'var(--font-dosis)',
        color: currentColor || 'white',
      }}
    >
      {children}
      {/* Animated underline */}
      <span
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
        style={{
          backgroundColor: currentColor,
          transform: currentColor ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </a>
  );
}
