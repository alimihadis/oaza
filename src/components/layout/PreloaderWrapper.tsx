'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/common/Preloader';

export default function PreloaderWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('PreloaderWrapper: Starting preloader...');
    
    // Simulate some initialization time
    const timer = setTimeout(() => {
      console.log('PreloaderWrapper: Timer completed, setting loading to false');
      setIsLoading(false);
      setTimeout(() => {
        setIsInitialized(true);
      }, 1500); // Wait for exit animation
    }, 4000); // 4 seconds default for advanced preloader

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    console.log('PreloaderWrapper: handleComplete called');
    setIsLoading(false);
  };

  console.log('PreloaderWrapper: Render - isLoading:', isLoading, 'isInitialized:', isInitialized);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {isLoading && (
          <Preloader 
            onComplete={handleComplete}
            duration={4000}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
