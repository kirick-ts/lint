/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable n/no-process-exit */
/* eslint-disable unicorn/no-process-exit */
/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import type { PackageJson } from 'type-fest';

export async function readPackageJson(dir: string): Promise<PackageJson> {
	const package_json_path = nodePath.join(dir, 'package.json');

	try {
		await fs.stat(package_json_path);
	} catch {
		console.error('package.json not found in the current directory.');
		process.exit(1);
	}

	return JSON.parse(await fs.readFile(package_json_path, 'utf8'));
}

export async function writePackageJson(
	dir: string,
	package_json: PackageJson,
): Promise<void> {
	const package_json_path = nodePath.join(dir, 'package.json');

	package_json.dependencies &&= sortObjectKeys(package_json.dependencies);
	package_json.devDependencies &&= sortObjectKeys(package_json.devDependencies);

	await fs.writeFile(
		package_json_path,
		JSON.stringify(package_json, null, '\t') + '\n',
	);
}

function sortObjectKeys<T extends Record<string, unknown>>(obj: T): T {
	const object_sorted: Record<string, unknown> = {};
	for (const key of Object.keys(obj).sort()) {
		object_sorted[key] = obj[key];
	}

	return object_sorted as T;
}
