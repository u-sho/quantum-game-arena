import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	preview: {
		port: 3000,
		strictPort: true
	},
	server: {
		port: 3000,
		strictPort: true
	}
};

export default config;
