import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  },
});
