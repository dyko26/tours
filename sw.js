/*
 * Service Worker - Guia de Campo Chachagua
 * Estrategia: precache del "app shell" + Tailwind CDN; cache-first con
 * revalidacion en segundo plano. Funciona 100 % offline tras la primera carga.
 */
const CACHE = 'chachagua-guide-v1';

const LOCAL_ASSETS = [
  './',
  './index.html',
  './app.js',
  './data.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg'
];

const REMOTE_ASSETS = [
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(LOCAL_ASSETS);
    // Recursos de terceros: se guardan como respuesta opaca (no-cors).
    await Promise.all(REMOTE_ASSETS.map(async url => {
      try {
        const res = await fetch(url, { mode: 'no-cors', cache: 'reload' });
        await cache.put(url, res);
      } catch (err) { /* sin red durante la instalacion: se reintentara en tiempo de ejecucion */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navegaciones: siempre servir el shell desde cache (SPA offline).
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match('./index.html');
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (err) {
        return cached || Response.error();
      }
    })());
    return;
  }

  // Resto: cache-first con revalidacion (stale-while-revalidate).
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: req.url.startsWith(self.location.origin) });
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    const res = await network;
    return res || new Response('', { status: 504, statusText: 'Offline' });
  })());
});
