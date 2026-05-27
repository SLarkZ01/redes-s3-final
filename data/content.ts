import type {
  NavigationItem,
  HeroContent,
  DefinicionContent,
  ImportanciaContent,
  CaracteristicasContent,
  FuncionamientoContent,
  EjemploContent,
  RecursosVisualesContent,
  ReferenciasContent,
} from '@/types';
import { networkDiagram, packetFlowDiagram } from './diagrams';

export const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Inicio', icon: 'Home' },
  { id: 'definicion', label: 'Definición', icon: 'BookOpen' },
  { id: 'importancia', label: 'Importancia', icon: 'Shield' },
  { id: 'caracteristicas', label: 'Características', icon: 'Settings' },
  { id: 'funcionamiento', label: 'Funcionamiento', icon: 'Workflow' },
  { id: 'ejemplo', label: 'Caso Práctico', icon: 'Network' },
  { id: 'recursos', label: 'Recursos Visuales', icon: 'Video' },
  { id: 'referencias', label: 'Referencias', icon: 'BookMarked' },
];

export const heroContent: HeroContent = {
  id: 'hero',
  title: 'Seguridad en Redes',
  subtitle: 'Firewalls, IDS e IPS — Protegiendo la infraestructura digital',
  typingTexts: [
    'Firewalls',
    'IDS (Intrusion Detection System)',
    'IPS (Intrusion Prevention System)',
    'Protegiendo la infraestructura digital',
  ],
};

export const definicionContent: DefinicionContent = {
  id: 'definicion',
  title: '1. Definición del Tema',
  definitions: [
    {
      id: 'firewall',
      title: 'Firewall',
      description:
        'Un firewall es un sistema de seguridad que monitorea y controla el tráfico de red entrante y saliente basándose en reglas de seguridad predefinidas. Actúa como una barrera entre una red interna confiable y redes externas no confiables (como Internet). Los firewalls pueden ser de hardware, software o una combinación de ambos.',
      icon: 'Shield',
    },
    {
      id: 'ids',
      title: 'IDS (Intrusion Detection System)',
      description:
        'Un Sistema de Detección de Intrusiones monitorea el tráfico de red en busca de actividad sospechosa y emite alertas cuando se detecta. El IDS es un sistema pasivo: detecta y notifica, pero no bloquea el tráfico por sí mismo. Se ubica fuera de banda (out-of-band), es decir, recibe una copia del tráfico.',
      icon: 'Eye',
    },
    {
      id: 'ips',
      title: 'IPS (Intrusion Prevention System)',
      description:
        'Un Sistema de Prevención de Intrusiones realiza las mismas funciones de detección que un IDS, pero con una capacidad adicional crítica: puede bloquear o prevenir automáticamente las amenazas detectadas. El IPS se ubica en línea (in-line), directamente en el camino del tráfico, lo que le permite tomar acciones en tiempo real como descartar paquetes maliciosos o bloquear direcciones IP.',
      icon: 'ShieldAlert',
    },
  ],
};

