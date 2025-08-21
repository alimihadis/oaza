import { useState, useEffect } from 'react';

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate some initialization time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsInitialized(true);
    }, 3000); // 3 seconds default

    return () => clearTimeout(timer);
  }, []);

  // Removed skipLoading function as requested

  return {
    isLoading,
    isInitialized,
    // Removed skipLoading from return
  };
}
