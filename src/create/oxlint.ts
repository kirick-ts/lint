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
			'./node_modules/@kirick/lint/configs/oxlint/correctness.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/pedantic.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/perf.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/restriction.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/style.jsonc',
			'./node_modules/@kirick/lint/configs/oxlint/suspicious.jsonc',
		],
		ignorePatterns: ['dist'],
	};

	await fs.writeFile(
		nodePath.join(dir, '.oxlintrc.json'),
		JSON.stringify(config, null, '\t'),
		'utf8',
	);
}
