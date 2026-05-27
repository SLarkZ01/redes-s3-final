'use client';

import { motion } from 'framer-motion';
import { Ban, ShieldOff, Eye, CheckCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { Diagram } from '@/components/ui/Diagram';
import { GlowText } from '@/components/ui/GlowText';
import type { EjemploContent, BaseSectionProps, DiagramData } from '@/types';

interface EjemploSectionProps extends BaseSectionProps {
  content: EjemploContent;
  diagramData: DiagramData;
}

const resultIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ban,
  ShieldOff,
  Eye,
  CheckCircle,
};

export function EjemploSection({
  content,
  diagramData,
  id,
  className,
}: EjemploSectionProps) {
  return (
    <Section id={id} className={className}>
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center font-mono text-3xl font-bold md:text-4xl"
        >
          <GlowText variant="cyan">{content.title}</GlowText>
        </motion.h2>

        {content.subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center font-mono text-lg text-green-400"
          >
            {content.subtitle}
          </motion.p>
        )}

        {/* Scenario description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card>
            <h3 className="mb-4 font-mono text-lg font-semibold text-cyan-400">
              Escenario
            </h3>
            <p className="leading-relaxed text-[#8888a0]">{content.content}</p>
          </Card>
        </motion.div>

        {/* Network diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <h3 className="mb-6 font-mono text-lg font-semibold text-cyan-400">
              Arquitectura de Red
            </h3>
            <Diagram data={diagramData} />
          </Card>
        </motion.div>

        {/* Configuration */}
        <div className="mb-12">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            Configuración Aplicada
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {content.configuration.map((config, index) => (
              <motion.div
                key={config.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-500/20 font-mono text-xs text-cyan-400">
                      {index + 1}
                    </span>
                    <h4 className="font-mono text-sm font-semibold text-[#e8e8ed]">
                      {config.title}
                    </h4>
                  </div>
                  <p className="text-sm text-[#8888a0]">{config.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            Resultados
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.results.map((result, index) => {
              const Icon = resultIconMap[result.icon];

              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/5 p-4"
                >
                  {Icon && <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />}
                  <p className="text-sm text-[#e8e8ed]">{result.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
