// @ts-check

import { configEslintProblems } from './eslint/eslint/problems.js';
import { configEslintSuggestions } from './eslint/eslint/suggestions.js';
import { configJsdoc } from './eslint/jsdoc.js';
import { configNode } from './eslint/node.js';
import { configOxlint } from './eslint/oxlint.js';
import { configPromise } from './eslint/promise.js';
import { configStylistic } from './eslint/stylistic.js';
import { configTsEslint } from './eslint/tseslint.js';
import { configUnicorn } from './eslint/unicorn.js';
import { configVue } from './eslint/vue.js';

// /** @type {Parameters<typeof import('eslint/config').defineConfig>} */
export const eslint = [
	// core
	{
		ignores: ['node_modules*/', '**/dist', '**/*.json'],
	},
	// eslint rules
	...configEslintProblems,
	...configEslintSuggestions,
	// exceptions
	{
		files: ['**/eslint.config.{,m,c}{js,ts}', '**/oxlint.config.ts'],
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
			'unicorn/filename-case': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'max-params': 'off',
			'no-dupe-class-members': 'off',
			'no-invalid-this': 'off',
			'no-redeclare': 'off',
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
	...configJsdoc,
	...configNode,
	...configPromise,
	...configStylistic,
	...configTsEslint,
	...configUnicorn,
	...configVue,
	// disable rules that oxlint supports
	...configOxlint,
];
