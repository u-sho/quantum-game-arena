import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ out: 'build' }),
		amp: false,
		// TODO: floc: null,
		ssr: false,
		target: '#svelte',
		trailingSlash: 'never'
	}
};

export default config;
