import fs from 'node:fs/promises';
import nodePath from 'node:path';

export const PATH = nodePath.join(import.meta.dirname, '..');

/**
 * Check if a file exists at the given path.
 * @param path - The path to check.
 * @returns A promise that resolves to true if the file exists, false otherwise.
 */
export async function isFileExists(path: string): Promise<boolean> {
	try {
		const result = await fs.stat(path);
		return result.isFile();
	} catch {
		return false;
	}
}
