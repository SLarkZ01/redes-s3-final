'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlowText } from '@/components/ui/GlowText';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import type { HeroContent, BaseSectionProps } from '@/types';

interface HeroSectionProps extends BaseSectionProps {
  content: HeroContent;
}

function BinaryRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: cols }, () => Math.random() * 100));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {columns.map((offset, i) => (
        <motion.div
          key={i}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: offset / 10,
          }}
          className="absolute font-mono text-xs text-cyan-500"
          style={{ left: `${i * 20}px` }}
        >
          {Array.from({ length: 20 }, () =>
            Math.random() > 0.5 ? '1' : '0'
          ).join('\n')}
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection({ content, id, className }: HeroSectionProps) {
  const { displayText, isTyping } = useTypingAnimation({
    texts: content.typingTexts,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <Section id={id} className={className} fullHeight>
      <BinaryRain />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-mono text-4xl font-bold md:text-6xl lg:text-7xl"
        >
          <GlowText variant="gradient" as="span">
            {content.title}
          </GlowText>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8 h-8 font-mono text-lg text-cyan-400 md:h-10 md:text-xl lg:text-2xl"
        >
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="ml-1 inline-block h-6 w-0.5 bg-cyan-400"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl text-base text-[#8888a0] md:text-lg"
        >
          {content.subtitle}
        </motion.p>
      </div>
    </Section>
  );
}
