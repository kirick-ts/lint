/* eslint-disable jsdoc/require-jsdoc */
/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import type { TsConfigJson } from 'type-fest';
import { isFileExists, PATH } from '../utils.js';

const TSCONFIG_INCLUDE = ['src/'];
const TSCONFIG_EXCLUDE = ['dist/', 'node_modules/'];

export async function createTsConfig(dir: string) {
	const tsconfig_extends =
		'./'
		+ nodePath.relative(
			dir,
			nodePath.join(PATH, 'configs', 'tsconfig.base.json'),
		);

	const tsconfig_pwd_path = nodePath.join(dir, 'tsconfig.json');
	const tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);
	if (tsconfig_pwd === null) {
		await writeTsconfigJson(tsconfig_pwd_path, {
			extends: tsconfig_extends,
			include: TSCONFIG_INCLUDE,
			exclude: TSCONFIG_EXCLUDE,
		});
	}
	// do not touch configs that already extends something
	else if (typeof tsconfig_pwd.extends !== 'string') {
		// migrate from old configs
		await writeTsconfigJson(tsconfig_pwd_path, {
			extends: tsconfig_extends,
			compilerOptions: {
				lib: tsconfig_pwd.compilerOptions?.lib,
				isolatedDeclarations:
					tsconfig_pwd.compilerOptions?.isolatedDeclarations,
				paths: tsconfig_pwd.compilerOptions?.paths,
				importHelpers: tsconfig_pwd.compilerOptions?.importHelpers,
				tsBuildInfoFile: tsconfig_pwd.compilerOptions?.tsBuildInfoFile,
				types: tsconfig_pwd.compilerOptions?.types,
			},
			include: tsconfig_pwd.include ?? TSCONFIG_INCLUDE,
			exclude: tsconfig_pwd.exclude ?? TSCONFIG_EXCLUDE,
		});
	}
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
