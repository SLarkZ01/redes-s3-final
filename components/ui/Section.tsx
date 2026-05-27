'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { BaseSectionProps } from '@/types';
import { cn } from '@/lib/utils';

interface SectionProps extends BaseSectionProps {
  fullHeight?: boolean;
}

export const Section = memo(function Section({
  id,
  className,
  children,
  fullHeight = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative w-full px-4 py-16 md:py-24',
        fullHeight && 'min-h-screen flex items-center justify-center',
        className
      )}
    >
      {children}
    </motion.section>
  );
});
