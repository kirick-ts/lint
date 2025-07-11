/* eslint-disable jsdoc/require-jsdoc */
/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import type { TsConfigJson } from 'type-fest';
import { PATH } from '../utils.js';

export async function createTsConfig(dir: string) {
	const tsconfig_pwd_path = nodePath.join(dir, 'tsconfig.json');
	const tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);

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

	if (!tsconfig_pwd) {
		// TODO: create tsconfig.json with default values
		throw new TypeError('Project: tsconfig.json not found.');
	}

	if (!tsconfig_pwd.compilerOptions) {
		throw new TypeError(
			'Project: tsconfig.json does not contain compilerOptions.',
		);
	}

	// Start with a copy of the lint tsconfig compiler options
	const compiler_options_new = { ...tsconfig_lint.compilerOptions };

	// Special handling for options that should be overridden from user config if available
	const preserveUserOptions = [
		'lib',
		'isolatedDeclarations',
		'paths',
		'importHelpers',
	] as const;

	for (const key of preserveUserOptions) {
		switch (key) {
			case 'lib':
				compiler_options_new[key] =
					tsconfig_pwd.compilerOptions[key] ??
					tsconfig_lint.compilerOptions[key];
				break;
			case 'isolatedDeclarations':
				compiler_options_new[key] =
					tsconfig_pwd.compilerOptions[key] ??
					tsconfig_lint.compilerOptions[key];
				break;
			case 'paths':
				compiler_options_new[key] = tsconfig_pwd.compilerOptions[key];
				break;
			case 'importHelpers':
				compiler_options_new[key] = tsconfig_pwd.compilerOptions[key];
				break;
			// no default
		}
	}

	tsconfig_pwd.compilerOptions = compiler_options_new;

	await writeTsconfigJson(tsconfig_pwd_path, tsconfig_pwd);
}

async function readTsconfigJson(path: string): Promise<TsConfigJson | null> {
	try {
		await fs.stat(path);
	} catch {
		return null;
	}

	return JSON.parse(await fs.readFile(path, 'utf8'));
}

async function writeTsconfigJson(path: string, data: TsConfigJson) {
	await fs.writeFile(path, JSON.stringify(data, null, '\t'), 'utf8');
}
