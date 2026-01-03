// Terminal Dashboard Types

export interface LanguageData {
  name: string;
  projects: number;
  files: number;
  lines: string;
  primary: boolean;
}

export interface DeployedModel {
  name: string;
  params: string;
  platform: "HuggingFace" | "Local" | "Gradio";
  downloads?: string;
  status: "live" | "active";
  url?: string;
}

export interface AIFramework {
  name: string;
  category: "ml" | "embeddings" | "vectordb" | "runtime" | "architecture";
  tooltip: string;
  project?: string;
}

export interface AITechnique {
  name: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "platform";
  primary?: boolean;
}

export interface Deployment {
  name: string;
  url: string;
  stack: string;
  status: "live" | "maintenance";
}

export interface InfraItem {
  name: string;
  description: string;
}

export interface InfraCategory {
  title: string;
  items: InfraItem[];
}

export interface FeedEntry {
  timestamp: string;
  action: string;
  target: string;
  type: "deploy" | "publish" | "ship" | "build" | "create";
}
