'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Book } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { GlowText } from '@/components/ui/GlowText';
import type { ReferenciasContent, BaseSectionProps } from '@/types';

interface ReferenciasSectionProps extends BaseSectionProps {
  content: ReferenciasContent;
}

export function ReferenciasSection({
  content,
  id,
  className,
}: ReferenciasSectionProps) {
  return (
    <Section id={id} className={className}>
      <div className="mx-auto max-w-4xl">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-mono text-3xl font-bold md:text-4xl"
        >
          <GlowText variant="cyan">{content.title}</GlowText>
        </motion.h2>

        {/* References list */}
        <div className="space-y-4">
          {content.references.map((ref, index) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover={false} className="transition-colors hover:border-cyan-500/30">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-cyan-500/10 font-mono text-sm text-cyan-400">
                    {ref.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#e8e8ed]">
                      <span className="text-cyan-400">{ref.author}</span>{' '}
                      ({ref.year}).{' '}
                      <em className="text-[#8888a0]">{ref.title}</em>
                      {ref.publisher && (
                        <span className="text-[#8888a0]">. {ref.publisher}</span>
                      )}
                    </p>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-cyan-400/70 transition-colors hover:text-cyan-400"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Ver recurso
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
