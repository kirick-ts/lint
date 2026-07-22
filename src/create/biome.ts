/* eslint-disable jsdoc/require-jsdoc */

import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { isFileExists, PATH, writeJson } from '../utils.js';

export async function createBiomeConfig(dir: string) {
	const biome_lint_path = nodePath.join(PATH, 'biome.json');

	const biome_project_path = nodePath.join(dir, 'biome.json');
	const biome_project_config = await readBiomeJson(biome_project_path);
	if (biome_project_config === null) {
		await fs.copyFile(biome_lint_path, biome_project_path);
	} else {
		const biome_lint_config = await readBiomeJson(biome_lint_path);
		const globs_known = biome_lint_config!.files.includes!;

		const globs_extra = biome_project_config.files?.includes?.filter(
			(glob) => !globs_known.includes(glob),
		);
		if (globs_extra) {
			biome_lint_config!.files.includes = [...globs_known, ...globs_extra];
		}

		await writeJson(biome_project_path, biome_lint_config);
	}
}

type BiomeJson = {
	files: {
		includes?: string[];
	};
};
async function readBiomeJson(path: string): Promise<BiomeJson | null> {
	const exists = await isFileExists(path);
	if (!exists) {
		return null;
	}

	return JSON.parse(await fs.readFile(path, 'utf8'));
}
