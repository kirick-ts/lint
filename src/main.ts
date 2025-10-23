#!/usr/bin/env node

/* oxlint-disable no-console */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { createEslintConfig } from './create/eslint.js';
import { createOxlintConfig } from './create/oxlint.js';
import { createTsConfig } from './create/tsconfig.js';
import { readPackageJson, writePackageJson } from './package-json.js';
import { shell } from './shell.js';

const PWD = process.cwd();
const DIR_LIB = nodePath.join(import.meta.dirname, '..');

const [package_json, package_json_lint] = await Promise.all([
	readPackageJson(PWD),
	readPackageJson(DIR_LIB),
]);

if (!package_json_lint.dependencies) {
	throw new TypeError('No dependencies found in @kirick/lint.');
}

if (!package_json_lint.devDependencies) {
	throw new TypeError('No devDependencies found in @kirick/lint.');
}

package_json.devDependencies ??= {};

const is_node =
	package_json.devDependencies['@types/node'] !== undefined
	|| package_json.devDependencies['@types/bun'] !== undefined;
const is_vue = package_json.devDependencies['vue-tsc'] !== undefined;

delete package_json.devDependencies['@kirick/eslint-config'];

for (const name of ['@biomejs/biome', 'oxlint', 'typescript']) {
	package_json.devDependencies[name] = package_json_lint.devDependencies[name];
}

if (is_vue) {
	package_json.devDependencies.prettier =
		package_json_lint.devDependencies.prettier;
}

package_json.devDependencies.eslint = package_json_lint.dependencies.eslint;

// 1.2. Scripts
const script_lint = package_json_lint.scripts?.lint;
if (!script_lint) {
	throw new TypeError('No "lint" script found in @kirick/lint.');
}

package_json.scripts ??= {};
if (package_json.scripts.lint) {
	const index = package_json.scripts.lint.indexOf('tsc');
	if (index !== -1) {
		package_json.scripts.lint =
			script_lint + package_json.scripts.lint.slice(index + 3);
	}
} else {
	package_json.scripts.lint = script_lint;
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
	fs.copyFile(
		nodePath.join(DIR_LIB, 'biome.json'),
		nodePath.join(PWD, 'biome.json'),
	),
	createEslintConfig(PWD, { is_node, is_vue }),
	createTsConfig(PWD),
	createOxlintConfig(PWD),
]);

await shell(
	'bunx',
	'biome',
	'format',
	'--fix',
	'.oxlintrc.json',
	'biome.json',
	'eslint.config.js',
	'package.json',
	'tsconfig.json',
);

// 3. Print note
console.log();
console.log('To check files formatting, run:');
console.log('  bunx biome format');
console.log('To fix files formatting, run:');
console.log('  bunx biome format --write');
