import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    allowedHosts: ["cheating-italics-platform.ngrok-free.dev"]
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      cleanupOutdatedCaches: true,
      includeAssets: [
        "img/icon-192.png",
        "img/icon-512.png",
        "img/world-cup-trophy.png"
      ],
      manifestFilename: "manifest.webmanifest",
      manifest: {
        name: "Copa 2026",
        short_name: "Copa 2026",
        description: "Agenda, grupos e chaveamento da Copa do Mundo 2026.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#020403",
        theme_color: "#00ff88",
        categories: ["sports", "utilities"],
        icons: [
          {
            src: "img/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "img/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        shortcuts: [
          {
            name: "Jogos",
            short_name: "Jogos",
            url: "/#schedule"
          },
          {
            name: "Chaveamento",
            short_name: "Chaves",
            url: "/chaveamento.html"
          }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,webmanifest,png,svg,ico,webp,jpg,jpeg}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith("/models/"),
            handler: "CacheFirst",
            options: {
              cacheName: "model-cache",
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /^https:\/\/flagcdn\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "flags-cache",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        bracket: "chaveamento.html"
      }
    }
  }
});
