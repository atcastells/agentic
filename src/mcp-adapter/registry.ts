// Agentic Framework - MCP Adapter Registry (stub)

import { MCPAdapter } from './types';

let adapter: MCPAdapter | undefined = undefined;

export function setMCPAdapter(a: MCPAdapter): void {
  adapter = a;
}

export function getMCPAdapter(): MCPAdapter | undefined {
  return adapter;
}