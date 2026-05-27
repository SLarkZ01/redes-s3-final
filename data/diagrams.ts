import type { DiagramData } from '@/types';

export const networkDiagram: DiagramData = {
  zones: [
    { id: 'internet-zone', label: 'Zona Internet', x: 320, y: 10, width: 360, height: 130, color: '#0c1222' },
    { id: 'perimeter-zone', label: 'Perímetro', x: 140, y: 140, width: 520, height: 80, color: '#1a0e08' },
    { id: 'dmz-zone', label: 'Zona DMZ', x: 250, y: 260, width: 500, height: 200, color: '#0a1a0e' },
    { id: 'lan-zone', label: 'Zona LAN Interna', x: 200, y: 480, width: 600, height: 220, color: '#0c1222' },
  ],
  nodes: [
    { id: 'internet', label: 'Internet', x: 500, y: 70, type: 'cloud' },
    { id: 'ngfw', label: 'NGFW + IPS', x: 500, y: 180, type: 'firewall' },
    { id: 'vpn', label: 'VPN\nRemotos', x: 190, y: 180, type: 'vpn' },
    { id: 'dmz-switch', label: 'Switch DMZ', x: 500, y: 320, type: 'switch' },
    { id: 'web-server', label: 'Servidor Web', x: 340, y: 440, type: 'server' },
    { id: 'mail-server', label: 'Servidor\nCorreo', x: 660, y: 440, type: 'server' },
    { id: 'lan-switch', label: 'Switch LAN', x: 500, y: 560, type: 'switch' },
    { id: 'workstations', label: 'Estaciones\nTrabajo', x: 280, y: 670, type: 'workstation' },
    { id: 'db-server', label: 'Servidor BD', x: 500, y: 670, type: 'server' },
    { id: 'file-server', label: 'Servidor\nArchivos', x: 720, y: 670, type: 'server' },
  ],
  connections: [
    { from: 'internet', to: 'ngfw', label: 'Tráfico Externo', style: 'solid' },
    { from: 'vpn', to: 'ngfw', label: 'Túnel VPN', style: 'dashed' },
    { from: 'ngfw', to: 'dmz-switch', label: 'DMZ', style: 'solid' },
    { from: 'dmz-switch', to: 'web-server', style: 'solid' },
    { from: 'dmz-switch', to: 'mail-server', style: 'solid' },
    { from: 'dmz-switch', to: 'lan-switch', label: 'Acceso Restringido', style: 'solid' },
    { from: 'lan-switch', to: 'workstations', style: 'solid' },
    { from: 'lan-switch', to: 'db-server', style: 'solid' },
    { from: 'lan-switch', to: 'file-server', style: 'solid' },
  ],
  legend: [
    { color: '#e85d04', label: 'Firewall / IPS' },
    { color: '#00b894', label: 'Switch' },
    { color: '#00b4d8', label: 'Servidor / Estación' },
    { color: '#a855f7', label: 'VPN' },
  ],
};

export const packetFlowDiagram: DiagramData = {
  zones: [
    { id: 'input-zone', label: 'Entrada', x: 280, y: 10, width: 140, height: 80, color: '#0c1222' },
    { id: 'inspection-zone', label: 'Inspección', x: 80, y: 100, width: 540, height: 340, color: '#0a0a14' },
    { id: 'output-zone', label: 'Salida', x: 280, y: 450, width: 140, height: 80, color: '#0c1222' },
  ],
  nodes: [
    { id: 'source', label: 'Paquete\nEntrante', x: 350, y: 50, type: 'cloud', role: 'input' },
    { id: 'fw', label: 'Firewall\nReglas ACL', x: 350, y: 170, type: 'firewall', role: 'main' },
    { id: 'ids', label: 'IDS\nInspección\nPasiva', x: 350, y: 290, type: 'switch', role: 'main' },
    { id: 'ips', label: 'IPS\nInspección\nActiva', x: 350, y: 410, type: 'firewall', role: 'main' },
    { id: 'dest', label: 'Red Interna\n✅ Permitido', x: 350, y: 520, type: 'server', role: 'output' },
    { id: 'fw-deny', label: '✗ DENEGAR\n(Drop)', x: 120, y: 170, type: 'server', role: 'branch' },
    { id: 'ids-alert', label: '⚠ ALERTA\n(Log)', x: 580, y: 290, type: 'server', role: 'branch' },
    { id: 'ips-block', label: '✗ BLOQUEAR\n(Drop/RST)', x: 580, y: 410, type: 'server', role: 'branch' },
  ],
  connections: [
    { from: 'source', to: 'fw', label: '', style: 'thick' },
    { from: 'fw', to: 'ids', label: 'Coincide → permite', style: 'thick' },
    { from: 'ids', to: 'ips', label: 'Sin amenaza', style: 'thick' },
    { from: 'ips', to: 'dest', label: 'Tráfico limpio', style: 'thick' },
    { from: 'fw', to: 'fw-deny', label: 'No coincide', style: 'thin' },
    { from: 'ids', to: 'ids-alert', label: 'Detecta (pasivo)', style: 'thin' },
    { from: 'ips', to: 'ips-block', label: 'Detecta (activo)', style: 'thin' },
  ],
  note: 'El IDS es pasivo: genera alerta pero el tráfico continúa. El IPS es activo: puede bloquear el tráfico en tiempo real.',
  legend: [
    { color: '#e85d04', label: 'Firewall / IPS (activo)' },
    { color: '#00b894', label: 'IDS (pasivo)' },
    { color: '#00b4d8', label: 'Flujo principal' },
    { color: '#aabbcc', label: 'Rama de excepción' },
  ],
};
