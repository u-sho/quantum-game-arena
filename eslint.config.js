import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteEslintParser from 'svelte-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

const isProduction = () => process.env.NODE_ENV === 'production';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.FileSpec[]}*/
const ignores = [
	'.svelte-kit/',
	'.vercel/',
	'.vercel_build_output/',
	'static/',
	'build/',
	'coverage/',
	'node_modules/',
	'vite.config.ts.timestamp*'
];

/** @type {import('typescript-eslint').Config} */
const commonConfig = [
	{ ignores },
	{
		linterOptions: {
			reportUnusedDisableDirectives: true
		}
	}
];

const defaultConfig = tsEslint.config({
	files: ['**/*.js', '**/*.ts', '**/*.svelte'],
	/** @type {import('typescript-eslint').ConfigWithExtends['extends']} */
	extends: [
		eslint.configs.recommended,
		...tsEslint.configs.strictTypeChecked,
		...tsEslint.configs.stylisticTypeChecked,
		eslintConfigPrettier
	],
	languageOptions: {
		parser: tsEslint.parser,
		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 2023,
			project: './tsconfig.eslint.json',
			extraFileExtensions: ['.svelte']
		},
		globals: {
			...globals.browser,
			...globals.node
		}
	},
	rules: {
		'no-console': isProduction() ? 'error' : 'off',

		eqeqeq: ['error', 'always', { null: 'ignore' }],
		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-trailing-spaces': 'warn',
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
				selector: 'import',
				filter: { regex: '[0-9a-z]Image$', match: false },
				format: ['PascalCase']
			},
			{
				selector: 'variable',
				modifiers: ['global', 'const'],
				format: ['camelCase', 'UPPER_CASE']
			},
			{
				selector: 'parameter',
				modifiers: ['unused'],
				format: ['camelCase'],
				leadingUnderscore: 'require',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase'],
				leadingUnderscore: 'require'
			},
			{
				selector: 'memberLike',
				modifiers: ['protected'],
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
				selector: 'property',
				filter: { regex: '^(X|Y)$', match: true },
				format: ['PascalCase']
			}
		],
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unsafe-unary-minus': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
		],
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		// '@typescript-eslint/prefer-readonly-parameter-types': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': [
			'error',
			{ allowSingleElementEquality: 'always' }
		],
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/require-array-sort-compare': 'error',
		'@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
		'@typescript-eslint/switch-exhaustiveness-check': 'error',

		'@typescript-eslint/non-nullable-type-assertion-style': 'off'
	}
});

const svelteConfig = tsEslint.config({
	files: ['**/*.svelte'],
	extends: [
		...eslintPluginSvelte.configs['flat/all'],
		...eslintPluginSvelte.configs['flat/prettier']
	],
	languageOptions: {
		parser: svelteEslintParser,
		parserOptions: {
			parser: tsEslint.parser
		}
	},
	/** @type {import('eslint').Linter.RulesRecord}*/
	rules: {
		'svelte/no-reactive-reassign': ['error', { props: true }],
		'svelte/block-lang': ['error', { script: 'ts', style: 'scss' }],
		'svelte/no-inline-styles': 'off',
		'svelte/no-unused-class-name': 'warn',
		'svelte/no-useless-mustaches': 'warn',
		'svelte/no-restricted-html-elements': 'off',
		'svelte/require-optimized-style-attribute': 'warn',
		'svelte/sort-attributes': 'off',
		'svelte/experimental-require-slot-types': 'off',
		'svelte/experimental-require-strict-events': 'off',
		'no-trailing-spaces': 'off',
		'svelte/no-trailing-spaces': ['warn', { skipBlankLines: false, ignoreComments: false }]
	}
});

/** @type {import('eslint').Linter.FlatConfig}*/
const svelteSvgConfig = {
	files: ['**/*.svg.svelte'],
	rules: { 'svelte/require-optimized-style-attribute': 'off' }
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}*/
const anyConfigConfig = {
	files: ['*.config.*'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/naming-convention': 'off'
	}
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}*/
const eslintConfigConfig = {
	files: ['eslint.config.js'],
	rules: { '@typescript-eslint/no-unsafe-member-access': 'off' }
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
export default [
	...commonConfig,
	...defaultConfig,
	...svelteConfig,
	svelteSvgConfig,
	anyConfigConfig,
	eslintConfigConfig
];
