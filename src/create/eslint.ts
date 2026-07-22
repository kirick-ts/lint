/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';

export async function createEslintConfig(dir: string) {
	await fs.writeFile(
		nodePath.join(dir, 'eslint.config.js'),
		[
			`import { eslint } from '@kirick/lint/eslint';`,
			`import { defineConfig } from 'eslint/config';`,
			'',
			'export default defineConfig(eslint);',
		].join('\n'),
		'utf8',
	);
}
