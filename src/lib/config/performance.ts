// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Device detection thresholds
  thresholds: {
    highPerformance: {
      minFPS: 50,
      minCores: 4,
      minMemory: 4 * 1024 * 1024 * 1024, // 4GB
      isMobile: false,
    },
    mediumPerformance: {
      minFPS: 30,
      minCores: 2,
      minMemory: 2 * 1024 * 1024 * 1024, // 2GB
      isMobile: false,
    },
    lowPerformance: {
      minFPS: 20,
      minCores: 1,
      minMemory: 1 * 1024 * 1024 * 1024, // 1GB
      isMobile: true,
    },
  },

  // Animation settings by performance level
  animations: {
    high: {
      preloader: {
        particleCount: 50,
        enable3D: true,
        enableParticles: true,
        enableMouseEffects: true,
        animationDuration: 1,
        enableBackdropFilter: true,
      },
      threeJS: {
        particleCount: 800,
        objectCount: 6,
        enableShadows: true,
        enablePostProcessing: true,
        targetFPS: 60,
        antialiasing: true,
        highQualityMaterials: true,
      },
      navigation: {
        enableBackdropFilter: true,
        enableParallax: true,
        enableMouseEffects: true,
        enable3D: true,
        enableParticles: true,
        animationDuration: 0.7,
        scrollThrottle: 16, // 60fps
      },
      general: {
        enableParallax: true,
        enableMouseEffects: true,
        enable3D: true,
        enableParticles: true,
        enableBackdropFilter: true,
        animationDuration: 0.8,
        enableIntersectionObserver: true,
        enableScrollAnimations: true,
      },
    },
    medium: {
      preloader: {
        particleCount: 25,
        enable3D: false,
        enableParticles: true,
        enableMouseEffects: false,
        animationDuration: 0.7,
        enableBackdropFilter: false,
      },
      threeJS: {
        particleCount: 400,
        objectCount: 4,
        enableShadows: false,
        enablePostProcessing: false,
        targetFPS: 45,
        antialiasing: false,
        highQualityMaterials: false,
      },
      navigation: {
        enableBackdropFilter: false,
        enableParallax: false,
        enableMouseEffects: false,
        enable3D: false,
        enableParticles: false,
        animationDuration: 0.5,
        scrollThrottle: 32, // 30fps
      },
      general: {
        enableParallax: false,
        enableMouseEffects: false,
        enable3D: false,
        enableParticles: false,
        enableBackdropFilter: false,
        animationDuration: 0.6,
        enableIntersectionObserver: true,
        enableScrollAnimations: false,
      },
    },
    low: {
      preloader: {
        particleCount: 10,
        enable3D: false,
        enableParticles: false,
        enableMouseEffects: false,
        animationDuration: 0.5,
        enableBackdropFilter: false,
      },
      threeJS: {
        particleCount: 100,
        objectCount: 2,
        enableShadows: false,
        enablePostProcessing: false,
        targetFPS: 30,
        antialiasing: false,
        highQualityMaterials: false,
      },
      navigation: {
        enableBackdropFilter: false,
        enableParallax: false,
        enableMouseEffects: false,
        enable3D: false,
        enableParticles: false,
        animationDuration: 0.3,
        scrollThrottle: 64, // 15fps
      },
      general: {
        enableParallax: false,
        enableMouseEffects: false,
        enable3D: false,
        enableParticles: false,
        enableBackdropFilter: false,
        animationDuration: 0.4,
        enableIntersectionObserver: false,
        enableScrollAnimations: false,
      },
    },
  },

  // CSS optimization settings
  css: {
    willChange: {
      // Properties that should use will-change
      transform: true,
      opacity: true,
      filter: false, // Expensive
      backdropFilter: false, // Very expensive
    },
    // GPU acceleration properties
    gpuAccelerated: [
      'transform',
      'opacity',
      'filter',
      'backdrop-filter',
    ],
    // Properties to avoid for performance
    avoid: [
      'box-shadow', // Use sparingly
      'border-radius', // Use sparingly
      'background-image', // Use sparingly
    ],
  },

  // Intersection Observer settings
  intersectionObserver: {
    threshold: 0.1,
    rootMargin: '50px',
    // Only enable on medium+ performance devices
    enableOnLowPerformance: false,
  },

  // Scroll optimization
  scroll: {
    // Throttle scroll events based on performance
    throttleRates: {
      high: 16,    // 60fps
      medium: 32,  // 30fps
      low: 64,     // 15fps
    },
    // Enable smooth scrolling only on high-performance devices
    smoothScrolling: {
      high: true,
      medium: false,
      low: false,
    },
  },

  // Three.js optimization
  threeJS: {
    // Level of detail based on performance
    lod: {
      high: {
        geometrySegments: 32,
        textureQuality: 'high',
        enableFog: true,
        enableShadows: true,
      },
      medium: {
        geometrySegments: 16,
        textureQuality: 'medium',
        enableFog: false,
        enableShadows: false,
      },
      low: {
        geometrySegments: 8,
        textureQuality: 'low',
        enableFog: false,
        enableShadows: false,
      },
    },
    // Memory management
    memory: {
      maxTextureSize: 2048,
      maxGeometryVertices: 10000,
      enableInstancing: true,
      enableFrustumCulling: true,
    },
  },

  // Progressive enhancement
  progressiveEnhancement: {
    // Load order: essential -> enhanced -> premium
    phases: {
      essential: {
        // Always load
        preloader: true,
        navigation: true,
        content: true,
        basicAnimations: true,
      },
      enhanced: {
        // Load after essential, if performance allows
        threeJS: 'conditional',
        particles: 'conditional',
        parallax: 'conditional',
        backdropFilters: 'conditional',
      },
      premium: {
        // Load last, only on high-performance devices
        advanced3D: 'high-performance-only',
        complexParticles: 'high-performance-only',
        realtimeEffects: 'high-performance-only',
      },
    },
  },

  // Fallback strategies
  fallbacks: {
    // What to show when features are disabled
    threeJS: {
      // Replace 3D with CSS animations
      cssAlternative: true,
      staticImage: true,
      reducedMotion: true,
    },
    particles: {
      // Replace particles with CSS dots
      cssDots: true,
      staticElements: true,
    },
    backdropFilter: {
      // Replace backdrop-filter with solid colors
      solidBackground: true,
      reducedOpacity: true,
    },
  },

  // Performance monitoring
  monitoring: {
    // Enable performance monitoring in development
    development: true,
    production: false,
    // Metrics to track
    metrics: [
      'fps',
      'memory',
      'loadTime',
      'animationFrameTime',
      'scrollPerformance',
    ],
    // Thresholds for warnings
    warnings: {
      fps: 30,
      memory: 100 * 1024 * 1024, // 100MB
      loadTime: 3000, // 3 seconds
    },
  },
};

