'use client';

import { motion } from 'framer-motion';
import type { DiagramData } from '@/types';
import { cn } from '@/lib/utils';

interface DiagramProps {
  data: DiagramData;
  className?: string;
}

const nodeIcons: Record<string, JSX.Element> = {
  cloud: (
    <path
      d="M4 20h16a4 4 0 0 0 0-8 5 5 0 0 0-9.2-3.3A6 6 0 0 0 4 15v1a4 4 0 0 0 0 4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  ),
  firewall: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  server: (
    <>
      <rect x="6" y="4" width="12" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="14" width="12" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="9" cy="17" r="1" fill="currentColor" />
    </>
  ),
  switch: (
    <>
      <rect x="4" y="8" width="16" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  workstation: (
    <>
      <rect x="5" y="4" width="14" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 18h8M12 14v4" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  vpn: (
    <>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4v16M4 12h16M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M8 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
};

export function Diagram({ data, className }: DiagramProps) {
  const { nodes, connections } = data;

  return (
    <div className={cn('relative w-full overflow-x-auto', className)}>
      <svg
        viewBox="0 0 800 580"
        className="mx-auto h-auto w-full max-w-3xl"
        style={{ minWidth: '600px' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,240,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.g key={`${conn.from}-${conn.to}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                x1={fromNode.x}
                y1={fromNode.y + 25}
                x2={toNode.x}
                y2={toNode.y - 25}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              {conn.label && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  fill="#8888a0"
                  fontSize="10"
                  className="font-mono"
                >
                  {conn.label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Line gradient */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ff41" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            {/* Node background */}
            <rect
              x={node.x - 45}
              y={node.y - 25}
              width="90"
              height="50"
              rx="8"
              fill="#12121a"
              stroke={node.type === 'firewall' ? '#ff6b35' : '#00f0ff'}
              strokeWidth="1.5"
              opacity="0.9"
            />
            
            {/* Icon */}
            <g
              transform={`translate(${node.x - 12}, ${node.y - 18})`}
              className={node.type === 'firewall' ? 'text-orange-400' : 'text-cyan-400'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                {nodeIcons[node.type]}
              </svg>
            </g>

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 12}
              textAnchor="middle"
              fill="#e8e8ed"
              fontSize="9"
              className="font-mono"
            >
              {node.label.split('\n').map((line, i) => (
                <tspan key={i} x={node.x} dy={i === 0 ? 0 : 10}>
                  {line}
                </tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
