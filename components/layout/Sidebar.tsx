'use client';

import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Shield,
  Settings,
  Workflow,
  Network,
  Video,
  BookMarked,
} from 'lucide-react';
import type { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  items: NavigationItem[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  BookOpen,
  Shield,
  Settings,
  Workflow,
  Network,
  Video,
  BookMarked,
};

export function Sidebar({ items, activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 border-r border-cyan-500/10 bg-[#0d0d14] md:block">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-cyan-500/10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Shield className="h-8 w-8 text-cyan-400" />
          <span className="font-mono text-lg font-bold text-cyan-400">
            SecRedes
          </span>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isActive = activeSection === item.id;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-mono text-sm transition-all duration-300',
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-[#8888a0] hover:bg-cyan-500/5 hover:text-cyan-400'
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Pulse dot */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute right-4 h-2 w-2 rounded-full bg-cyan-400"
                    />
                  )}

                  {Icon && (
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isActive
                          ? 'text-cyan-400'
                          : 'text-[#8888a0] group-hover:text-cyan-400'
                      )}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-500/10 p-4">
        <p className="text-center font-mono text-xs text-[#8888a0]">
          Daniel Rivas Agredo
          <br />
          Thomas Montoya Magón
          <br />
          <span className="text-cyan-400/60">Redes de Computadores — 2026</span>
        </p>
      </div>
    </aside>
  );
}
