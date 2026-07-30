/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { isFileExists } from '../utils.js';

export async function createEslintConfig(dir: string) {
	const path = nodePath.join(dir, 'eslint.config.js');

	if (await isFileExists(path)) {
		const content = await fs.readFile(path, 'utf8');
		// we should not write a new config if the old one is already migrated
		if (!content.includes(`from '@kirick/lint/eslint/common';`)) {
			return;
		}

		await fs.rename(path, nodePath.join(dir, '_MIGRATE_OLD_eslint.config.js'));
	}

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
