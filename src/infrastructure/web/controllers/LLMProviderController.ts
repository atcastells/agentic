import { Request, Response } from 'express';
import { Service } from 'typedi';
import { LLMProviderFactory } from '../../services/LLMProviderFactory';
import { LLMPrompt } from '../../../domain/services/LLMProvider';

@Service()
export class LLMProviderController {
  constructor(private llmProviderFactory: LLMProviderFactory) {}

  listProviders = async (_req: Request, res: Response): Promise<void> => {
    try {
      const providers = this.llmProviderFactory.getAllProviderNames();
      res.status(200).json(providers);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to list LLM providers' });
      }
    }
  };

  listModels = async (req: Request, res: Response): Promise<void> => {
    try {
      const { provider } = req.params;
      
      try {
        const llmProvider = this.llmProviderFactory.getProvider(provider);
        const models = await llmProvider.listModels();
        res.status(200).json(models);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to list models' });
      }
    }
  };

  generateCompletion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { provider } = req.params;
      const promptData = req.body as LLMPrompt;
      
      if (!promptData.text) {
        res.status(400).json({ error: 'Prompt text is required' });
        return;
      }
      
      try {
        const llmProvider = this.llmProviderFactory.getProvider(provider);
        const response = await llmProvider.generateCompletion(promptData);
        res.status(200).json(response);
      } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
          res.status(404).json({ error: error.message });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error generating completion:', error);
      res.status(500).json({ 
        error: 'Failed to generate completion',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
} 