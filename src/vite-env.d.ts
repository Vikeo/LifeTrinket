/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_REPO_READ_ACCESS_TOKEN: string;
  readonly VITE_FIREBASE_ANALYTICS_API_KEY: string;
  readonly VITE_GRAFANA_FARO_URL: string;
  readonly VITE_GRAFANA_FARO_APP_NAME: string;
  // Live tracking is optional, so these three are genuinely absent when it is
  // switched off. trackDb.ts guards for that; the type must say so too.
  readonly VITE_TRACK_DATABASE_URL: string | undefined;
  readonly VITE_TRACK_PROJECT_ID: string | undefined;
  readonly VITE_TRACK_API_KEY: string | undefined;
  // EventTrinket's public address, for the way back to the event's hub.
  readonly VITE_EVENTTRINKET_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
