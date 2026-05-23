/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';

export async function createOxlintConfig(
	dir: string,
	// options: { is_node: boolean },
) {
	const config = {
		$schema: './node_modules/oxlint/configuration_schema.json',
		extends: [
			'./node_modules/@kirick/lint/configs/oxlint/eslint.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/jsdoc.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/node.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/oxc.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/promise.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/typescript.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/unicorn.jsonc',
		],
		ignorePatterns: ['dist'],
	};

	await fs.writeFile(
		nodePath.join(dir, '.oxlintrc.json'),
		JSON.stringify(config, null, '\t'),
		'utf8',
	);
}
