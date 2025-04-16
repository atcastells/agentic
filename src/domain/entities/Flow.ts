export interface Flow {
  id: string;
  name: string;
  description?: string;
  version: string;
  definition: FlowDefinition;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isActive: boolean;
}

export interface FlowDefinition {
  steps: FlowStep[];
  inputs: FlowInput[];
  outputs: FlowOutput[];
}

export interface FlowStep {
  id: string;
  type: string;
  name: string;
  config: Record<string, unknown>;
  next?: string[];
  provider?: string;
}

export interface FlowInput {
  name: string;
  type: string;
  required: boolean;
  default?: unknown;
}

export interface FlowOutput {
  name: string;
  type: string;
} 