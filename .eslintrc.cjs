const isProduction = () => process.env.NODE_ENV === 'production';

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	rules: {
		'no-console': isProduction() ? 'error' : 'off',
		eqeqeq: ['error', 'always', { null: 'ignore' }],
		'no-duplicate-imports': 'error',
		'no-unused-expressions': 'error',
		'no-var': 'error',
		'prefer-const': 'error'
	},
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2020: true,
		node: true
	}
};
