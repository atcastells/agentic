import { ObservabilityConfig } from '../types';

export const initializeTracing = (config: ObservabilityConfig) => {
  if (!config.tracingEnabled) {
    return console.log('Tracing not initialized');
  }
  console.log('Tracing initialized');
};