import {
  getWebInstrumentations,
  initializeFaro,
  ReactIntegration,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

// Initialize Grafana Faro for frontend observability
const initializeTelemetry = () => {
  // Check if we have Faro configuration
  const faroUrl = import.meta.env.VITE_GRAFANA_FARO_URL;
  const faroAppName = import.meta.env.VITE_GRAFANA_FARO_APP_NAME || 'LifeTrinket';

  // If no configuration, log to console instead (development mode)
  if (!faroUrl) {
    console.info(
      '[Grafana Faro] No configuration found. Metrics will be logged to console in development mode.'
    );
    return null;
  }

  // Initialize Faro with React integration
  const faro = initializeFaro({
    url: faroUrl,
    app: {
      name: faroAppName,
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      environment: import.meta.env.MODE || 'development',
    },
    instrumentations: [
      // Mandatory, omits default instrumentations otherwise
      ...getWebInstrumentations(),

      // Tracing package to get end-to-end visibility for HTTP requests
      new TracingInstrumentation(),

      // React integration for component error boundaries
      // Note: We don't use React Router, so we skip the router option
      new ReactIntegration(),
    ],
  });

  console.info('[Grafana Faro] Initialized successfully. Sending metrics to Grafana Cloud.');

  return faro;
};

// Initialize telemetry
const faro = initializeTelemetry();

// Export Faro instance for creating measurements
export { faro };

// Export flag to check if telemetry is enabled
export const telemetryEnabled = faro !== null;
