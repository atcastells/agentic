// Agentic Framework - Storage Types
export { AgentFlow } from '../agent-flow/types';

import { AgentFlow } from '../agent-flow/types';

export interface FlowExecutionLog {
  flowId: string;
  runId: string;
  timestamp: Date;
  input: any;
  output: any;
  status: 'success' | 'error';
  error?: string;
  traceId?: string;
}

// Storage adapter interface for extensibility
export interface StorageAdapter {
  saveFlow(flow: AgentFlow): Promise<void>;
  getFlow(id: string): Promise<AgentFlow | undefined>;
  listFlows(): Promise<AgentFlow[]>;
  saveExecutionLog(log: FlowExecutionLog): Promise<void>;
  listExecutionLogs(flowId: string): Promise<FlowExecutionLog[]>;
}