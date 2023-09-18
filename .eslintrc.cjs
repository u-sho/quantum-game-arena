const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	ignorePatterns: [
		'.git/**',
		'.svelte-kit/**',
		'.vercel/**',
		'.vercel_build_output/**',
		'static/**',
		'build/**',
		'coverage/**',
		'node_modules/**'
	],
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier'
	],
	plugins: ['svelte3', '@typescript-eslint'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{
			files: ['*.test.ts'],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-unused-vars': 'off'
			}
		},
		{
			files: ['*.js', '*.cjs'],
			rules: { '@typescript-eslint/explicit-function-return-type': 'off' }
		},
		{
			files: ['*.cjs'],
			rules: { '@typescript-eslint/no-require-imports': 'off' }
		}
	],
	rules: {
		'no-console': isProduction() ? 'error' : 'off',

		eqeqeq: ['error', 'always', { null: 'ignore' }],
		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-unused-expressions': 'error',
		'no-var': 'error',
		'prefer-const': 'error',

		// use '$lib/*' instead
		'no-restricted-imports': ['error', { patterns: ['../*', 'src/lib/*'] }],

		'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/member-delimiter-style': 'error',
		'@typescript-eslint/method-signature-style': 'error',
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-require-imports': 'error',

		'@typescript-eslint/unbound-method': 'off'
	},
	settings: {
		'svelte3/ignore-styles': () => true,
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		project: './tsconfig.eslint.json'
	},
	env: {
		browser: true,
		es2022: true,
		node: true
	}
};
