import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/icons/*.svg'],
      manifest: {
        name: 'Pokédex Web App',
        short_name: 'Pokédex',
        description: 'Uma aplicação web moderna para explorar o universo Pokémon',
        theme_color: '#dc3545',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/img/icons/pokebola.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/pokebola.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
