import { defineConfig } from 'oxlint';
import { rules } from './configs/oxlint.js';

export default defineConfig({
	rules,
	ignorePatterns: ['dist'],
});
