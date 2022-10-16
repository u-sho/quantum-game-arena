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
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
			files: ['*.cjs'],
			rules: { '@typescript-eslint/no-require-imports': 'off' }
		}
	],
	rules: {
		'no-console': isProduction() ? 'error' : 'off',
		eqeqeq: ['error', 'always', { null: 'ignore' }],
		'no-unused-expressions': 'error',
		'no-var': 'error',
		'prefer-const': 'error',

		// use '$lib/*' instead
		'no-restricted-imports': ['error', { patterns: ['../*', 'src/lib/*'] }],

		'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', disallowTypeAnnotations: true }
		],
		'@typescript-eslint/member-delimiter-style': 'error',
		'@typescript-eslint/method-signature-style': ['error', 'property'],
		'@typescript-eslint/no-confusing-non-null-assertion': 'warn',
		'@typescript-eslint/no-duplicate-imports': 'error',
		'@typescript-eslint/no-implicit-any-catch': 'error',
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
