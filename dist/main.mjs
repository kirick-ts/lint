#!/usr/bin/env node
import fs from "node:fs/promises";
import nodePath from "node:path";
import { spawn } from "node:child_process";
//#region src/utils.ts
const PATH = nodePath.join(import.meta.dirname, "..");
/**
* Check if a file exists at the given path.
* @param path - The path to check.
* @returns A promise that resolves to true if the file exists, false otherwise.
*/
async function isFileExists(path) {
	try {
		return (await fs.stat(path)).isFile();
	} catch {
		return false;
	}
}
/**
* Check if a file exists at the given path.
* @param path - The path to check.
* @returns A promise that resolves to true if the file exists, false otherwise.
*/
async function writeJson(path, data) {
	await fs.writeFile(path, JSON.stringify(data, null, "	"), "utf8");
}
//#endregion
//#region src/create/biome.ts
async function createBiomeConfig(dir) {
	const biome_lint_path = nodePath.join(PATH, "biome.json");
	const biome_project_path = nodePath.join(dir, "biome.json");
	const biome_project_config = await readBiomeJson(biome_project_path);
	if (biome_project_config === null) await fs.copyFile(biome_lint_path, biome_project_path);
	else {
		const biome_lint_config = await readBiomeJson(biome_lint_path);
		const globs_known = biome_lint_config.files.includes;
		const globs_extra = biome_project_config.files?.includes?.filter((glob) => !globs_known.includes(glob));
		if (globs_extra) biome_lint_config.files.includes = [...globs_known, ...globs_extra];
		await writeJson(biome_project_path, biome_lint_config);
	}
}
async function readBiomeJson(path) {
	if (!await isFileExists(path)) return null;
	return JSON.parse(await fs.readFile(path, "utf8"));
}
//#endregion
//#region src/create/eslint.ts
async function createEslintConfig(dir) {
	const path = nodePath.join(dir, "eslint.config.js");
	if (await isFileExists(path) !== true) await fs.writeFile(path, [
		`import { eslint } from '@kirick/lint/eslint';`,
		`import { defineConfig } from 'eslint/config';`,
		"",
		"export default defineConfig(eslint);"
	].join("\n"), "utf8");
}
//#endregion
//#region src/create/oxlint.ts
async function createOxlintConfig(dir) {
	if (await isFileExists(nodePath.join(dir, "oxlint.config.ts")) !== true) await fs.writeFile(nodePath.join(dir, "oxlint.config.ts"), [
		`import { plugins, rules } from '@kirick/lint/oxlint';`,
		`import { defineConfig } from 'oxlint';`,
		"",
		"export default defineConfig({",
		"	plugins,",
		"	rules,",
		`\tignorePatterns: ['dist'],`,
		"});"
	].join("\n"), "utf8");
	{
		const old_config_path = nodePath.join(dir, ".oxlintrc.json");
		if (await isFileExists(old_config_path)) await fs.rename(old_config_path, nodePath.join(dir, "_MIGRATE_OLD_oxlintrc.json"));
	}
}
//#endregion
//#region src/create/tsconfig.ts
const TSCONFIG_INCLUDE = ["src/"];
const TSCONFIG_EXCLUDE = ["dist/", "node_modules/"];
async function createTsConfig(dir) {
	const tsconfig_extends = "./" + nodePath.relative(dir, nodePath.join(PATH, "configs", "tsconfig.base.json"));
	const tsconfig_pwd_path = nodePath.join(dir, "tsconfig.json");
	const tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);
	if (tsconfig_pwd === null) await writeTsconfigJson(tsconfig_pwd_path, {
		extends: tsconfig_extends,
		include: TSCONFIG_INCLUDE,
		exclude: TSCONFIG_EXCLUDE
	});
	else if (typeof tsconfig_pwd.extends !== "string") await writeTsconfigJson(tsconfig_pwd_path, {
		extends: tsconfig_extends,
		compilerOptions: {
			lib: tsconfig_pwd.compilerOptions?.lib,
			isolatedDeclarations: tsconfig_pwd.compilerOptions?.isolatedDeclarations,
			paths: tsconfig_pwd.compilerOptions?.paths,
			importHelpers: tsconfig_pwd.compilerOptions?.importHelpers,
			tsBuildInfoFile: tsconfig_pwd.compilerOptions?.tsBuildInfoFile,
			types: tsconfig_pwd.compilerOptions?.types
		},
		include: tsconfig_pwd.include ?? TSCONFIG_INCLUDE,
		exclude: tsconfig_pwd.exclude ?? TSCONFIG_EXCLUDE
	});
}
async function readTsconfigJson(path) {
	if (!await isFileExists(path)) return null;
	return JSON.parse(await fs.readFile(path, "utf8"));
}
async function writeTsconfigJson(path, data) {
	await fs.writeFile(path, JSON.stringify(data, null, "	"), "utf8");
}
//#endregion
//#region src/package-json.ts
async function readPackageJson(dir) {
	const package_json_path = nodePath.join(dir, "package.json");
	try {
		await fs.stat(package_json_path);
	} catch {
		console.error("package.json not found in the current directory.");
		process.exit(1);
	}
	return JSON.parse(await fs.readFile(package_json_path, "utf8"));
}
async function writePackageJson(dir, package_json) {
	const package_json_path = nodePath.join(dir, "package.json");
	package_json.dependencies &&= sortObjectKeys(package_json.dependencies);
	package_json.devDependencies &&= sortObjectKeys(package_json.devDependencies);
	await fs.writeFile(package_json_path, JSON.stringify(package_json, null, "	") + "\n");
}
function sortObjectKeys(obj) {
	const object_sorted = {};
	const keys = Object.keys(obj).toSorted((a, b) => a.localeCompare(b));
	for (const key of keys) object_sorted[key] = obj[key];
	return object_sorted;
}
//#endregion
//#region src/shell.ts
function shell(comamnd, ...args) {
	return new Promise((resolve) => {
		spawn(comamnd, args, { stdio: [
			"pipe",
			process.stdout,
			process.stderr
		] }).on("close", (code) => {
			resolve(code);
		});
	});
}
//#endregion
//#region src/main.ts
const PWD = process.cwd();
const DIR_LIB = nodePath.join(import.meta.dirname, "..");
const [package_json, package_json_lint] = await Promise.all([readPackageJson(PWD), readPackageJson(DIR_LIB)]);
if (!package_json_lint.dependencies) throw new TypeError("No dependencies found in @kirick/lint.");
if (!package_json_lint.peerDependencies) throw new TypeError("No peerDependencies found in @kirick/lint.");
if (!package_json_lint.devDependencies) throw new TypeError("No devDependencies found in @kirick/lint.");
package_json.devDependencies ??= {};
delete package_json.devDependencies["@kirick/eslint-config"];
for (const name of ["eslint", "oxlint"]) package_json.devDependencies[name] = package_json_lint.peerDependencies[name];
for (const name of ["@biomejs/biome", "typescript"]) package_json.devDependencies[name] = package_json_lint.devDependencies[name];
await writePackageJson(PWD, package_json);
await shell("bun", "install");
try {
	await Promise.all([fs.mkdir(nodePath.join(PWD, ".zed")), fs.mkdir(nodePath.join(PWD, ".vscode"))]);
} catch {}
await Promise.all([
	fs.copyFile(nodePath.join(DIR_LIB, ".zed", "settings.json"), nodePath.join(PWD, ".zed", "settings.json")),
	fs.copyFile(nodePath.join(DIR_LIB, ".vscode", "settings.json"), nodePath.join(PWD, ".vscode", "settings.json")),
	createBiomeConfig(PWD),
	createEslintConfig(PWD),
	createTsConfig(PWD),
	createOxlintConfig(PWD)
]);
await shell("bunx", "biome", "format", "--fix", "oxlint.config.ts", "biome.json", "eslint.config.js", "package.json", "tsconfig.json", ...await isFileExists(nodePath.join(PWD, "tsconfig.base.json")) ? ["tsconfig.base.json"] : []);
console.log();
console.log("To check files formatting, run:");
console.log("  bunx biome format");
console.log("To fix files formatting, run:");
console.log("  bunx biome format --write");
//#endregion
export {};
