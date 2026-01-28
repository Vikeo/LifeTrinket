/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_REPO_READ_ACCESS_TOKEN: string;
  readonly VITE_FIREBASE_ANALYTICS_API_KEY: string;
  readonly VITE_GRAFANA_FARO_URL: string;
  readonly VITE_GRAFANA_FARO_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
