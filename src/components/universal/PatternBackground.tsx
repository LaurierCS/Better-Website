import { useState, useEffect } from 'react';

export const PatternBackground = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        background: `linear-gradient(135deg, #2C3844 0%, #4a5568 100%)`,
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-50%',
          backgroundImage: `url(/assets/patterns/Icon_Pattern.svg)`,
          backgroundRepeat: 'repeat',
          backgroundSize: isMobile ? '600px' : '800px',
          opacity: 0.02,
          transform: 'rotate(-15deg)',
          transformOrigin: 'center',
          willChange: 'auto',
        }}
      />
    </div>
  );
};