export const importanciaContent: ImportanciaContent = {
  id: 'importancia',
  title: '2. Importancia en las Redes de Computadores',
  items: [
    {
      id: 'primera-linea',
      title: 'Primera Línea de Defensa',
      description:
        'Actúan como la primera barrera contra ataques externos e internos, filtrando el tráfico malicioso antes de que llegue a los sistemas críticos.',
      icon: 'ShieldCheck',
    },
    {
      id: 'datos-sensibles',
      title: 'Protección de Datos Sensibles',
      description:
        'Salvaguardan información personal, financiera y propiedad intelectual de accesos no autorizados y exfiltración.',
      icon: 'Lock',
    },
    {
      id: 'cumplimiento',
      title: 'Cumplimiento Normativo',
      description:
        'GDPR, PCI-DSS y HIPAA requieren controles de seguridad de red. Estos sistemas son esenciales para cumplir con regulaciones.',
      icon: 'FileCheck',
    },
    {
      id: 'prevencion',
      title: 'Prevención de Accesos No Autorizados',
      description:
        'Evitan intrusiones que pueden derivar en robo de datos, ransomware o espionaje industrial.',
      icon: 'UserX',
    },
    {
      id: 'costo',
      title: 'Reducción de Costos',
      description:
        'Un solo incidente de seguridad puede costar millones en pérdidas, sanciones legales y daño reputacional.',
      icon: 'DollarSign',
    },
    {
      id: 'trabajo-remoto',
      title: 'Era del Trabajo Remoto',
      description:
        'Con el crecimiento del trabajo remoto y cloud computing, la superficie de ataque se expande, haciendo estos sistemas más críticos que nunca.',
      icon: 'Cloud',
    },
  ],
  highlightStat: {
    text: 'Según IBM, el costo promedio de una brecha de seguridad en 2023 fue de $4.45 millones de dólares.',
    source: 'IBM Cost of a Data Breach Report 2023',
  },
};

export const caracteristicasContent: CaracteristicasContent = {
  id: 'caracteristicas',
  title: '3. Características Principales',
  firewallTypes: [
    {
      id: 'packet-filtering',
      name: 'Filtrado de Paquetes',
      description:
        'Examina encabezados de paquetes (IP origen/destino, puertos, protocolo).',
      layer: 'Capa 3-4 OSI',
      pros: 'Más rápido',
      cons: 'Menos seguro',
    },
    {
      id: 'stateful',
      name: 'Stateful Inspection',
      description:
        'Mantiene una tabla de estado de conexiones activas. Solo permite paquetes que pertenecen a una conexión establecida.',
      layer: 'Capa 3-4 con contexto de sesión',
      pros: 'Balance rendimiento/seguridad',
      cons: 'Mayor uso de memoria',
    },
    {
      id: 'proxy',
      name: 'Proxy Firewall',
      description:
        'Actúa como intermediario a nivel de aplicación. Inspecciona el contenido del tráfico (HTTP, FTP, DNS).',
      layer: 'Capa 7 OSI',
      pros: 'Más seguro',
      cons: 'Más lento',
    },
    {
      id: 'ngfw',
      name: 'Next-Generation Firewall (NGFW)',
      description:
        'Combina filtrado tradicional con inspección profunda de paquetes (DPI), IPS integrado, control de aplicaciones y filtrado por identidad.',
      layer: 'Capas 3-7',
      pros: 'Protección integral',
      cons: 'Mayor costo',
    },
  ],
  detectionMethods: [
    {
      id: 'firmas',
      name: 'Detección Basada en Firmas',
      description:
        'Compara el tráfico contra una base de datos de patrones de ataques conocidos. Similar a un antivirus de red.',
      effectiveness:
        'Muy efectivo contra amenazas conocidas, ineficaz contra ataques de día cero.',
      icon: 'FileSearch',
    },
    {
      id: 'anomalias',
      name: 'Detección Basada en Anomalías',
      description:
        'Establece una línea base de comportamiento normal de la red y alerta sobre desviaciones.',
      effectiveness:
        'Puede detectar amenazas desconocidas, pero genera más falsos positivos.',
      icon: 'Activity',
    },
    {
      id: 'politicas',
      name: 'Detección Basada en Políticas',
      description:
        'Evalúa si el tráfico cumple con políticas de seguridad predefinidas (ej. "no se permite tráfico FTP fuera del horario laboral").',
      effectiveness:
        'Flexible y personalizable según necesidades de la organización.',
      icon: 'ClipboardCheck',
    },
  ],
  operationModes: [
    {
      id: 'ids-mode',
      name: 'Modo IDS (Pasivo)',
      type: 'passive',
      description:
        'Recibe copia del tráfico vía SPAN port o TAP. Detecta y alerta, no interviene.',
    },
    {
      id: 'ips-mode',
      name: 'Modo IPS (Activo)',
      type: 'active',
      description:
        'Se ubica en línea. Puede descartar paquetes, resetear conexiones o bloquear IPs automáticamente.',
    },
  ],
};

