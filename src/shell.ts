/* oxlint-disable no-console */

import { spawn } from 'node:child_process';

// eslint-disable-next-line jsdoc/require-jsdoc
export function shell(comamnd: string, ...args: string[]) {
	return new Promise<number>((resolve) => {
		const ls = spawn(comamnd, args, {
			stdio: ['pipe', process.stdout, process.stderr],
		});

		ls.on('close', (code) => {
			resolve(code!);
		});
	});
}
