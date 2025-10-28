import { configCommon } from './configs/eslint/common.js';
import { configNode } from './configs/eslint/node.js';
import { configOxlint } from './configs/eslint/oxlint.js';

export default [
	{ ignores: ['test/'] },
	...configCommon,
	...configNode,
	...configOxlint,
];
