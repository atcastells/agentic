// Agentic Framework - Agent Flow Engine Event Hooks

import { FlowStep } from './types';

// Event hook signatures for flow execution
export type OnStep = (step: FlowStep, context: any) => void;
export type OnDecision = (decision: any, context: any) => void;
export type OnError = (error: Error, context: any) => void;

// Event hook registration (stub, for extensibility)
export interface AgentFlowEvents {
  onStep?: OnStep;
  onDecision?: OnDecision;
  onError?: OnError;
}

// Example usage (for documentation purposes):
/*
const events: AgentFlowEvents = {
  onStep: (step, ctx) => { /* ... *\/ },
  onDecision: (decision, ctx) => { /* ... *\/ },
  onError: (err, ctx) => { /* ... *\/ }
};
*/