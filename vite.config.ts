import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png', 'robots.txt', 'sitemap.xml', 'humans.txt', 'browserconfig.xml'],
      manifest: {
        name: 'Life Trinket - MTG Life Counter',
        short_name: 'Life Trinket',
        description: 'Free offline MTG life counter PWA for up to 6 players. Track life totals, commander damage, poison, energy counters. Share games via QR code.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
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
