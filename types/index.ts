// Base Section Props - Liskov Substitution Principle
// All section components share this consistent interface
export interface BaseSectionProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

// Interface Segregation - Small, focused interfaces

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
}

export interface DefinitionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ImportanceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
}

export interface FirewallType {
  id: string;
  name: string;
  description: string;
  layer: string;
  pros: string;
  cons: string;
}

export interface DetectionMethod {
  id: string;
  name: string;
  description: string;
  effectiveness: string;
  icon: string;
}

export interface OperationMode {
  id: string;
  name: string;
  type: 'passive' | 'active';
  description: string;
}

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'cloud' | 'firewall' | 'server' | 'switch' | 'workstation' | 'vpn';
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramData {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

export interface ConfigurationItem {
  id: string;
  title: string;
  description: string;
}

export interface CaseResult {
  id: string;
  text: string;
  icon: string;
}

export interface ReferenceData {
  id: number;
  author: string;
  title: string;
  year: string;
  publisher?: string;
  url?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  url: string;
  description: string;
}

// Composite interfaces for sections
export interface HeroContent extends SectionContent {
  typingTexts: string[];
}

export interface RecursosVisualesContent extends SectionContent {
  videos: VideoResource[];
  networkDiagram: DiagramData;
  packetFlowDiagram: DiagramData;
}

export interface DefinicionContent extends SectionContent {
  definitions: DefinitionItem[];
}

export interface ImportanciaContent extends SectionContent {
  items: ImportanceItem[];
  highlightStat: {
    text: string;
    source: string;
  };
}

export interface CaracteristicasContent extends SectionContent {
  firewallTypes: FirewallType[];
  detectionMethods: DetectionMethod[];
  operationModes: OperationMode[];
}

export interface FuncionamientoContent extends SectionContent {
  steps: TimelineStep[];
}

export interface EjemploContent extends SectionContent {
  scenario: string;
  configuration: ConfigurationItem[];
  results: CaseResult[];
}

export interface ReferenciasContent extends SectionContent {
  references: ReferenceData[];
}
