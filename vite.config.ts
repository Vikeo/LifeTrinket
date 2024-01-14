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
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    REPO_READ_ACCESS_TOKEN: JSON.stringify(process.env.REPO_READ_ACCESS_TOKEN),
  },
});
