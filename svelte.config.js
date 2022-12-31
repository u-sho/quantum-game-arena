import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'default-src': ['self', 'vitals.vercel-insights.com'],
				'img-src': [
					'self',
					'data:',
					'https://pbs.twimg.com/profile_banners/1398377057772470274/1623818332/*',
					'vitals.vercel-insights.com'
				],
				'style-src': ['self', 'unsafe-inline', 'vitals.vercel-insights.com']
			}
		},
		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType, message }) => {
				const errorMessage =
					message.length > 0
						? message
						: `${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`;
				throw new Error(errorMessage);
			}
		},
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		}
	}
};

export default config;