export const funcionamientoContent: FuncionamientoContent = {
  id: 'funcionamiento',
  title: '4. Funcionamiento Paso a Paso',
  steps: [
    {
      number: 1,
      title: 'Llegada del paquete',
      description:
        'Un paquete de datos llega a la interfaz de red del firewall o IPS. El sistema captura el paquete completo incluyendo encabezados y carga útil (payload).',
    },
    {
      number: 2,
      title: 'Inspección de encabezados',
      description:
        'El firewall examina los encabezados del paquete: dirección IP de origen y destino, puertos TCP/UDP, tipo de protocolo, y en firewalls stateful, el estado de la conexión en la tabla de sesiones.',
    },
    {
      number: 3,
      title: 'Comparación contra reglas',
      description:
        'El paquete se compara secuencialmente contra el conjunto de reglas configuradas (ACL — Access Control List). Las reglas definen qué tráfico está PERMITIDO o DENEGADO según criterios como IP, puerto, protocolo, horario, etc. La primera regla que coincida determina la acción.',
    },
    {
      number: 4,
      title: 'Detección de amenazas (IDS/IPS)',
      description:
        'Si el sistema incluye capacidades IDS/IPS, el contenido del paquete se compara contra la base de datos de firmas de ataques. Se analizan patrones como intentos de inyección SQL, escaneo de puertos, exploits conocidos, tráfico de malware, etc. En sistemas basados en anomalías, se compara contra el perfil de comportamiento normal.',
    },
    {
      number: 5,
      title: 'Decisión y acción',
      description:
        'Firewall sin IPS: PERMITIR (forward) o DENEGAR (drop) el paquete y registrarlo en el log. Modo IDS: Generar una alerta si se detecta amenaza. Modo IPS: Si se detecta amenaza, bloquear activamente (drop), resetear la conexión TCP (RST), o bloquear temporalmente la IP de origen.',
    },
    {
      number: 6,
      title: 'Registro y monitoreo',
      description:
        'Toda la actividad se registra en logs para auditoría, análisis forense y cumplimiento normativo. Los logs se envían típicamente a un sistema SIEM (Security Information and Event Management) para correlación centralizada. Los administradores revisan alertas y ajustan reglas según sea necesario.',
    },
  ],
};

export const ejemploContent: EjemploContent = {
  id: 'ejemplo',
  title: '5. Ejemplo o Caso Práctico',
  subtitle: 'Protección de una red corporativa con Firewall NGFW + IPS',
  content:
    'Una empresa mediana con 200 empleados necesita proteger su red corporativa. La red tiene una DMZ con servidores web y correo accesibles desde Internet, una LAN interna con estaciones de trabajo, servidores de archivos y bases de datos, una VPN para empleados remotos, y conexión a Internet a través de un ISP.',
  configuration: [
    {
      id: 'dmz-rules',
      title: 'Reglas de firewall en la DMZ',
      description:
        'Solo permitir HTTP/HTTPS (80/443) al servidor web desde Internet. Solo SMTP (25) al servidor de correo. Todo lo demás deny.',
    },
    {
      id: 'ips-signatures',
      title: 'IPS con firmas actualizadas',
      description:
        'Proteger el servidor web contra inyección SQL, XSS, path traversal. Proteger servicios internos contra escaneos y fuerza bruta.',
    },
    {
      id: 'segmentation',
      title: 'Segmentación interna',
      description:
        'La LAN no puede acceder directamente a la DMZ excepto por puertos específicos de administración.',
    },
    {
      id: 'monitoring',
      title: 'Monitoreo',
      description:
        'Alertas del IPS se envían al SIEM central. El equipo de seguridad revisa dashboards diariamente.',
    },
  ],
  results: [
    {
      id: 'scans',
      text: 'Detección y bloqueo de 150+ intentos de escaneo de puertos por semana',
      icon: 'Ban',
    },
    {
      id: 'sql',
      text: 'Bloqueo proactivo de 3 intentos de inyección SQL contra la app web',
      icon: 'ShieldOff',
    },
    {
      id: 'visibility',
      text: 'Visibilidad completa del tráfico de red con logs centralizados',
      icon: 'Eye',
    },
    {
      id: 'compliance',
      text: 'Cumplimiento con requisitos de auditoría ISO 27001',
      icon: 'CheckCircle',
    },
  ],
};

