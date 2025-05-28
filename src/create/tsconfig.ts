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

	const compilerOptions: TsConfigJson['compilerOptions'] = {};
	for (const key of Object.keys(
		tsconfig_lint.compilerOptions,
	) as (keyof TsConfigJson['compilerOptions'])[]) {
		if (key === 'lib' || key === 'isolatedDeclarations') {
			compilerOptions[key] =
				tsconfig_pwd.compilerOptions[key] ?? tsconfig_lint.compilerOptions[key];
		} else {
			compilerOptions[key] = tsconfig_lint.compilerOptions[key];
		}
	}

	tsconfig_pwd.compilerOptions = compilerOptions;

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
