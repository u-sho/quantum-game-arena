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
	plugins: [sveltekit()],
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
			all: true,
			reportsDirectory: './coverage',
			reportOnFailure: true,
			exclude: VITEST_COVERAGE_IGNORE_PATTERNS
		},
		typecheck: {
			checker: 'tsc',
			include: ['**/*{.,-}{test-d,spec-d}.{ts,svelte}'],
			tsconfig: './tsconfig.vitest-typecheck.json'
		}
	},
	define: {
		'import.meta.vitest': 'undefined'
	}
});
