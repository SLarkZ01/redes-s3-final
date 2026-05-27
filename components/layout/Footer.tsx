'use client';

import { motion } from 'framer-motion';
import { Shield, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#0a0a0f] px-4 py-12 md:pl-64">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="font-mono text-xl font-bold text-cyan-400">
              Seguridad en Redes
            </span>
          </div>

          {/* Description */}
          <p className="max-w-md text-sm text-[#8888a0]">
            Proyecto educativo sobre Firewalls, IDS e IPS para la clase de Redes
            de Computadores.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-94.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#8888a0] transition-colors hover:text-cyan-400"
            >
              <ExternalLink className="h-4 w-4" />
              NIST SP 800-94
            </a>
            <a
              href="https://www.ibm.com/reports/data-breach"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#8888a0] transition-colors hover:text-cyan-400"
            >
              <ExternalLink className="h-4 w-4" />
              IBM Report
            </a>
          </div>

          {/* Divider */}
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          {/* Copyright */}
          <p className="font-mono text-xs text-[#8888a0]">
            © 2024 — Redes de Computadores — Universidad
            <br />
            <span className="text-cyan-400/60">
              Desarrollado con Next.js, Tailwind CSS y Framer Motion
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
