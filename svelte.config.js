import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		amp: false,
		// TODO: floc: null,
		ssr: false,
		target: '#svelte',
		trailingSlash: 'never'
	}
};

export default config;
