import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      external: ['babel-plugin-macros'],
    },
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(
      process.env.npm_package_version
    ),
    VITE_REPO_READ_ACCESS_TOKEN: JSON.stringify(
      process.env.VITE_REPO_READ_ACCESS_TOKEN
    ),
    VITE_FIREBASE_ANALYTICS_API_KEY: JSON.stringify(
      process.env.VITE_FIREBASE_ANALYTICS_API_KEY
    ),
    VITE_GRAFANA_FARO_URL: JSON.stringify(
      process.env.VITE_GRAFANA_FARO_URL
    ),
    VITE_GRAFANA_FARO_APP_NAME: JSON.stringify(
      process.env.VITE_GRAFANA_FARO_APP_NAME
    ),
  },
});
