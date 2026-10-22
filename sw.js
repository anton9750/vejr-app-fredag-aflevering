// skift versionen når filerne ændres, så gamle caches bliver slettet
const STATIC_CACHE = "vejr-static-v4";
const API_CACHE = "vejr-api-v1";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/main.js",
  "./js/model.js",
  "./js/view.js",
  "./js/controller.js",
  "./js/helpers/weatherCodes.js",
  "./js/helpers/windDirection.js",
  "./js/components/atoms.js",
  "./js/components/molecules.js",
  "./js/components/organisms.js"
];


// gem alle statiske filer når service workeren installeres
self.addEventListener("install", function (event) {

  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(FILES);
    })
  );

  self.skipWaiting();
});


// slet gamle caches
self.addEventListener("activate", function (event) {

  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.map(function (name) {
          if (name !== STATIC_CACHE && name !== API_CACHE) {
            return caches.delete(name);
          }
        })
      );
    }).then(function () {
      // tag kontrol over åbne sider med det samme, ikke først ved næste besøg
      return self.clients.claim();
    })
  );
});


self.addEventListener("fetch", function (event) {

  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  if (url.hostname === "api.open-meteo.com") {
    event.respondWith(networkFirst(event.request));
  } else if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(event, event.request));
  }
});


// API: prøv nettet først, ellers brug cache
async function networkFirst(request) {

  const cache = await caches.open(API_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // ingen forbindelse, så vi bruger den gemte version
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    } else {
      throw error;
    }
  }
}


// Statiske filer: svar straks fra cache, men hent en ny version i baggrunden,
// så ændringer i koden når frem ved næste besøg
async function staleWhileRevalidate(event, request) {

  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const update = fetch(request).then(function (response) {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  if (cached) {
    event.waitUntil(update.catch(function () {}));
    return cached;
  }

  return update;
}
