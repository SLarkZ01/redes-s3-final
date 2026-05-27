'use client';

import { motion } from 'framer-motion';
import { Cloud, Shield, Server, Network, Monitor, Lock } from 'lucide-react';
import type { DiagramData } from '@/types';
import { cn } from '@/lib/utils';

interface DiagramProps {
  data: DiagramData;
  className?: string;
}

const NODE_W = 140;
const NODE_H = 68;
const R = 12;

const nodeColors: Record<string, { fill: string; stroke: string; text: string }> = {
  cloud: { fill: '#0c1222', stroke: '#00b4d8', text: '#90e0ef' },
  firewall: { fill: '#1a0e08', stroke: '#e85d04', text: '#ffba08' },
  server: { fill: '#0c1222', stroke: '#00b4d8', text: '#caf0f8' },
  switch: { fill: '#0a1a0e', stroke: '#00b894', text: '#a8f0d4' },
  workstation: { fill: '#0c1222', stroke: '#00b4d8', text: '#caf0f8' },
  vpn: { fill: '#140e1e', stroke: '#a855f7', text: '#d8b4fe' },
};

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cloud: Cloud,
  firewall: Shield,
  server: Server,
  switch: Network,
  workstation: Monitor,
  vpn: Lock,
};

function edgePoint(
  node: { x: number; y: number },
  tx: number,
  ty: number
): { x: number; y: number } {
  const hw = NODE_W / 2;
  const hh = NODE_H / 2;
  const dx = tx - node.x;
  const dy = ty - node.y;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  let x: number, y: number;
  if (ax * hh > ay * hw) {
    x = node.x + (dx > 0 ? hw : -hw);
    y = node.y + (dy * hw) / ax;
  } else {
    x = node.x + (dx * hh) / ay;
    y = node.y + (dy > 0 ? hh : -hh);
  }
  return { x, y };
}

export function Diagram({ data, className }: DiagramProps) {
  const { nodes, connections } = data;

  const pad = 60;
  const minX = Math.min(...nodes.map((n) => n.x)) - NODE_W / 2 - pad;
  const maxX = Math.max(...nodes.map((n) => n.x)) + NODE_W / 2 + pad;
  const minY = Math.min(...nodes.map((n) => n.y)) - NODE_H / 2 - pad;
  const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_H / 2 + pad;
  const W = maxX - minX;
  const H = maxY - minY;

  return (
    <div className={cn('relative w-full overflow-x-auto', className)}>
      <svg
        viewBox={`${minX} ${minY} ${W} ${H}`}
        className="mx-auto h-auto w-full"
        style={{ minWidth: '800px' }}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,180,216,0.025)" strokeWidth="0.5" />
          </pattern>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00b894" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e85d04" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#dc2f02" stopOpacity="0.65" />
          </linearGradient>
          <marker id="arrowCyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#00b4d8" opacity="0.8" />
          </marker>
          <marker id="arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#e85d04" opacity="0.8" />
          </marker>
        </defs>

        <rect x={minX} y={minY} width={W} height={H} fill="url(#grid)" />

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from);
          const to = nodes.find((n) => n.id === conn.to);
          if (!from || !to) return null;

          const isOrange = from.type === 'firewall' || to.type === 'firewall';
          const grad = isOrange ? 'url(#orangeGrad)' : 'url(#cyanGrad)';
          const markerId = isOrange ? 'url(#arrowOrange)' : 'url(#arrowCyan)';

          const s = edgePoint(from, to.x, to.y);
          const e = edgePoint(to, from.x, from.y);

          const mx = (s.x + e.x) / 2;
          const my = (s.y + e.y) / 2;
          const dx = e.x - s.x;
          const dy = e.y - s.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const offX = (-dy / len) * 16;
          const offY = (dx / len) * 16;

          return (
            <motion.g key={`${conn.from}-${conn.to}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                stroke={grad} strokeWidth="2"
                markerEnd={markerId}
                filter="url(#lineGlow)"
              />
              {conn.label && (
                <g>
                  <rect x={mx + offX - 38} y={my + offY - 10} width="76" height="20" rx="4" fill="#0a0a0f" fillOpacity="0.9" stroke="rgba(0,180,216,0.12)" strokeWidth="0.5" />
                  <text x={mx + offX} y={my + offY + 4} textAnchor="middle" fill="#8899aa" fontSize="9" fontFamily="JetBrains Mono, monospace">{conn.label}</text>
                </g>
              )}
            </motion.g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const c = nodeColors[node.type] || nodeColors.server;
          const Icon = IconMap[node.type];
          const lines = node.label.split('\n');
          const isFw = node.type === 'firewall';

          const iconSize = 22;
          const lineHeight = 13;
          const lineGap = 2;
          const iconToTextGap = 6;
          const totalContentH = iconSize + iconToTextGap + lines.length * lineHeight + (lines.length - 1) * lineGap;
          const contentTopY = node.y - totalContentH / 2;
          const iconY = contentTopY + iconSize / 2;
          const textStartY = contentTopY + iconSize + iconToTextGap + lineHeight / 2;

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <rect
                x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
                width={NODE_W} height={NODE_H} rx={R}
                fill={c.fill} stroke={c.stroke} strokeWidth="1.5"
                filter="url(#nodeGlow)" opacity="0.95"
              />
              <rect
                x={node.x - NODE_W / 2 + 2} y={node.y - NODE_H / 2 + 2}
                width={NODE_W - 4} height={NODE_H - 4} rx={R - 2}
                fill="none" stroke={c.stroke} strokeWidth="0.5" opacity="0.2"
              />
              {Icon && (
                <foreignObject x={node.x - iconSize / 2} y={iconY - iconSize / 2} width={iconSize} height={iconSize}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Icon className="w-5 h-5" style={{ color: c.stroke, strokeWidth: 1.5 }} />
                  </div>
                </foreignObject>
              )}
              {lines.map((l, li) => (
                <text
                  key={li}
                  x={node.x}
                  y={textStartY + li * (lineHeight + lineGap)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isFw ? c.text : c.text}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.3"
                >{l}</text>
              ))}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