export const recursosVisualesContent: RecursosVisualesContent = {
  id: 'recursos',
  title: '6. Recursos Visuales de Apoyo',
  videos: [
    {
      id: 'firewall-explained',
      title: '¿Qué es un Firewall? — Explicación completa',
      url: 'https://www.youtube.com/embed/kH6oP6JUnHI',
      description:
        'Video educativo en español que explica qué es un firewall, cómo funciona el filtrado de paquetes, los diferentes tipos (packet filtering, stateful, proxy, NGFW) y por qué es la primera línea de defensa en una red.',
    },
    {
      id: 'ids-ips-comparison',
      title: 'IDS vs IPS — Diferencias clave en ciberseguridad',
      url: 'https://www.youtube.com/embed/6-asM2Bh2yE',
      description:
        'Comparación detallada entre sistemas de detección (IDS) y prevención (IPS) de intrusiones. Explica visualmente la diferencia entre modo pasivo (fuera de banda) y modo activo (en línea), y cuándo usar cada tecnología.',
    },
    {
      id: 'ngfw-deep-dive',
      title: 'Next-Generation Firewall — Más allá del filtrado tradicional',
      url: 'https://www.youtube.com/embed/ISpZDLtYrIE',
      description:
        'Explicación de las capacidades de un Firewall de Nueva Generación (NGFW): inspección profunda de paquetes (DPI), control de aplicaciones a nivel 7, prevención de intrusiones integrada, filtrado por identidad de usuario y threat intelligence en tiempo real.',
    },
  ],
  networkDiagram,
  packetFlowDiagram,
};

export const referenciasContent: ReferenciasContent = {
  id: 'referencias',
  title: '7. Referencias Consultadas',
  references: [
    {
      id: 1,
      author: 'Stallings, W.',
      title: 'Cryptography and Network Security: Principles and Practice',
      year: '2017',
      publisher: 'Pearson (7th ed.)',
    },
    {
      id: 2,
      author: 'Kurose, J. F., & Ross, K. W.',
      title: 'Computer Networking: A Top-Down Approach',
      year: '2021',
      publisher: 'Pearson (8th ed.)',
    },
    {
      id: 3,
      author: 'Scarfone, K., & Mell, P.',
      title: 'Guide to Intrusion Detection and Prevention Systems (IDPS)',
      year: '2007',
      publisher: 'NIST Special Publication 800-94',
      url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-94.pdf',
    },
    {
      id: 4,
      author: 'Cisco',
      title: 'What Is a Firewall?',
      year: '2023',
      url: 'https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html',
    },
    {
      id: 5,
      author: 'IBM',
      title: 'Cost of a Data Breach Report 2023',
      year: '2023',
      url: 'https://www.ibm.com/reports/data-breach',
    },
    {
      id: 6,
      author: 'Tanenbaum, A. S., & Wetherall, D. J.',
      title: 'Computer Networks',
      year: '2011',
      publisher: 'Prentice Hall (5th ed.)',
    },
    {
      id: 7,
      author: 'Palo Alto Networks',
      title: 'What is an Intrusion Prevention System?',
      year: '2023',
      url: 'https://www.paloaltonetworks.com/cyberpedia/what-is-an-intrusion-prevention-system-ips',
    },
    {
      id: 8,
      author: 'Forouzan, B. A.',
      title: 'Data Communications and Networking',
      year: '2012',
      publisher: 'McGraw-Hill (5th ed.)',
    },
  ],
};
