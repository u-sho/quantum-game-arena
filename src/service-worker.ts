/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

const ASSETS = `cache${version}`;
const cached = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(ASSETS)
			.then(async (cache) => cache.addAll(cached))
			.then(() => {
				void self.skipWaiting();
			})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			// delete old caches
			for (const key of keys) {
				if (key !== ASSETS) await caches.delete(key);
			}
			void self.clients.claim();
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const url = new URL(event.request.url);

	// don't try to handle e.g. data: URIs
	if (!url.protocol.startsWith('http')) return;

	// ignore dev server requests
	if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

	async function respond(): Promise<Response> {
		const cache = await caches.open(ASSETS);

		// always serve static files and bundler-generated assets from cache
		if (url.host === self.location.host && cached.includes(url.pathname)) {
			const response = await cache.match(event.request);
			if (response) return response;
		}

		// if (event.request.cache === 'only-if-cached') return;

		// for everything else, try the network first, falling back to
		// cache if the user is offline. (If the pages never change, you
		// might prefer a cache-first approach to a network-first one.)
		try {
			const response = await fetch(event.request);
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}
			if (response.status === 200) {
				void cache.put(event.request, response.clone());
			}
			return response;
		} catch (err) {
			const response = await cache.match(event.request);
			if (response) return response;

			throw err;
		}
	}

	event.respondWith(respond());
});
