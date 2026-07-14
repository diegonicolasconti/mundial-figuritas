/* Mundial Figuritas — offline service worker */
const CACHE = 'figuritas-v5';
const TEAM_CODES = ['ALG','ARG','AUS','AUT','BEL','BIH','BRA','CAN','CPV','COL','CIV','CRO','CUW','CZE','COD','ECU','EGY','ENG','FRA','GER','GHA','HAI','IRN','IRQ','JPN','JOR','KOR','KSA','MAR','MEX','NED','NOR','NZL','PAN','PAR','POR','QAT','RSA','SCO','SEN','ESP','SUI','SWE','TUN','TUR','URU','USA','UZB'];
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/anton.woff2',
  './assets/emblem.png',
  './assets/mascot1.png',
  './assets/mascot2.png',
  './assets/mascot3.png',
  './assets/panini.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
].concat(TEAM_CODES.map(c => './flags/' + c + '.svg'));

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        const c = await caches.open(CACHE);
        c.put(e.request, res.clone());
      }
      return res;
    } catch (err) {
      if (e.request.mode === 'navigate') {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
      return cached || Response.error();
    }
  })());
});
