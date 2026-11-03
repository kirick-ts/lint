import { defineConfig } from 'oxlint';
import { rules } from './configs/oxlint.js';

export default defineConfig({
	rules,
	options: {
		typeAware: true,
	},
	ignorePatterns: ['*.config.ts', '*.config.js', 'dist/'],
});
