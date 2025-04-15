import { Router } from 'express';
import { Container } from 'typedi';
import { LLMProviderController } from '../controllers/LLMProviderController';

const router = Router();
const llmProviderController = Container.get(LLMProviderController);

// Route for listing all available LLM providers
router.get('/', llmProviderController.listProviders);

// Route for listing all models from a specific provider
router.get('/:provider/models', llmProviderController.listModels);

// Route for generating a completion with a specific provider
router.post('/:provider/completions', llmProviderController.generateCompletion);

export default router; 