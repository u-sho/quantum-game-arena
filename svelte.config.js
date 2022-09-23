import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		csp: { mode: 'auto' },
		prerender: { default: true },
		trailingSlash: 'never',
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		}
	}
};

export default config;
