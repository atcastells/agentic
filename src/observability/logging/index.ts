import { ObservabilityConfig } from '../types';

export const initializeLogging = (config: ObservabilityConfig) => {
  if (!config.loggingLevel) {
    return console.log('Logging not initialized');
  }
  console.log(`Logging initialized with level: ${config.loggingLevel}`);
};