import type { DiagramData } from '@/types';

export const networkDiagram: DiagramData = {
  nodes: [
    { id: 'internet', label: 'Internet', x: 500, y: 50, type: 'cloud' },
    { id: 'ngfw', label: 'NGFW + IPS', x: 500, y: 170, type: 'firewall' },
    { id: 'vpn', label: 'VPN\nRemotos', x: 180, y: 170, type: 'vpn' },
    { id: 'dmz-switch', label: 'Switch DMZ', x: 500, y: 300, type: 'switch' },
    { id: 'web-server', label: 'Servidor Web', x: 320, y: 420, type: 'server' },
    { id: 'mail-server', label: 'Servidor\nCorreo', x: 680, y: 420, type: 'server' },
    { id: 'lan-switch', label: 'Switch LAN', x: 500, y: 540, type: 'switch' },
    { id: 'workstations', label: 'Estaciones\nTrabajo', x: 280, y: 660, type: 'workstation' },
    { id: 'db-server', label: 'Servidor BD', x: 500, y: 660, type: 'server' },
    { id: 'file-server', label: 'Servidor\nArchivos', x: 720, y: 660, type: 'server' },
  ],
  connections: [
    { from: 'internet', to: 'ngfw', label: 'Tráfico Externo' },
    { from: 'vpn', to: 'ngfw', label: 'Túnel VPN' },
    { from: 'ngfw', to: 'dmz-switch', label: 'DMZ' },
    { from: 'dmz-switch', to: 'web-server' },
    { from: 'dmz-switch', to: 'mail-server' },
    { from: 'dmz-switch', to: 'lan-switch', label: 'Restringido' },
    { from: 'lan-switch', to: 'workstations' },
    { from: 'lan-switch', to: 'db-server' },
    { from: 'lan-switch', to: 'file-server' },
  ],
};

export const packetFlowDiagram: DiagramData = {
  nodes: [
    // Main pipeline (center column)
    { id: 'source', label: 'Paquete\nEntrante', x: 350, y: 50, type: 'cloud' },
    { id: 'fw', label: 'Firewall\nReglas ACL', x: 350, y: 170, type: 'firewall' },
    { id: 'ids', label: 'IDS\nInspección\nPasiva', x: 350, y: 290, type: 'switch' },
    { id: 'ips', label: 'IPS\nInspección\nActiva', x: 350, y: 410, type: 'firewall' },
    { id: 'dest', label: 'Red\nInterna', x: 350, y: 540, type: 'server' },

    // Side branches - Firewall outcomes
    { id: 'fw-deny', label: 'DENEGAR\n(Drop)', x: 130, y: 170, type: 'server' },

    // Side branches - IDS outcomes
    { id: 'ids-alert', label: 'GENERAR\nALERTA', x: 570, y: 290, type: 'server' },

    // Side branches - IPS outcomes
    { id: 'ips-block', label: 'BLOQUEAR\n(Drop/RST)', x: 570, y: 410, type: 'server' },
  ],
  connections: [
    // Main pipeline
    { from: 'source', to: 'fw', label: '' },
    { from: 'fw', to: 'ids', label: 'Permite' },
    { from: 'ids', to: 'ips', label: 'Pasa' },
    { from: 'ips', to: 'dest', label: 'Limpio' },

    // Firewall branch
    { from: 'fw', to: 'fw-deny', label: 'No coincide' },

    // IDS branch (passive - doesn't block, just alerts)
    { from: 'ids', to: 'ids-alert', label: 'Detecta amenaza' },

    // IPS branch (active - can block)
    { from: 'ips', to: 'ips-block', label: 'Detecta amenaza' },
  ],
};
