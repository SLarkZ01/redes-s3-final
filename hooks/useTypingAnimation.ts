'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

interface UseTypingAnimationReturn {
  displayText: string;
  isTyping: boolean;
  currentIndex: number;
}

export function useTypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypingAnimationOptions): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentText = texts[currentIndex];
    
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, texts, pauseDuration]);

  useEffect(() => {
    if (!isTyping) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(type, speed);

    return () => clearTimeout(timer);
  }, [type, isTyping, isDeleting, typingSpeed, deletingSpeed]);

  return {
    displayText,
    isTyping,
    currentIndex,
  };
}
