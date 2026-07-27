// @ts-check

import { oxlintEslintRules } from './oxlint/eslint.js';
import { oxlintJsdocRules } from './oxlint/jsdoc.js';
import { oxlintNodeRules } from './oxlint/node.js';
import { oxlintOxcRules } from './oxlint/oxc.js';
import { oxlintPromiseRules } from './oxlint/promise.js';
import { oxlintTypescriptRules } from './oxlint/typescript.js';
import { oxlintUnicornRules } from './oxlint/unicorn.js';
import { oxlintVueRules } from './oxlint/vue.js';

/** @type {Exclude<import('oxlint').OxlintConfig['plugins'], undefined>} */
export const plugins = [
	'eslint',
	'jsdoc',
	'node',
	'oxc',
	'promise',
	'typescript',
	'unicorn',
	'vue',
];

/** @type {import('oxlint').DummyRuleMap} */
export const rules = {
	...oxlintEslintRules,
	...oxlintJsdocRules,
	...oxlintNodeRules,
	...oxlintOxcRules,
	...oxlintPromiseRules,
	...oxlintTypescriptRules,
	...oxlintUnicornRules,
	...oxlintVueRules,
};
