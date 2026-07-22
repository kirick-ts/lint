import { defineConfig } from 'eslint/config';
import { eslint } from './configs/eslint.js';

export default defineConfig([
	{
		ignores: ['test/'],
	},
	...eslint,
]);
