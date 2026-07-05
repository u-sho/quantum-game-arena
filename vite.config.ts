import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';

const VITEST_IGNORE_PATTERNS = [
	...configDefaults.exclude,
	'.github/**',
	'.svelte-kit/**',
	'.vercel_build_output/**',
	'.vercel/**',
	'.vscode/**'
] satisfies typeof configDefaults.exclude;

const VITEST_COVERAGE_IGNORE_PATTERNS = [
	...VITEST_IGNORE_PATTERNS,
	'**/*.svelte', // E2E test is needed
	'src/routes/**/+*.ts',
	'**/*{.,-}{test,spec}{,-d}.{ts,svelte}',
	'svelte.config.js'
] satisfies typeof configDefaults.coverage.exclude;

export default defineConfig({
	plugins: [
		sveltekit({
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
					'style-src': ['self', 'unsafe-inline', 'vitals.vercel-insights.com'],
					'script-src-elem': ['self', 'va.vercel-scripts.com']
				}
			},
			inlineStyleThreshold: 0, // 4096 B is Astro default
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
		})
	],
	preview: {
		port: 3000,
		strictPort: true
	},
	server: {
		port: 3000,
		strictPort: true
	},
	test: {
		includeSource: ['src/lib/**/*.ts'],
		exclude: VITEST_IGNORE_PATTERNS,
		watch: false,
		coverage: {
			enabled: true,
			reportsDirectory: './coverage',
			reportOnFailure: true,
			exclude: VITEST_COVERAGE_IGNORE_PATTERNS
		},
		typecheck: {
			ignoreSourceErrors: true,
			checker: 'tsc',
			include: ['**/*{.,-}{test-d,spec-d}.{ts,svelte}'],
			tsconfig: './tsconfig.vitest-typecheck.json'
		}
	},
	define: {
		'import.meta.vitest': 'undefined'
	}
});
