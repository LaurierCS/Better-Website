import { useState } from 'react';
import logoFull from '../../assets/logos/LCS_Logo_Long_White_SVG.svg';
import logoIcon from '../../assets/logos/LCS_Icon_White_SVG.svg';

export default function Header() {
  // Track mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white bg-[#2C3844]/95 backdrop-blur-sm'
      }
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#impact">Impact</NavLink>
          <NavLink href="#initiatives">Initiatives</NavLink>
          <NavLink href="#team">Our Team</NavLink>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-4 py-4 bg-[#2C3844]/95 backdrop-blur-md border-t border-white/20">
          <NavLink href="#about" onClick={handleNavClick}>About Us</NavLink>
          <NavLink href="#impact" onClick={handleNavClick}>Impact</NavLink>
          <NavLink href="#initiatives" onClick={handleNavClick}>Initiatives</NavLink>
          <NavLink href="#team" onClick={handleNavClick}>Our Team</NavLink>
        </nav>
      </div>
    </header>
  );
}

// Individual nav link with random accent color on hover
function NavLink({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) {
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
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-white text-base md:text-lg font-medium transition-all duration-300 whitespace-nowrap"
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
