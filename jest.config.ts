import type { CompilerOptions } from 'typescript';
import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { parse } from 'jsonc-parser';

// alterative: './tsconfig.jest.json'
const TSCONFIG_PATH = './tsconfig.json';

const IGNORE_PATTERNS = [
	'/node_modules/',
	'/static/',
	'/.github/',
	'/.svelte-kit/',
	'/.vercel_build_output/',
	'/.vercel/',
	'/.vscode/'
];

// -- moduleNameMapper ----
const { compilerOptions } = parse(readFileSync(TSCONFIG_PATH).toString()) as {
	compilerOptions: CompilerOptions;
};
const moduleNameMapper: JestConfigWithTsJest['moduleNameMapper'] = pathsToModuleNameMapper({
	...compilerOptions.paths
});

// -- ts-jest & jest config ----
const config: JestConfigWithTsJest = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	// collectCoverageFrom: undefined,

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: IGNORE_PATTERNS,

	// Indicates which provider should be used to instrument code for coverage
	// coverageProvider: "babel",

	// A list of reporter names that Jest uses when writing coverage reports
	// coverageReporters: [
	//   "json",
	//   "text",
	//   "lcov",
	//   "clover"
	// ],

	// An object that configures minimum threshold enforcement for coverage results
	// coverageThreshold: undefined,

	displayName: {
		name: 'Test | Quantum Game Arena',
		color: 'blueBright'
	},

	// Make calling deprecated APIs throw helpful error messages
	errorOnDeprecated: true,

	extensionsToTreatAsEsm: ['.ts', '.svelte'],

	// The fake timers may be useful when a piece of code sets a long timeout that we don't want to wait for in a test
	// fakeTimers: {},

	// An array of file extensions your modules use
	moduleFileExtensions: ['js', 'ts', 'svelte'],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	...(moduleNameMapper ? { moduleNameMapper } : undefined),

	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest/presets/default-esm',

	// The number of seconds after which a test is considered as slow and reported as such in the results.
	// slowTestThreshold: 5,

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/tests/**/*.test.ts'],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: IGNORE_PATTERNS,

	// A map from regular expressions to paths to transformers
	transform: {
		'^\\+?.+\\.(ts|svelte)$': ['ts-jest', { useESM: true, tsconfig: TSCONFIG_PATH }]
	},

	// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
	transformIgnorePatterns: IGNORE_PATTERNS
};

export default config;
