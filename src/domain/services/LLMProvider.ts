export interface LLMPrompt {
  text: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface LLMResponse {
  text: string;
  tokenUsage: {
    prompt: number;
    completion: number;
    total: number;
  };
  model: string;
  provider: string;
}

export interface LLMProvider {
  /**
   * Name of the LLM provider
   */
  name: string;
  
  /**
   * Generate a completion for the prompt
   */
  generateCompletion(prompt: LLMPrompt): Promise<LLMResponse>;
  
  /**
   * List available models
   */
  listModels(): Promise<string[]>;
} 