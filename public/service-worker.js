


const APP_SHELL_CACHE = "mycatalog-app-shell-v1";
const API_CACHE = "mycatalog-api-v1";


const APP_SHELL_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/static/css/main.css",
    "/static/js/main.js",



];


self.addEventListener("install", (event) => {
    console.log("[SW] Install");

    event.waitUntil(
        caches.open(APP_SHELL_CACHE).then((cache) => {
            console.log("[SW] Caching app shell...");
            return cache.addAll(APP_SHELL_ASSETS);
        })
    );

    self.skipWaiting();
});


self.addEventListener("activate", (event) => {
    console.log("[SW] Activate");

    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== APP_SHELL_CACHE && key !== API_CACHE) {
                        console.log("[SW] Deleting old cache:", key);
                        return caches.delete(key);
                    }
                    return null;
                })
            )
        )
    );

    self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    const { request } = event;


    if (request.mode === "navigate") {
        event.respondWith(handleNavigateRequest(request));
        return;
    }


    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);


    if (url.hostname.includes("dummyjson.com")) {
        event.respondWith(networkFirstForApi(request));
        return;
    }


    if (
        request.destination === "style" ||
        request.destination === "script" ||
        request.destination === "image" ||
        request.destination === "font"
    ) {
        event.respondWith(cacheFirstForStatic(request));
        return;
    }


    event.respondWith(
        fetch(request).catch(() => {
            return new Response("Offline", { status: 503 });
        })
    );
});


async function handleNavigateRequest(request) {
    const cachedIndex = await caches.match("/index.html");
    if (cachedIndex) {
        return cachedIndex;
    }

    try {
        const response = await fetch(request);
        return response;
    } catch (error) {
        return caches.match("/index.html");
    }
}


async function networkFirstForApi(request) {
    try {
        const response = await fetch(request);

        const cache = await caches.open(API_CACHE);
        cache.put(request, response.clone());

        return response;
    } catch (error) {
        console.log("[SW] API offline, trying cache:", request.url);
        const cached = await caches.match(request);
        if (cached) {
            return cached;
        }

        return new Response(
            JSON.stringify({ error: "Offline. No cached data available." }),
            {
                status: 503,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}


async function cacheFirstForStatic(request) {
    const cached = await caches.match(request);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(request);
        const cache = await caches.open(APP_SHELL_CACHE);
        cache.put(request, response.clone());
        return response;
    } catch (error) {
        return new Response("Offline", { status: 503 });
    }
}
