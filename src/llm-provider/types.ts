// Agentic Framework - LLM Provider Abstraction Types

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  [key: string]: any;
}

export interface LLMResult {
  text: string;
  usage?: Record<string, any>;
  [key: string]: any;
}

export interface LLMResultChunk {
  text: string;
  [key: string]: any;
}

export interface LLMProvider {
  id: string;
  name: string;
  supportsStreaming: boolean;
  generateCompletion(prompt: string, options?: LLMOptions): Promise<LLMResult>;
  streamCompletion?(prompt: string, options?: LLMOptions): AsyncIterable<LLMResultChunk>;
  getMetadata?(): Promise<Record<string, any>>;
}