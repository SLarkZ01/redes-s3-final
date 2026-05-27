import type { DiagramData } from '@/types';

export const networkDiagram: DiagramData = {
  nodes: [
    { id: 'internet', label: 'Internet', x: 400, y: 40, type: 'cloud' },
    { id: 'ngfw', label: 'NGFW + IPS', x: 400, y: 140, type: 'firewall' },
    { id: 'vpn', label: 'VPN\nEmpleados Remotos', x: 150, y: 140, type: 'vpn' },
    { id: 'dmz-switch', label: 'DMZ', x: 400, y: 240, type: 'switch' },
    { id: 'web-server', label: 'Servidor Web', x: 300, y: 320, type: 'server' },
    { id: 'mail-server', label: 'Servidor Correo', x: 500, y: 320, type: 'server' },
    { id: 'lan-switch', label: 'LAN Interna', x: 400, y: 420, type: 'switch' },
    { id: 'workstations', label: 'Estaciones\nde Trabajo', x: 250, y: 500, type: 'workstation' },
    { id: 'db-server', label: 'Servidor BD', x: 400, y: 500, type: 'server' },
    { id: 'file-server', label: 'Servidor\nArchivos', x: 550, y: 500, type: 'server' },
  ],
  connections: [
    { from: 'internet', to: 'ngfw', label: 'Tráfico Externo' },
    { from: 'vpn', to: 'ngfw', label: 'Túnel VPN' },
    { from: 'ngfw', to: 'dmz-switch' },
    { from: 'dmz-switch', to: 'web-server' },
    { from: 'dmz-switch', to: 'mail-server' },
    { from: 'dmz-switch', to: 'lan-switch' },
    { from: 'lan-switch', to: 'workstations' },
    { from: 'lan-switch', to: 'db-server' },
    { from: 'lan-switch', to: 'file-server' },
  ],
};
