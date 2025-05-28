/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';

export async function createEslintConfig(
	dir: string,
	options: { is_node: boolean },
) {
	const lines: string[] = [];

	lines.push("import { configCommon } from '@kirick/lint/eslint/common';");

	if (options.is_node) {
		lines.push("import { configNode } from '@kirick/lint/eslint/node';");
	}

	lines.push('', 'export default [', '\t...configCommon,');

	if (options.is_node) {
		lines.push('\t...configNode,');
	}

	lines.push('];', '');

	await fs.writeFile(
		nodePath.join(dir, 'eslint.config.js'),
		lines.join('\n'),
		'utf8',
	);
}
