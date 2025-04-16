export interface Agent {
  id: string;
  name: string;
  description?: string;
  version: string;
  definition: AgentDefinition;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isActive: boolean;
}

export interface AgentDefinition {
  steps: AgentStep[];
  inputs: AgentInput[];
  outputs: AgentOutput[];
}

export interface AgentStep {
  id: string;
  type: string;
  name: string;
  config: Record<string, unknown>;
  next?: string[];
  provider?: string;
}

export interface AgentInput {
  name: string;
  type: string;
  required: boolean;
  default?: unknown;
}

export interface AgentOutput {
  name: string;
  type: string;
}