'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileSearch,
  Activity,
  ClipboardCheck,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { GlowText } from '@/components/ui/GlowText';
import type { CaracteristicasContent, BaseSectionProps } from '@/types';
import { cn } from '@/lib/utils';

interface CaracteristicasSectionProps extends BaseSectionProps {
  content: CaracteristicasContent;
}

const detectionIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileSearch,
  Activity,
  ClipboardCheck,
};

export function CaracteristicasSection({
  content,
  id,
  className,
}: CaracteristicasSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

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

        {/* A) Firewall Types - Tab component */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            A) Tipos de Firewalls
          </h3>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {content.firewallTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  'rounded-lg px-4 py-2 font-mono text-sm transition-all',
                  activeTab === index
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-[#12121a]/50 text-[#8888a0] hover:bg-cyan-500/10 hover:text-cyan-400'
                )}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <h4 className="mb-3 font-mono text-lg font-semibold text-cyan-400">
                {content.firewallTypes[activeTab].name}
              </h4>
              <p className="mb-4 text-[#8888a0]">
                {content.firewallTypes[activeTab].description}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-[#0a0a0f] p-3">
                  <span className="font-mono text-xs text-[#8888a0]">Capa OSI</span>
                  <p className="font-mono text-sm text-[#e8e8ed]">
                    {content.firewallTypes[activeTab].layer}
                  </p>
                </div>
                <div className="rounded-lg bg-green-500/5 p-3">
                  <span className="font-mono text-xs text-green-400">Ventaja</span>
                  <p className="font-mono text-sm text-[#e8e8ed]">
                    {content.firewallTypes[activeTab].pros}
                  </p>
                </div>
                <div className="rounded-lg bg-orange-500/5 p-3">
                  <span className="font-mono text-xs text-orange-400">Desventaja</span>
                  <p className="font-mono text-sm text-[#e8e8ed]">
                    {content.firewallTypes[activeTab].cons}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* B) Detection Methods */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            B) Métodos de Detección (IDS/IPS)
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {content.detectionMethods.map((method, index) => {
              const Icon = detectionIconMap[method.icon];

              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="mb-4 flex items-center gap-3">
                      {Icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                          <Icon className="h-5 w-5 text-cyan-400" />
                        </div>
                      )}
                      <h4 className="font-mono text-base font-semibold text-[#e8e8ed]">
                        {method.name}
                      </h4>
                    </div>
                    <p className="mb-4 text-sm text-[#8888a0]">{method.description}</p>
                    <div className="rounded-lg bg-[#0a0a0f] p-3">
                      <span className="font-mono text-xs text-cyan-400/70">
                        Efectividad
                      </span>
                      <p className="mt-1 text-xs text-[#8888a0]">
                        {method.effectiveness}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* C) Operation Modes */}
        <div>
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            C) Modos de Operación
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {content.operationModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card
                  className={cn(
                    'h-full',
                    mode.type === 'active' && 'border-orange-500/20'
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        mode.type === 'passive'
                          ? 'bg-cyan-500/10'
                          : 'bg-orange-500/10'
                      )}
                    >
                      {mode.type === 'passive' ? (
                        <Eye className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <ShieldAlert className="h-5 w-5 text-orange-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-mono text-base font-semibold text-[#e8e8ed]">
                        {mode.name}
                      </h4>
                      <span
                        className={cn(
                          'font-mono text-xs',
                          mode.type === 'passive'
                            ? 'text-cyan-400/70'
                            : 'text-orange-400/70'
                        )}
                      >
                        {mode.type === 'passive' ? 'Pasivo' : 'Activo'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#8888a0]">{mode.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
