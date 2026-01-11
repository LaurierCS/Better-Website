import patternSvg from '../../../assets/patterns/Icon_Pattern.svg'

export const PatternBackground = () => {
  return (
    <div
      className="absolute inset-0 w-full min-h-screen pointer-events-none"
      style={{
        background: `linear-gradient(135deg, #2C3844 0%, #4a5568 100%)`,
        zIndex: 0,
        height: '100%'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-50%',
          backgroundImage: `url(${patternSvg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px',
          opacity: 0.02,
          transform: 'rotate(-15deg)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
};
