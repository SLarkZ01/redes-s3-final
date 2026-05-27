'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { TimelineStep } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline = memo(function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent md:left-8" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-4 md:gap-6"
          >
            {/* Step number circle */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-cyan-500 bg-[#0a0a0f] font-mono text-lg font-bold text-cyan-400 md:h-16 md:w-16 md:text-xl"
            >
              <span className="relative z-10">{step.number}</span>
              {/* Pulse animation */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border-2 border-cyan-500"
              />
            </motion.div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4 className="mb-2 font-mono text-lg font-semibold text-cyan-400 md:text-xl">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-[#8888a0] md:text-base">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
