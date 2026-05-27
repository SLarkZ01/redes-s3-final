'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'green' | 'orange' | 'gradient';
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export const GlowText = memo(function GlowText({
  children,
  className,
  variant = 'cyan',
  as: Component = 'span',
}: GlowTextProps) {
  const variants = {
    cyan: 'text-cyan-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]',
    green: 'text-green-400 drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]',
    orange: 'text-orange-400 drop-shadow-[0_0_20px_rgba(255,107,53,0.5)]',
    gradient:
      'bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]',
  };

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
});
