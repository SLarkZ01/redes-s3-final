'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import {
  Home,
  BookOpen,
  Settings,
  Workflow,
  Network,
  Video,
  BookMarked,
} from 'lucide-react';
import type { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
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

export function Header({ items, activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-500/10 bg-[#0d0d14]/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyan-400" />
          <span className="font-mono text-lg font-bold text-cyan-400">
            NetSec
          </span>
        </div>

        {/* Menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-cyan-400 transition-colors hover:bg-cyan-500/10"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-cyan-500/10 bg-[#0d0d14]"
          >
            <ul className="p-4">
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
                      onClick={() => handleNavigate(item.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-mono text-sm transition-all',
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'text-[#8888a0] hover:bg-cyan-500/5 hover:text-cyan-400'
                      )}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileIndicator"
                          className="ml-auto h-2 w-2 rounded-full bg-cyan-400"
                        />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
