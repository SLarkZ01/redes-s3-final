'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer = memo(function Footer() {
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
            Proyecto educativo sobre Firewalls, IDS e IPS para la asignatura de Redes
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
              href="https://d110erj175o600.cloudfront.net/wp-content/uploads/2023/07/25111651/Cost-of-a-Data-Breach-Report-2023.pdf"
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
            Daniel Rivas Agredo & Thomas Montoya Magón
            <br />
            © 2026 — Redes de Computadores — Universidad Autónoma del Cauca
            <br />
            <span className="text-cyan-400/60">
              Desarrollado con Next.js
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
});
