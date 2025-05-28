import { configEslintProblems } from './eslint/problems.js';
import { configEslintSuggestions } from './eslint/suggestions.js';
import { configJsdoc } from './jsdoc.js';
import { configOxlint } from './oxlint.js';
import { configPromise } from './promise.js';
import { configStylistic } from './stylistic.js';
import { configTsEslint } from './tseslint.js';
import { configUnicorn } from './unicorn.js';

export const configCommon = [
	// core
	{
		ignores: ['node_modules*/', '**/dist', '**/*.json'],
	},
	// eslint rules
	...configEslintProblems,
	...configEslintSuggestions,
	// exceptions
	{
		files: ['eslint.config.{,m,c}{js,ts}'],
		rules: {
			'no-restricted-exports': 'off',
		},
	},
	{
		files: [
			'**/hyper-api/**/*.{,m,c}{js,ts}',
			'**/hyper-api-*/**/*.{,m,c}{js,ts}',
		],
		rules: {
			'no-restricted-exports': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'max-params': 'off',
			'no-dupe-class-members': 'off',
			'no-invalid-this': 'off',
			'no-redeclare': 'off',
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['test/', '**/*.test.{,m,c}{js,ts}'],
		rules: {
			'max-lines-per-function': 'off',
			'max-statements': 'off',
		},
	},
	// other rules included
	...configUnicorn,
	...configJsdoc,
	...configPromise,
	...configStylistic,
	...configTsEslint,
	// disable rules that oxlint supports
	...configOxlint,
];
