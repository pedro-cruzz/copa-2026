const LEGACY_CACHE_PREFIX = "copa-2026";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(LEGACY_CACHE_PREFIX))
          .map((cacheName) => caches.delete(cacheName))
      );

      await self.clients.claim();

      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => {
        client.navigate(client.url);
      });

      await self.registration.unregister();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
