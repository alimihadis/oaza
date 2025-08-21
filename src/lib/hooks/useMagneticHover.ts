import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticHoverOptions {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagneticHover(options: MagneticHoverOptions = {}) {
  const { strength = 0.3, damping = 15, stiffness = 150 } = options;
  const [isClient, setIsClient] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const element = ref.current;
    if (!element) return;

    // Check if element has proper positioning for getBoundingClientRect
    const computedStyle = window.getComputedStyle(element);
    const position = computedStyle.position;
    
    if (position === 'static' && process.env.NODE_ENV === 'development') {
      console.warn('Please ensure that the container has a non-static position, like \'relative\', \'fixed\', or \'absolute\' to ensure scroll offset is calculated correctly.');
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, x, y, isClient]);

  if (!isClient) {
    return { ref, style: { x: 0, y: 0 } };
  }

  return { ref, style: { x: springX, y: springY } };
}
