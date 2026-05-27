'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  UserX,
  DollarSign,
  Cloud,
  AlertTriangle,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { GlowText } from '@/components/ui/GlowText';
import type { ImportanciaContent, BaseSectionProps } from '@/types';

interface ImportanciaSectionProps extends BaseSectionProps {
  content: ImportanciaContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Lock,
  FileCheck,
  UserX,
  DollarSign,
  Cloud,
};

export function ImportanciaSection({
  content,
  id,
  className,
}: ImportanciaSectionProps) {
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

        {/* Highlight stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card glow className="border-orange-500/20 bg-orange-500/5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-[#e8e8ed] md:text-xl">
                  {content.highlightStat.text}
                </p>
                <p className="mt-2 font-mono text-sm text-orange-400/70">
                  — {content.highlightStat.source}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Impact cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-3 flex items-center gap-3">
                    {Icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                    )}
                    <h3 className="font-mono text-base font-semibold text-[#e8e8ed]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#8888a0]">
                    {item.description}
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
