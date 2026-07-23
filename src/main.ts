#!/usr/bin/env node

/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { createBiomeConfig } from './create/biome.js';
import { createEslintConfig } from './create/eslint.js';
import { createOxlintConfig } from './create/oxlint.js';
import { createTsConfig } from './create/tsconfig.js';
import { readPackageJson, writePackageJson } from './package-json.js';
import { shell } from './shell.js';
import { isFileExists } from './utils.js';

const PWD = process.cwd();
const DIR_LIB = nodePath.join(import.meta.dirname, '..');

const [package_json, package_json_lint] = await Promise.all([
	readPackageJson(PWD),
	readPackageJson(DIR_LIB),
]);

if (!package_json_lint.dependencies) {
	throw new TypeError('No dependencies found in @kirick/lint.');
}

if (!package_json_lint.peerDependencies) {
	throw new TypeError('No peerDependencies found in @kirick/lint.');
}

if (!package_json_lint.devDependencies) {
	throw new TypeError('No devDependencies found in @kirick/lint.');
}

package_json.devDependencies ??= {};

// const is_node =
// 	(package_json.devDependencies['@types/node'] !== undefined
// 		|| package_json.devDependencies['@types/bun'] !== undefined)
// 	&& package_json.devDependencies['vue-tsc'] === undefined;
const is_vue = package_json.devDependencies['vue-tsc'] !== undefined;

delete package_json.devDependencies['@kirick/eslint-config'];

for (const name of ['eslint', 'oxlint']) {
	package_json.devDependencies[name] = package_json_lint.peerDependencies[name];
}

for (const name of ['@biomejs/biome', 'typescript']) {
	package_json.devDependencies[name] = package_json_lint.devDependencies[name];
}

if (is_vue) {
	package_json.devDependencies.typescript = '6.0.2';
}

await writePackageJson(PWD, package_json);

await shell('bun', 'install');

// 2. Configs
try {
	await Promise.all([
		fs.mkdir(nodePath.join(PWD, '.zed')),
		fs.mkdir(nodePath.join(PWD, '.vscode')),
	]);
} catch {}

await Promise.all([
	fs.copyFile(
		nodePath.join(DIR_LIB, '.zed', 'settings.json'),
		nodePath.join(PWD, '.zed', 'settings.json'),
	),
	fs.copyFile(
		nodePath.join(DIR_LIB, '.vscode', 'settings.json'),
		nodePath.join(PWD, '.vscode', 'settings.json'),
	),
	createBiomeConfig(PWD),
	createEslintConfig(PWD),
	createTsConfig(PWD),
	createOxlintConfig(PWD),
]);

await shell(
	'bunx',
	'biome',
	'format',
	'--fix',
	'oxlint.config.ts',
	'biome.json',
	'eslint.config.js',
	'package.json',
	'tsconfig.json',
	...((await isFileExists(nodePath.join(PWD, 'tsconfig.base.json')))
		? ['tsconfig.base.json']
		: []),
);

// 3. Print note
console.log();
console.log('To check files formatting, run:');
console.log('  bunx biome format');
console.log('To fix files formatting, run:');
console.log('  bunx biome format --write');
