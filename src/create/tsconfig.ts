/* eslint-disable jsdoc/require-jsdoc */
/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import type { TsConfigJson } from 'type-fest';
import { isFileExists, PATH } from '../utils.js';

// Special handling for options that should be overridden from user config if available
const PRESERVE_USER_OPTIONS = [
	'importHelpers',
	'isolatedDeclarations',
	'lib',
	'paths',
	'tsBuildInfoFile',
] as const;

export async function createTsConfig(dir: string) {
	const tsconfig_lint = await readTsconfigJson(
		nodePath.join(PATH, 'configs', 'tsconfig.example.json'),
	);
	if (!tsconfig_lint) {
		throw new TypeError(
			'@kirick/lint: configs/tsconfig.example.json not found.',
		);
	}

	if (!tsconfig_lint.compilerOptions) {
		throw new TypeError(
			'@kirick/lint: configs/tsconfig.example.json does not contain compilerOptions.',
		);
	}

	// Start with a copy of the lint tsconfig compiler options
	const compiler_options_new = { ...tsconfig_lint.compilerOptions };

	let tsconfig_pwd_path = nodePath.join(dir, 'tsconfig.base.json');
	let tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);

	if (tsconfig_pwd === null) {
		tsconfig_pwd_path = nodePath.join(dir, 'tsconfig.json');
		tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);

		if (tsconfig_pwd === null) {
			// TODO: create tsconfig.json with default values
			throw new TypeError('Project: tsconfig.json not found.');
		}
	}

	for (const key of PRESERVE_USER_OPTIONS) {
		switch (key) {
			case 'lib':
				compiler_options_new[key] =
					tsconfig_pwd.compilerOptions?.[key]
					?? tsconfig_lint.compilerOptions[key];
				break;
			case 'isolatedDeclarations':
				compiler_options_new[key] =
					tsconfig_pwd.compilerOptions?.[key]
					?? tsconfig_lint.compilerOptions[key];
				break;
			case 'paths':
				compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
				break;
			case 'importHelpers':
				compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
				break;
			case 'tsBuildInfoFile':
				compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
				break;
			// no default
		}
	}

	tsconfig_pwd.compilerOptions = compiler_options_new;

	await writeTsconfigJson(tsconfig_pwd_path, tsconfig_pwd);
}

async function readTsconfigJson(path: string): Promise<TsConfigJson | null> {
	const exists = await isFileExists(path);
	if (!exists) {
		return null;
	}

	return JSON.parse(await fs.readFile(path, 'utf8'));
}

async function writeTsconfigJson(path: string, data: TsConfigJson) {
	await fs.writeFile(path, JSON.stringify(data, null, '\t'), 'utf8');
}
