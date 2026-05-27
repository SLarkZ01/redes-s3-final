'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, ShieldAlert } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { GlowText } from '@/components/ui/GlowText';
import type { DefinicionContent, BaseSectionProps } from '@/types';

interface DefinicionSectionProps extends BaseSectionProps {
  content: DefinicionContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Eye,
  ShieldAlert,
};

export function DefinicionSection({
  content,
  id,
  className,
}: DefinicionSectionProps) {
  return (
    <Section id={id} className={className}>
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-mono text-3xl font-bold md:text-4xl"
        >
          <GlowText variant="cyan">{content.title}</GlowText>
        </motion.h2>

        {/* Definition cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {content.definitions.map((def, index) => {
            const Icon = iconMap[def.icon];

            return (
              <motion.div
                key={def.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full">
                  <div className="mb-4 flex items-center gap-3">
                    {Icon && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                    )}
                    <h3 className="font-mono text-xl font-semibold text-[#e8e8ed]">
                      {def.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#8888a0]">
                    {def.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
