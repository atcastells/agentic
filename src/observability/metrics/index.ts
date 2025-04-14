import { ObservabilityConfig } from '../types';

export const initializeMetrics = (config: ObservabilityConfig) => {
  if (!config.metricsEnabled) {
    return console.log('Metrics not initialized');
  }
  console.log('Metrics initialized');
};