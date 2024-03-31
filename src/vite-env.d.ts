/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_REPO_READ_ACCESS_TOKEN: string;
  readonly VITE_FIREBASE_ANALYTICS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
