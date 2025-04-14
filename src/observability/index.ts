import { ObservabilityConfig } from './types';
import { initializeMetrics } from './metrics';
import { initializeTracing } from './tracing';
import { initializeLogging } from './logging';

export const setupObservability = (config: ObservabilityConfig) => {
  initializeMetrics(config);
  initializeTracing(config);
  initializeLogging(config);
};