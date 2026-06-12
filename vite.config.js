import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const SPORTMONKS_BASE_URL = "https://api.sportmonks.com/v3/football";

function sportmonksDevProxy(env) {
  return {
    name: "sportmonks-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/sportmonks", async (request, response) => {
        const token = env.SPORTMONKS_API_TOKEN || env.VITE_SPORTMONKS_API_TOKEN;

        if (!token) {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ message: "Configure SPORTMONKS_API_TOKEN ou VITE_SPORTMONKS_API_TOKEN no .env." }));
          return;
        }

        const requestUrl = new URL(request.url || "/", "http://localhost");
        const path = requestUrl.searchParams.get("path");

        if (!path || !path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
          response.statusCode = 400;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ message: "Parametro path invalido." }));
          return;
        }

        const target = new URL(`${SPORTMONKS_BASE_URL}${path}`);

        requestUrl.searchParams.forEach((value, key) => {
          if (key !== "path") {
            target.searchParams.set(key, value);
          }
        });

        target.searchParams.set("api_token", token);

        try {
          const sportmonksResponse = await fetch(target);
          const body = await sportmonksResponse.text();

          response.statusCode = sportmonksResponse.status;
          response.setHeader("Content-Type", sportmonksResponse.headers.get("content-type") || "application/json");
          response.setHeader("Cache-Control", "no-store");
          response.end(body);
        } catch {
          response.statusCode = 502;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ message: "Nao foi possivel conectar na Sportmonks." }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
  server: {
    allowedHosts: ["cheating-italics-platform.ngrok-free.dev"]
  },
  plugins: [
    react(),
    sportmonksDevProxy(env),
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
  };
});
