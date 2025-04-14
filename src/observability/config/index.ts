import { ObservabilityConfig } from '../types';

export const loadConfig = (): ObservabilityConfig => {
  return {
    tracingEnabled: process.env.OBSERVABILITY_TRACING_ENABLED === 'true',
    metricsEnabled: process.env.OBSERVABILITY_METRICS_ENABLED === 'true',
    loggingLevel: process.env.OBSERVABILITY_LOGGING_LEVEL || 'info',
    logsEnabled: process.env.OBSERVABILITY_LOGS_ENABLED === 'true',
  };
};