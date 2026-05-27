'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseActiveSectionOptions {
  sectionIds: string[];
  offset?: number;
}

interface UseActiveSectionReturn {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export function useActiveSection({
  sectionIds,
  offset = 100,
}: UseActiveSectionOptions): UseActiveSectionReturn {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;

    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i];
      const element = document.getElementById(sectionId);
      
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const setActiveSectionWithLock = useCallback((id: string) => {
    isScrollingRef.current = true;
    setActiveSection(id);
    
    // Release lock after scroll animation completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  return {
    activeSection,
    setActiveSection: setActiveSectionWithLock,
  };
}
