import { useEffect, useState } from 'react';

/**
 * Custom hook to force a refresh when the window is resized.
 * Returns a boolean value that toggles on each resize event.
 */
export function useWindowResizeToggle(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setRefresh(r => !r);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [refresh, setRefresh];
}
