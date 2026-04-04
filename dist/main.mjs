#!/usr/bin/env node
import fs from "node:fs/promises";
import nodePath from "node:path";
import { spawn } from "node:child_process";
//#region src/create/eslint.ts
async function createEslintConfig(dir, options) {
	const lines = ["import { configCommon } from '@kirick/lint/eslint/common';"];
	if (options.is_node) lines.push("import { configNode } from '@kirick/lint/eslint/node';");
	lines.push("import { configOxlint } from '@kirick/lint/eslint/oxlint';");
	if (options.is_vue) lines.push("import { configVue } from '@kirick/lint/eslint/vue';");
	lines.push("import { defineConfig } from 'eslint/config';", "", "export default defineConfig([", "	...configCommon,");
	if (options.is_node) lines.push("	...configNode,");
	if (options.is_vue) lines.push("	...configVue,");
	lines.push("	...configOxlint,", "]);", "");
	await fs.writeFile(nodePath.join(dir, "eslint.config.js"), lines.join("\n"), "utf8");
}
//#endregion
//#region src/create/oxlint.ts
async function createOxlintConfig(dir) {
	await fs.writeFile(nodePath.join(dir, ".oxlintrc.json"), JSON.stringify({
		$schema: "./node_modules/oxlint/configuration_schema.json",
		extends: [
			"./node_modules/@kirick/lint/configs/oxlint/correctness.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/eslint.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/jsdoc.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/node.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/pedantic.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/perf.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/promise.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/restriction.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/style.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/suspicious.jsonc",
			"./node_modules/@kirick/lint/configs/oxlint/typescript.jsonc"
		],
		ignorePatterns: ["dist"]
	}, null, "	"), "utf8");
}
//#endregion
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
//#endregion
//#region src/create/tsconfig.ts
const PRESERVE_USER_OPTIONS = [
	"importHelpers",
	"isolatedDeclarations",
	"lib",
	"paths",
	"tsBuildInfoFile"
];
async function createTsConfig(dir) {
	const tsconfig_lint = await readTsconfigJson(nodePath.join(PATH, "configs", "tsconfig.example.json"));
	if (!tsconfig_lint) throw new TypeError("@kirick/lint: configs/tsconfig.example.json not found.");
	if (!tsconfig_lint.compilerOptions) throw new TypeError("@kirick/lint: configs/tsconfig.example.json does not contain compilerOptions.");
	const compiler_options_new = { ...tsconfig_lint.compilerOptions };
	let tsconfig_pwd_path = nodePath.join(dir, "tsconfig.base.json");
	let tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);
	if (tsconfig_pwd === null) {
		tsconfig_pwd_path = nodePath.join(dir, "tsconfig.json");
		tsconfig_pwd = await readTsconfigJson(tsconfig_pwd_path);
		if (tsconfig_pwd === null) throw new TypeError("Project: tsconfig.json not found.");
	}
	for (const key of PRESERVE_USER_OPTIONS) switch (key) {
		case "lib":
			compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key] ?? tsconfig_lint.compilerOptions[key];
			break;
		case "isolatedDeclarations":
			compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key] ?? tsconfig_lint.compilerOptions[key];
			break;
		case "paths":
			compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
			break;
		case "importHelpers":
			compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
			break;
		case "tsBuildInfoFile":
			compiler_options_new[key] = tsconfig_pwd.compilerOptions?.[key];
			break;
	}
	tsconfig_pwd.compilerOptions = compiler_options_new;
	await writeTsconfigJson(tsconfig_pwd_path, tsconfig_pwd);
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
	for (const key of Object.keys(obj).toSorted()) object_sorted[key] = obj[key];
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
if (!package_json_lint.devDependencies) throw new TypeError("No devDependencies found in @kirick/lint.");
package_json.devDependencies ??= {};
const is_node = (package_json.devDependencies["@types/node"] !== void 0 || package_json.devDependencies["@types/bun"] !== void 0) && package_json.devDependencies["vue-tsc"] === void 0;
const is_vue = package_json.devDependencies["vue-tsc"] !== void 0;
delete package_json.devDependencies["@kirick/eslint-config"];
for (const name of [
	"@biomejs/biome",
	"oxlint",
	"typescript"
]) package_json.devDependencies[name] = package_json_lint.devDependencies[name];
if (is_vue) package_json.devDependencies.prettier = package_json_lint.devDependencies.prettier;
package_json.devDependencies.eslint = package_json_lint.dependencies.eslint;
let script_lint = package_json_lint.scripts?.lint;
if (!script_lint) throw new TypeError("No \"lint\" script found in @kirick/lint.");
if (is_vue) {
	const script_lint_prettier = package_json_lint.scripts?.["lint:prettier"];
	if (!script_lint_prettier) throw new TypeError("No \"lint:prettier\" script found in @kirick/lint.");
	script_lint = `${script_lint_prettier} && ${script_lint}`;
}
package_json.scripts ??= {};
if (package_json.scripts.lint) {
	const match = package_json.scripts.lint.match(/(?:vue-)?tsc/u);
	if (match === null) {
		console.warn("Unexpected \"lint\" script format. Update it by hand to:");
		console.warn(">", script_lint);
	} else package_json.scripts.lint = script_lint.replace(/tsc$/u, match[0]) + package_json.scripts.lint.slice(match.index + match[0].length);
} else package_json.scripts.lint = script_lint;
await writePackageJson(PWD, package_json);
await shell("bun", "install");
try {
	await Promise.all([fs.mkdir(nodePath.join(PWD, ".zed")), fs.mkdir(nodePath.join(PWD, ".vscode"))]);
} catch {}
await Promise.all([
	fs.copyFile(nodePath.join(DIR_LIB, ".zed", "settings.json"), nodePath.join(PWD, ".zed", "settings.json")),
	fs.copyFile(nodePath.join(DIR_LIB, ".vscode", "settings.json"), nodePath.join(PWD, ".vscode", "settings.json")),
	fs.copyFile(nodePath.join(DIR_LIB, "biome.json"), nodePath.join(PWD, "biome.json")),
	is_vue ? fs.copyFile(nodePath.join(DIR_LIB, ".prettierrc.json"), nodePath.join(PWD, ".prettierrc.json")) : null,
	createEslintConfig(PWD, {
		is_node,
		is_vue
	}),
	createTsConfig(PWD),
	createOxlintConfig(PWD)
]);
await shell("bunx", "biome", "format", "--fix", ".oxlintrc.json", "biome.json", "eslint.config.js", "package.json", "tsconfig.json", ...await isFileExists(nodePath.join(PWD, "tsconfig.base.json")) ? ["tsconfig.base.json"] : [], ...is_vue ? [".prettierrc.json"] : []);
console.log();
console.log("To check files formatting, run:");
console.log("  bunx biome format");
console.log("To fix files formatting, run:");
console.log("  bunx biome format --write");
//#endregion
export {};
