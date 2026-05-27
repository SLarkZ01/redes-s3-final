'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/GlassCard';
import { Diagram } from '@/components/ui/Diagram';
import { GlowText } from '@/components/ui/GlowText';
import type { RecursosVisualesContent, BaseSectionProps } from '@/types';

interface RecursosVisualesSectionProps extends BaseSectionProps {
  content: RecursosVisualesContent;
}

export function RecursosVisualesSection({
  content,
  id,
  className,
}: RecursosVisualesSectionProps) {
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

        {/* Videos section */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            Videos Educativos
          </h3>

          <div className="grid gap-8 lg:grid-cols-2">
            {content.videos.slice(0, 2).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full">
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="mb-2 font-mono text-base font-semibold text-[#e8e8ed]">
                    {video.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#8888a0]">
                    {video.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Third video - full width */}
          {content.videos[2] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="aspect-video overflow-hidden rounded-lg lg:order-2">
                    <iframe
                      src={content.videos[2].url}
                      title={content.videos[2].title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div>
                    <h4 className="mb-2 font-mono text-lg font-semibold text-[#e8e8ed]">
                      {content.videos[2].title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#8888a0]">
                      {content.videos[2].description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Network Architecture Diagram */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            Arquitectura de Red Corporativa
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <p className="mb-4 text-sm text-[#8888a0]">
                Diagrama de la arquitectura de seguridad implementada en la red
                corporativa del caso práctico. Se observa la segmentación entre
                Internet, la DMZ con servidores públicos, y la LAN interna
                protegida por el NGFW con IPS integrado.
              </p>
              <Diagram data={content.networkDiagram} />
            </Card>
          </motion.div>
        </div>

        {/* Packet Flow Diagram */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xl font-semibold text-green-400">
            Flujo de Paquetes: Firewall, IDS e IPS
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <p className="mb-4 text-sm text-[#8888a0]">
                Diagrama comparativo del flujo de un paquete a través de tres
                escenarios: Firewall (filtrado por reglas), IDS (detección
                pasiva con alertas) e IPS (bloqueo activo en línea).
              </p>
              <Diagram data={content.packetFlowDiagram} />
            </Card>
          </motion.div>
        </div>

        {/* Comparison summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card glow className="border-green-500/20 bg-green-500/5">
            <h3 className="mb-4 font-mono text-lg font-semibold text-green-400">
              Resumen Visual: IDS vs IPS vs Firewall
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-sm">
                <thead>
                  <tr className="border-b border-green-500/20">
                    <th className="p-3 text-cyan-400">Característica</th>
                    <th className="p-3 text-cyan-400">Firewall</th>
                    <th className="p-3 text-cyan-400">IDS</th>
                    <th className="p-3 text-cyan-400">IPS</th>
                  </tr>
                </thead>
                <tbody className="text-[#8888a0]">
                  <tr className="border-b border-green-500/10">
                    <td className="p-3 text-[#e8e8ed]">Función principal</td>
                    <td className="p-3">Filtrar por reglas</td>
                    <td className="p-3">Detectar y alertar</td>
                    <td className="p-3">Detectar y bloquear</td>
                  </tr>
                  <tr className="border-b border-green-500/10">
                    <td className="p-3 text-[#e8e8ed]">Ubicación</td>
                    <td className="p-3">En línea (in-line)</td>
                    <td className="p-3">Fuera de banda (SPAN/TAP)</td>
                    <td className="p-3">En línea (in-line)</td>
                  </tr>
                  <tr className="border-b border-green-500/10">
                    <td className="p-3 text-[#e8e8ed]">Acción</td>
                    <td className="p-3">Permitir / Denegar</td>
                    <td className="p-3">Notificar solamente</td>
                    <td className="p-3">Bloquear activamente</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-[#e8e8ed]">Capa OSI</td>
                    <td className="p-3">3-4 (tradicional)</td>
                    <td className="p-3">3-7</td>
                    <td className="p-3">3-7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
