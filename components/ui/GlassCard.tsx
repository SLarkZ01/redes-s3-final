'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export const Card = memo(function Card({
  className,
  children,
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative rounded-xl border border-cyan-500/10 bg-[#12121a]/80 p-6 backdrop-blur-xl',
        'transition-all duration-300',
        hover && 'hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10',
        glow && 'shadow-lg shadow-cyan-500/20',
        className
      )}
    >
      {children}
    </motion.div>
  );
});
