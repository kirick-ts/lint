/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { isFileExists } from '../utils.js';

export async function createEslintConfig(dir: string) {
	const path = nodePath.join(dir, 'eslint.config.js');
	if ((await isFileExists(path)) !== true) {
		await fs.writeFile(
			path,
			[
				`import { eslint } from '@kirick/lint/eslint';`,
				`import { defineConfig } from 'eslint/config';`,
				'',
				'export default defineConfig(eslint);',
			].join('\n'),
			'utf8',
		);
	}
}
