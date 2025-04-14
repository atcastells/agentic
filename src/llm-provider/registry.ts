// Agentic Framework - LLM Provider Registry (stub)

import { LLMProvider } from './types';

const providers: Map<string, LLMProvider> = new Map();

export function registerLLMProvider(provider: LLMProvider): void {
  providers.set(provider.id, provider);
}

// Select provider by id or config (stub logic)
export function getLLMProvider(id?: string): LLMProvider | undefined {
  if (id) return providers.get(id);
  // Optionally, select based on environment/config
  // Example: process.env.LLM_PROVIDER_ID
  return undefined;
}

// For testing/inspection
export function listLLMProviders(): LLMProvider[] {
  return Array.from(providers.values());
}