'use client';

import { useCallback } from 'react';

interface UseNavigationReturn {
  scrollToSection: (sectionId: string) => void;
}

export function useNavigation(): UseNavigationReturn {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      const offset = 80; // Account for fixed header on mobile
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return {
    scrollToSection,
  };
}
