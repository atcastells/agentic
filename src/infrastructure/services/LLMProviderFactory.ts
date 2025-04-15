import { Service } from 'typedi';
import { LLMProvider } from '../../domain/services/LLMProvider';
import { OpenRouterLLMProvider } from './OpenRouterLLMProvider';

@Service()
export class LLMProviderFactory {
  private providers: Map<string, LLMProvider>;
  
  constructor(openRouterProvider: OpenRouterLLMProvider) {
    this.providers = new Map();
    
    // Register providers
    this.registerProvider(openRouterProvider);
    
    // Additional providers can be added here
    // this.registerProvider(lmStudioProvider);
  }
  
  private registerProvider(provider: LLMProvider): void {
    this.providers.set(provider.name, provider);
  }
  
  getProvider(name: string): LLMProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`LLM provider '${name}' not found`);
    }
    return provider;
  }
  
  getAllProviders(): LLMProvider[] {
    return Array.from(this.providers.values());
  }
  
  getAllProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }
} 