// Helper function to get performance level
export function getPerformanceLevel(
  fps: number,
  cores: number,
  memory: number,
  isMobile: boolean
): 'high' | 'medium' | 'low' {
  if (isMobile) return 'low';
  
  if (
    fps >= PERFORMANCE_CONFIG.thresholds.highPerformance.minFPS &&
    cores >= PERFORMANCE_CONFIG.thresholds.highPerformance.minCores &&
    memory >= PERFORMANCE_CONFIG.thresholds.highPerformance.minMemory
  ) {
    return 'high';
  }
  
  if (
    fps >= PERFORMANCE_CONFIG.thresholds.mediumPerformance.minFPS &&
    cores >= PERFORMANCE_CONFIG.thresholds.mediumPerformance.minCores &&
    memory >= PERFORMANCE_CONFIG.thresholds.mediumPerformance.minMemory
  ) {
    return 'medium';
  }
  
  return 'low';
}

// Helper function to get animation config
export function getAnimationConfig(performanceLevel: 'high' | 'medium' | 'low') {
  return PERFORMANCE_CONFIG.animations[performanceLevel];
}

// Helper function to check if feature should be enabled
export function shouldEnableFeature(
  feature: keyof typeof PERFORMANCE_CONFIG.animations.high.general,
  performanceLevel: 'high' | 'medium' | 'low'
): boolean {
  const config = PERFORMANCE_CONFIG.animations[performanceLevel].general;
  return Boolean(config[feature]);
}
