import { Service } from 'typedi';
import env from '../../config/env';
import { LLMPrompt, LLMProvider, LLMResponse } from '../../domain/services/LLMProvider';

@Service()
export class OpenRouterLLMProvider implements LLMProvider {
  name = 'openrouter';
  private baseUrl = 'https://openrouter.ai/api/v1';
  private apiKey: string;
  private models: string[] = [];
  
  constructor() {
    this.apiKey = env.OPENROUTER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenRouter API key not provided. This provider will not work correctly.');
    } else {
      console.log('OpenRouter API key provided.');
    }

    //list models on startup
    this.listModels().then(models => {
      this.models = models.filter(model => model.includes('free'));
    });
  }
  
  async generateCompletion(prompt: LLMPrompt): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }
    
    const model = prompt.model || 'openai/gpt-4o-mini';
    const systemPrompt = prompt.systemPrompt || 'You are a helpful assistant.';
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': env.APP_URL || 'http://localhost:3000', // Required by OpenRouter
          'X-Title': 'Agentic Platform' // Optional
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt.text }
          ],
          temperature: prompt.temperature || 0.7,
          max_tokens: prompt.maxTokens || 1024
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json() as { error?: { message: string } };
        throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json() as {
        choices: { message: { content: string } }[];
        usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
        model: string;
      };
      
      return {
        text: data.choices[0].message.content,
        tokenUsage: {
          prompt: data.usage.prompt_tokens,
          completion: data.usage.completion_tokens,
          total: data.usage.total_tokens
        },
        model: data.model,
        provider: 'openrouter'
      };
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw error;
    }
  }
  
  async listModels(): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get models: ${response.statusText}`);
      }
      
      const data = await response.json() as {
        data: { id: string }[];
      };
      return data.data.map((model: { id: string }) => model.id);
    } catch (error) {
      console.error('Error fetching OpenRouter models:', error);
      throw error;
    }
  }
} 