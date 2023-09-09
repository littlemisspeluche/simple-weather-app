import { useCallback, useEffect } from 'react';

export const useWindowWidth = (callback: (width: number) => void) => {
  const handleWidth = useCallback(() => {
    callback(window.innerWidth);
  }, [callback]);

  useEffect(() => {
    handleWidth();

    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, [handleWidth]);
};
