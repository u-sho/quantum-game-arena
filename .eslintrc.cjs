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
		'plugin:@typescript-eslint/strict-type-checked',
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
		},
		{
			files: ['./*.config.*', '.eslintrc.cjs'],
			rules: { '@typescript-eslint/naming-convention': 'off' }
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
		'@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }],
		'@typescript-eslint/member-delimiter-style': 'warn',
		'@typescript-eslint/method-signature-style': 'error',
		camelcase: 'off',
		'@typescript-eslint/naming-convention': [
			'warn',
			{
				selector: 'default',
				format: ['camelCase'],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'variable',
				modifiers: ['global', 'const'],
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase'],
				leadingUnderscore: 'require'
			},
			{
				selector: 'typeLike',
				format: ['PascalCase']
			},
			{
				// for non-exported functions
				selector: 'function',
				modifiers: ['global'],
				format: ['camelCase'],
				leadingUnderscore: 'require'
			},
			{
				selector: 'function',
				modifiers: ['exported', 'global'],
				format: ['camelCase'],
				leadingUnderscore: 'forbid'
			},
			{
				// exception for QuantumTTT player names
				selector: 'objectLiteralProperty',
				filter: { regex: '^(X|Y)$', match: true },
				format: ['PascalCase']
			}
		],
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-readonly': 'error',

		'@typescript-eslint/non-nullable-type-assertion-style': 'off',
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
