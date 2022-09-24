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
		prerender: {
			onError: ({ status, path, referrer, referenceType }) => {
				const errorMessage = `${status} ${path}${
					referrer ? ` (${referenceType} from ${referrer})` : ''
				}`;
				throw new Error(errorMessage);
			}
		},
		trailingSlash: 'never',
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		}
	}
};

export default config;
