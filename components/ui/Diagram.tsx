'use client';

import { memo } from 'react';
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

function getLabelPosition(
  sx: number, sy: number, ex: number, ey: number,
  isBranch: boolean
): { x: number; y: number } {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);

  const baseOffset = isBranch ? 28 : 20;

  if (ay > ax * 1.5) {
    // Vertical line: offset to the right
    return { x: mx + baseOffset + 8, y: my };
  } else if (ax > ay * 1.5) {
    // Horizontal line: offset above
    return { x: mx, y: my - baseOffset };
  } else {
    // Diagonal: perpendicular offset
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
      x: mx + (-dy / len) * baseOffset,
      y: my + (dx / len) * baseOffset,
    };
  }
}

export const Diagram = memo(function Diagram({ data, className }: DiagramProps) {
  const { nodes, connections, zones, legend, note } = data;

  const pad = 60;
  const noteHeight = note ? 48 : 0;
  const legendHeight = legend ? legend.length * 22 + 8 : 0;
  const bottomPad = 20 + noteHeight + legendHeight;

  const minX = Math.min(...nodes.map((n) => n.x)) - NODE_W / 2 - pad;
  const maxX = Math.max(...nodes.map((n) => n.x)) + NODE_W / 2 + pad;
  const minY = Math.min(...nodes.map((n) => n.y)) - NODE_H / 2 - pad;
  const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_H / 2 + bottomPad;
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
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,180,216,0.02)" strokeWidth="0.5" />
          </pattern>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="zoneGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /></feMerge>
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
          <marker id="arrowThin" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#aabbcc" opacity="0.8" />
          </marker>
        </defs>

        <rect x={minX} y={minY} width={W} height={H} fill="url(#grid)" />

        {/* Zones */}
        {zones?.map((zone) => (
          <g key={zone.id}>
            <rect
              x={zone.x} y={zone.y} width={zone.width} height={zone.height}
              rx="16" fill={zone.color} fillOpacity="0.45"
              stroke="rgba(0,180,216,0.1)" strokeWidth="1"
              filter="url(#zoneGlow)"
            />
            <text
              x={zone.x + 14} y={zone.y + 20}
              fill="rgba(0,180,216,0.4)" fontSize="10"
              fontFamily="JetBrains Mono, monospace" fontWeight="600"
              letterSpacing="1.2"
            >{zone.label.toUpperCase()}</text>
          </g>
        ))}

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from);
          const to = nodes.find((n) => n.id === conn.to);
          if (!from || !to) return null;

          const isMain = conn.style === 'thick';
          const isBranch = conn.style === 'thin';
          const isDashed = conn.style === 'dashed';
          const isOrange = from.type === 'firewall' || to.type === 'firewall';

          let grad: string, markerId: string, strokeWidth: number, strokeDash: string;
          if (isMain) {
            grad = 'url(#cyanGrad)';
            markerId = 'url(#arrowCyan)';
            strokeWidth = 3;
            strokeDash = 'none';
          } else if (isBranch) {
            grad = '#aabbcc';
            markerId = 'url(#arrowThin)';
            strokeWidth = 1.5;
            strokeDash = 'none';
          } else if (isDashed) {
            grad = 'url(#cyanGrad)';
            markerId = 'url(#arrowCyan)';
            strokeWidth = 2;
            strokeDash = '6,4';
          } else {
            grad = isOrange ? 'url(#orangeGrad)' : 'url(#cyanGrad)';
            markerId = isOrange ? 'url(#arrowOrange)' : 'url(#arrowCyan)';
            strokeWidth = 2;
            strokeDash = 'none';
          }

          const s = edgePoint(from, to.x, to.y);
          const e = edgePoint(to, from.x, from.y);

          const labelPos = getLabelPosition(s.x, s.y, e.x, e.y, isBranch);

          const labelWidth = conn.label ? conn.label.length * 7 + 16 : 0;

          return (
            <motion.g key={`${conn.from}-${conn.to}`}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: isMain ? 0.7 : 0.5, delay: i * 0.06 }}
                x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                stroke={grad} strokeWidth={strokeWidth}
                strokeDasharray={strokeDash}
                markerEnd={markerId}
                filter="url(#lineGlow)"
              />
              {conn.label && (
                <g>
                  <rect
                    x={labelPos.x - labelWidth / 2}
                    y={labelPos.y - 10}
                    width={labelWidth}
                    height="20" rx="4"
                    fill="#0a0a0f" fillOpacity="0.92"
                    stroke={isBranch ? 'rgba(170,187,204,0.2)' : 'rgba(0,180,216,0.15)'}
                    strokeWidth="0.5"
                  />
                  <text
                    x={labelPos.x} y={labelPos.y + 4}
                    textAnchor="middle"
                    fill={isBranch ? '#aabbcc' : '#b0c4de'}
                    fontSize={isBranch ? 9 : 9}
                    fontFamily="JetBrains Mono, monospace"
                  >{conn.label}</text>
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
          const isBranch = node.role === 'branch';

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
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <rect
                x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
                width={NODE_W} height={NODE_H} rx={R}
                fill={c.fill} stroke={c.stroke} strokeWidth={isBranch ? 1 : 1.5}
                strokeDasharray={isBranch ? '4,3' : 'none'}
                filter="url(#nodeGlow)" opacity={isBranch ? 0.85 : 0.95}
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
                  fontSize={isBranch ? 10 : 11}
                  fontWeight={isBranch ? 500 : 600}
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="0.3"
                  opacity={isBranch ? 0.85 : 1}
                >{l}</text>
              ))}
            </motion.g>
          );
        })}

        {/* Legend */}
        {legend && legend.length > 0 && (
          <g transform={`translate(${minX + 16}, ${maxY - bottomPad + 8})`}>
            {legend.map((item, i) => (
              <g key={i} transform={`translate(0, ${i * 22})`}>
                <rect x="0" y="0" width="12" height="12" rx="3" fill={item.color} opacity="0.8" />
                <text x="18" y="10" fill="#8899aa" fontSize="10" fontFamily="JetBrains Mono, monospace">{item.label}</text>
              </g>
            ))}
          </g>
        )}

        {/* Note - split into 2 lines */}
        {note && (
          <g transform={`translate(${minX + 16}, ${maxY - 16})`}>
            <rect x="0" y="-36" width={W - 32} height="40" rx="6" fill="#0a0a0f" fillOpacity="0.85" stroke="rgba(0,180,216,0.12)" strokeWidth="0.5" />
            <text x="12" y="-16" fill="#8899aa" fontSize="10" fontFamily="JetBrains Mono, monospace">
              💡 El IDS es pasivo: genera alerta pero el tráfico continúa.
            </text>
            <text x="12" y="-2" fill="#8899aa" fontSize="10" fontFamily="JetBrains Mono, monospace">
               El IPS es activo: puede bloquear el tráfico en tiempo real.
            </text>
          </g>
        )}
      </svg>
    </div>
  );
});
