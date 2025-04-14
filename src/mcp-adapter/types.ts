// Agentic Framework - MCP Adapter Types

export interface MCPAdapter {
  id: string;
  name: string;
  onPreLLMCall?(context: any): Promise<any>;
  onPostLLMCall?(result: any, context: any): Promise<any>;
  onAgentEvent?(event: string, context: any): Promise<any>;
}