'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Timeline } from '@/components/ui/Timeline';
import { GlowText } from '@/components/ui/GlowText';
import type { FuncionamientoContent, BaseSectionProps } from '@/types';

interface FuncionamientoSectionProps extends BaseSectionProps {
  content: FuncionamientoContent;
}

export const FuncionamientoSection = memo(function FuncionamientoSection({
  content,
  id,
  className,
}: FuncionamientoSectionProps) {
  return (
    <Section id={id} className={className}>
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-mono text-3xl font-bold md:text-4xl"
        >
          <GlowText variant="cyan">{content.title}</GlowText>
        </motion.h2>
        <Timeline steps={content.steps} />
      </div>
    </Section>
  );
});
