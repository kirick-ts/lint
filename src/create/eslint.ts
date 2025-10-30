/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';

export async function createEslintConfig(
	dir: string,
	options: { is_node: boolean; is_vue: boolean },
) {
	const lines: string[] = [
		"import { configCommon } from '@kirick/lint/eslint/common';",
	];

	if (options.is_node) {
		lines.push("import { configNode } from '@kirick/lint/eslint/node';");
	}

	lines.push("import { configOxlint } from '@kirick/lint/eslint/oxlint';");

	if (options.is_vue) {
		lines.push("import { configVue } from '@kirick/lint/eslint/vue';");
	}

	lines.push(
		"import { defineConfig } from 'eslint/config';",
		'',
		'export default defineConfig([',
		'\t...configCommon,',
	);

	if (options.is_node) {
		lines.push('\t...configNode,');
	}

	if (options.is_vue) {
		lines.push('\t...configVue,');
	}

	lines.push('\t...configOxlint,', ']);', '');

	await fs.writeFile(
		nodePath.join(dir, 'eslint.config.js'),
		lines.join('\n'),
		'utf8',
	);
}
