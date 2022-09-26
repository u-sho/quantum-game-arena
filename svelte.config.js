import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'default-src': ['self'],
				'frame-src': ['none'],
				'img-src': [
					'self',
					'https://pbs.twimg.com/profile_banners/1398377057772470274/1623818332/*'
				],
				'media-src': ['none'],
				'object-src': ['none'],
				'style-src': ['self', 'unsafe-inline']
			}
		},
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
