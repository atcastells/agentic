/**
 * @file Defines types for the Agent Flow Engine module.
 */

/**
 * Represents the configuration for an agent flow.
 */
export interface AgentFlowConfig {
  // Define configuration properties here
}

/**
 * Represents the execution context for an agent flow.
 */
export interface AgentFlowContext {
  // Define context properties here
}

/**
 * Represents a step in an agent flow.
 */
export interface AgentFlowStep {
  // Define step properties here
  execute: (context: AgentFlowContext) => Promise<void>;
}

/**
 * Represents an agent flow.
 */
export interface AgentFlow {
  id: string;
  name: string;
  config: AgentFlowConfig;
  steps: AgentFlowStep[];
  execute: (context: AgentFlowContext) => Promise<void>;
}

/**
 * Represents a flow step.
 * @deprecated Use AgentFlowStep instead
 */
export interface FlowStep extends AgentFlowStep {}