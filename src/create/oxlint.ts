/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { isFileExists } from '../utils.js';

export async function createOxlintConfig(dir: string) {
	const path = nodePath.join(dir, 'oxlint.config.ts');
	if ((await isFileExists(path)) !== true) {
		await fs.writeFile(
			nodePath.join(dir, 'oxlint.config.ts'),
			[
				`import { rules } from '@kirick/lint/oxlint';`,
				`import { defineConfig } from 'oxlint';`,
				'',
				'export default defineConfig({',
				'\trules,',
				`\tignorePatterns: ['dist'],`,
				'});',
			].join('\n'),
			'utf8',
		);
	}

	// rename old config
	{
		const old_config_path = nodePath.join(dir, '.oxlintrc.json');
		if (await isFileExists(old_config_path)) {
			await fs.rename(
				old_config_path,
				nodePath.join(dir, '_MIGRATE_OLD_oxlintrc.json'),
			);
		}
	}
}
