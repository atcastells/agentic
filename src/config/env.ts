import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/agentic',
  JWT_SECRET: process.env.JWT_SECRET || 'agentic-secret-key',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  
  // LLM Provider API Keys
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  LMSTUDIO_API_KEY: process.env.LMSTUDIO_API_KEY,
  // Add other environment variables as needed
};

export default env; 